import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <div className="flex items-center gap-8">
        <img
          src="https://noun-api.com/beta/pfp?head=34&glasses=3&background=1&body=13&accessory=11"
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
      endpoint="api/chat/agent-2"
      agent={
        <img
          src="https://noun-api.com/beta/pfp?head=34&glasses=3&background=1&body=13&accessory=11"
          alt=""
        />
      }
      titleText="Assets"
      placeholder="How much eth do I have in Ethereum chain?"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
