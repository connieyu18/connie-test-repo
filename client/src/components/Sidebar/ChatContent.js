import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchConversations,
  readMessage,
} from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    backgroundColor: "#3F92FF",
    marginRight: 20,
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser, unreadMessagesCount } = conversation;
  console.log("props", unreadMessagesCount);
  const setUnreadMessagesToBeRead = () => {
    if (!props.conversation || !props.conversation.id) return;
    readMessage(props.conversation.otherUser.id, props.conversation.id);
    return;
  };

  useEffect(() => {
    if (
      unreadMessagesCount > 0 &&
      activeConversation === conversation.otherUser.username
    ) {
      console.log(activeConversation, conversation.otherUser.username);
      setUnreadMessagesToBeRead();
    }
    async function fetchData() {
      await props.fetchConversations();
    }
    fetchData();
  }, [latestMessageText, unreadMessagesCount]);

  //   useEffect(() => {
  //     (async () => {
  //       const products = await api.index()
  //       setFilteredProducts(products)
  //       setProducts(products)
  //     })()
  //
  //     return () => {
  //       unsubscribeOrRemoveEventHandler() // 👍
  //     }
  //   }, [])

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessagesCount > 0 &&
        activeConversation !== conversation.otherUser.username && (
          <Badge
            classes={{ badge: `${classes.notification}` }}
            badgeContent={unreadMessagesCount}
          />
        )}
    </Box>
  );
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

export default connect(null, mapDispatchToProps)(ChatContent);
