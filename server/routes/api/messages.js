const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const authentication = require("../../util/authentication");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    // check cookie for auth and req for the correct user id declared
    if (authentication.isRouteAuthenticated(req) === null) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

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
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
