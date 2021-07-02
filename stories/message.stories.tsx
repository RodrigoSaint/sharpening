import React from "react";
import { Meta } from "@storybook/react";

import Message, { MessageHub, useMessageHub } from "../packages/message/source";

export default {
  title: "Message",
  component: Message,
} as Meta;

export const DefaultMessage = () => (
  <Message header="Error" description="Something Happened" />
);

function MessageContent() {
  const { addMessage } = useMessageHub();
  return (
    <>
      <button
        onClick={() =>
          addMessage({
            header: "Short message",
            description: "this is a new message",
            timeout: 500,
          })
        }
      >
        Short message
      </button>
      <button
        onClick={() =>
          addMessage({
            header: "Long message",
            description: "this is a new message",
            timeout: 5000,
            visibleUntilClosed: true,
          })
        }
      >
        Long message
      </button>
    </>
  );
}

export const MessageHubExample = () => {
  return (
    <MessageHub>
      <MessageContent />
    </MessageHub>
  );
};
