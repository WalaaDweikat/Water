import React from "react";
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

export default function App() {
  const handleAllRead = () => console.warn("handleAllRead");

  return (
    <div>
      <MagicBell
        apiKey="df24a28e8921181f6c4220fc306ba76701592d21"
        userEmail="josue@magicbell.io"
      >
        {(props) => (
          <FloatingNotificationInbox
            onNotificationClick={(notification) => console.log(notification)}
            onAllRead={handleAllRead}
            height={600}
            width={500}
            {...props}
          />
        )}
      </MagicBell>
    </div>
  );
}
