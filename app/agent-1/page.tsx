import { ChatWindowTrend } from "@/components/ChatWindowTrend";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <div className="flex items-center gap-8">
        <img
          src="https://noun-api.com/beta/pfp?head=151&glasses=3&background=1&body=13&accessory=6"
          alt=""
        />
        <div>
          Hello!
          <br />
          I&apos;m here to give you crypto trend info and help with any
          questions you might have.
          <br />
          <br />
          Dogecoin (DOGE) has increased by 17.17% in the last 24 hours!
        </div>
      </div>
    </div>
  );
  return (
    <ChatWindowTrend
      endpoint="api/chat/agent-1"
      agent={
        <img
          src="https://noun-api.com/beta/pfp?head=151&glasses=3&background=1&body=13&accessory=6"
          alt=""
        />
      }
      titleText="Chat"
      placeholder="Ask me anything!"
      emptyStateComponent={InfoCard}
    ></ChatWindowTrend>
  );
}
