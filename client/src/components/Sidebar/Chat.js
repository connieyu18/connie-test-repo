import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { readMessage } from "../../store/utils/thunkCreators";

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
  //check if current user has any unread messages while it was still active
  getPreviousChatConvo = async () => {
    for (let convo of this.props.conversations) {
      if (convo.otherUser.username === this.props.activeConversation) {
        let unreadMsgCount = 0;
        for (let message of convo.messages) {
          if (message.isRead == false) {
            unreadMsgCount++;
          }
        }
        if (unreadMsgCount > 0) {
          await this.props.readMessage(convo.otherUser.id, convo.id);
        }
      }
    }
  };

  handleClick = async (conversation) => {
    //check if the current active user is the same as the new chat user, if not, then we get the current active user's convo and check if has unread messages. We set any 'unread' messages to 'read' by calling API(read-messages). We can't check if user is active on the other browser thus we can't just set the messages to read === true when the sender is posting a new message to that user.

    if (
      this.props.activeConversation &&
      this.props.activeConversation !== conversation.otherUser.username
    ) {
      this.getPreviousChatConvo();
    }
    await this.props.setActiveChat(conversation.otherUser.username);
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
