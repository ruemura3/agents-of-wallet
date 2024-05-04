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
          Greetings, citizen.
          <br />
          Phil Coulstone at your service.
          <br />
          How can I assist you today?
        </div>
      </div>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat"
      agent={
        <img
          src="https://noun-api.com/beta/pfp?head=68&glasses=3&background=0&body=13&accessory=12"
          alt=""
        />
      }
      titleText="Chat"
      placeholder="Ask me anything!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
