import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <div className="flex items-center gap-8">
        <img
          src="https://noun-api.com/beta/pfp?head=68&glasses=3&background=0&body=13&accessory=12"
          alt=""
        />
        <div>
          As a crypto expert, I&apos;m here to help you navigate the
          complexities of the market.
          <br />
          <br />
          Feel free to ask me anything you need to know.
        </div>
      </div>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat/agent-4"
      agent={
        <img
          src="https://noun-api.com/beta/pfp?head=68&glasses=3&background=0&body=13&accessory=12"
          alt=""
        />
      }
      titleText="Q&A"
      placeholder="Ask me anything!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
