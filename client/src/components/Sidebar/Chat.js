import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import {
  readMessage,
  fetchConversations,
} from "../../store/utils/thunkCreators";

import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.setUnreadMessagesToBeRead();
  };

  setUnreadMessagesToBeRead = () => {
    if (!this.props.conversation || !this.props.conversation.id) return;
    if (this.props.conversation.unreadMessagesCount > 0) {
      this.props.readMessage(
        this.props.conversation.otherUser.id,
        this.props.conversation.id
      );
    }
    return;
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={this.props.conversation}
          activeConversation={this.props.activeConversation}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessage: (otherUserId, conversationId) => {
      dispatch(readMessage(otherUserId, conversationId));
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations,
    activeConversation: state.activeConversation,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
