const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const Sequelize = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, isRead } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // check that conversationId belongs to the senderId + recipientId

      // get conversation by id
      let conversation = await Conversation.findConversationById(
        conversationId
      );

      // conversation id is invalid
      if (!conversation) {
        return res.sendStatus(404);
      }

      // sender and recipient are indeed part of the conversation
      if (
        (conversation.user1Id == senderId &&
          conversation.user2Id == recipientId) ||
        (conversation.user1Id == recipientId &&
          conversation.user2Id == senderId)
      ) {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
          isRead,
        });
        return res.json({ message, sender });
      }

      // conversation id is not valid for given senderId and recipientId
      return res.sendStatus(400);
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isRead,
    });
    res.json({ message, sender });
    return;
  } catch (error) {
    next(error);
  }
});

router.put("/read", (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const { otherUserId, conversationId } = req.body;
  //update messages' read status to true if correct senderID and conversationID
  Message.update(
    { isRead: true },
    {
      where: {
        senderId: otherUserId,
        conversationId: conversationId,
        isRead: false,
      },
    }
  )
    .then((rowsUpdated) => {
      res.json(rowsUpdated);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
