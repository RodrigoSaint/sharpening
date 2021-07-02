import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import List from "@rodrigosaint/list";
import styled from "styled-components";
import { addMilliseconds } from "date-fns";
import StackOption from "@rodrigosaint/stack-option";
import { FaTimes } from "react-icons/fa";

import Message, { MessageProps } from "./message";

interface MessageItem extends MessageProps {
  timeout?: number;
  visibleUntilClosed?: boolean;
  expiresAt?: Date;
  id?: string;
}

interface MessageContext {
  addMessage(message: MessageItem): void;
  removeMessage(message: MessageItem): void;
  messageCollection: MessageItem[];
}

const MessageHubContext = createContext<MessageContext>({
  addMessage: () => {},
  removeMessage: () => {},
  messageCollection: [],
});

export function useMessageHub(): MessageContext {
  return useContext(MessageHubContext);
}

const MessageHubContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 350px;
  width: 100%;
`;

interface MessageHubProps {
  children: React.ReactNode;
}

export default function MessageHub({ children }: MessageHubProps) {
  const [messageCollection, setMessageCollection] = useState<MessageItem[]>([]);

  const addMessage = useCallback(
    (message: MessageItem) => {
      const expiresAt = message.visibleUntilClosed
        ? null
        : addMilliseconds(new Date(), message.timeout);

      setMessageCollection([
        { ...message, id: Math.random().toString(), expiresAt },
        ...messageCollection,
      ]);
    },

    [messageCollection]
  );

  const removeMessage = useCallback(
    (message: MessageItem) =>
      setMessageCollection(messageCollection.filter((m) => m !== message)),
    [messageCollection]
  );

  useEffect(() => {
    const id = setInterval(
      () =>
        setMessageCollection(
          messageCollection.filter(
            (message) =>
              message.expiresAt > new Date() || message.visibleUntilClosed
          )
        ),
      1000
    );
    return () => clearInterval(id);
  }, [messageCollection, setMessageCollection]);

  return (
    <MessageHubContext.Provider
      value={{ messageCollection, addMessage, removeMessage }}
    >
      <MessageHubContent>
        <List
          getKey={({ id }) => id}
          collection={messageCollection}
          render={(message) => (
            <StackOption
              position="top-right"
              style={{ width: "100%" }}
              renderOption={() => (
                <FaTimes
                  onClick={() => removeMessage(message)}
                  style={{
                    color: "red",
                    fontSize: 18,
                    cursor: "pointer",
                    margin: "10px",
                  }}
                />
              )}
            >
              <Message {...message} />
            </StackOption>
          )}
          style={{ type: "vertical", spacing: "4px" }}
        />
      </MessageHubContent>
      {children}
    </MessageHubContext.Provider>
  );
}
