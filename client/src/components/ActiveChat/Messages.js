import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, user } = props;

  // filter messages which isRead is true and senderId is by me
  // as the isRead would be populated by the other user
  let lastReadByOtherUserMessages = messages.filter((message) => {
    return message.isRead === true && message.senderId === user.id;
  });

  let lastReadMessage =
    lastReadByOtherUserMessages[lastReadByOtherUserMessages.length - 1];

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === user.id ? (
          <SenderBubble
            key={message.id}
            messageId={message.id}
            text={message.text}
            isRead={message.isRead}
            lastReadMessage={lastReadMessage}
            time={time}
            user={user}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
