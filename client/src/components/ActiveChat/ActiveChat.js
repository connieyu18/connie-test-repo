import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import {
  readMessage,
  fetchConversations,
} from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  messageContainer: {
    height: "500px",
    overflow: "scroll",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const { unreadMessagesCount, latestMessageText } = conversation;

  useEffect(() => {
    if (
      unreadMessagesCount > 0 &&
      props.activeConversation === conversation.otherUser.username
    ) {
      setUnreadMessagesToBeRead();
    }
    async function fetchData() {
      await props.fetchConversations();
    }
    fetchData();
  }, [latestMessageText, unreadMessagesCount]);

  const setUnreadMessagesToBeRead = () => {
    if (!props.conversation || !props.conversation.id) return;
    readMessage(props.conversation.otherUser.id, props.conversation.id);
    return;
  };

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Box className={classes.messageContainer}>
              <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                latestMessageText={conversation.latestMessageText}
                user={user}
              />
            </Box>
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
    activeConversation: state.activeConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
    readMessage: (otherUserId, conversationId) => {
      dispatch(readMessage(otherUserId, conversationId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
