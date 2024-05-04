import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { DynamicStructuredTool } from "@langchain/core/tools";

import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { z } from "zod";
import { Utils } from "alchemy-sdk";

export const runtime = "edge";

function getUrl(chain: string) {
  switch (chain.toLowerCase()) {
    case "ethereum":
      return "https://eth-mainnet.alchemyapi.io/v2/IaohDivNGCoQEDvb3CYW7BWVmNiPOXsT";
    case "base":
      return "https://base-sepolia.g.alchemy.com/v2/IaohDivNGCoQEDvb3CYW7BWVmNiPOXsT";
    default:
      throw new Error("Invalid chain id");
  }
}

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const AGENT_SYSTEM_TEMPLATE = `You are an AI agent of Web3 wallet named Agents of W.A.L.L.E.T.
Your name is Fitz.
Your main job is to provide eth value in user's wallet.
Behave cool.`;

/**
 * This handler initializes and calls an OpenAI Functions agent.
 * See the docs for more information:
 *
 * https://js.langchain.com/docs/modules/agents/agent_types/openai_functions_agent
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    /**
     * We represent intermediate steps as system messages for display purposes,
     * but don't want them in the chat history.
     */
    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === "user" || message.role === "assistant",
    );
    const returnIntermediateSteps = body.show_intermediate_steps;
    const previousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const tools = [
      new DynamicStructuredTool({
        name: "get-eth-value-from-chain",
        description: "Get ETH value from a specified chain.",
        schema: z.object({
          chain: z.string().describe("blockchain name"),
        }),
        func: async ({ chain }) => {
          const url = getUrl(chain);
          const response = await fetch(
            url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [
                  "0x1407A78Eda9d3de8A9E5f40636660fBe20920f15",
                  "latest",
                ],
                id: 1,
              }),
            },
          );
          const data = await response.json();
          const wei = data.result;
          const eth = parseFloat(Utils.formatEther(wei));
          return `${eth}`;
        },
      }),
    ];
    const chat = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-1106",
      temperature: 0,
      // IMPORTANT: Must "streaming: true" on OpenAI to enable final output streaming below.
      streaming: true,
    });

    /**
     * Based on https://smith.langchain.com/hub/hwchase17/openai-functions-agent
     *
     * This default prompt for the OpenAI functions agent has a placeholder
     * where chat messages get inserted as "chat_history".
     *
     * You can customize this prompt yourself!
     */
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", AGENT_SYSTEM_TEMPLATE],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = await createToolCallingAgent({
      llm: chat,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      // Set this if you want to receive all intermediate steps in the output of .invoke().
      returnIntermediateSteps,
    });

    if (!returnIntermediateSteps) {
      /**
       * Agent executors also allow you to stream back all generated tokens and steps
       * from their runs.
       *
       * This contains a lot of data, so we do some filtering of the generated log chunks
       * and only stream back the final response.
       *
       * This filtering is easiest with the OpenAI functions or tools agents, since final outputs
       * are log chunk values from the model that contain a string instead of a function call object.
       *
       * See: https://js.langchain.com/docs/modules/agents/how_to/streaming#streaming-tokens
       */
      const logStream = await agentExecutor.streamLog({
        input: currentMessageContent,
        chat_history: previousMessages,
      });

      const textEncoder = new TextEncoder();
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of logStream) {
            if (chunk.ops?.length > 0 && chunk.ops[0].op === "add") {
              const addOp = chunk.ops[0];
              if (
                addOp.path.startsWith("/logs/ChatOpenAI") &&
                typeof addOp.value === "string" &&
                addOp.value.length
              ) {
                controller.enqueue(textEncoder.encode(addOp.value));
              }
            }
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(transformStream);
    } else {
      /**
       * Intermediate steps are the default outputs with the executor's `.stream()` method.
       * We could also pick them out from `streamLog` chunks.
       * They are generated as JSON objects, so streaming them is a bit more complicated.
       */
      const result = await agentExecutor.invoke({
        input: currentMessageContent,
        chat_history: previousMessages,
      });
      return NextResponse.json(
        { output: result.output, intermediate_steps: result.intermediateSteps },
        { status: 200 },
      );
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
