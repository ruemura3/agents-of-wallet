import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <div className="flex items-center gap-8">
        <img
          src="https://noun-api.com/beta/pfp?head=111&glasses=3&background=1&body=13&accessory=12"
          alt=""
        />
        <div>
          Hey there, what&apos;s up.
          <br />
          <br />I am always monitoring your assets.
        </div>
      </div>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat/agent-3"
      agent={
        <img
          src="https://noun-api.com/beta/pfp?head=111&glasses=3&background=1&body=13&accessory=12"
          alt=""
        />
      }
      titleText="Trade Crypto"
      placeholder="Ask me anything!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
