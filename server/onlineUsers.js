class OnlineUsers {
  // Stores a dictionary of structure:
  // {
  //   userId :
  //   {
  //     socketId: int
  //   }
  // }
  constructor() {
    this.users = {};
  }

  // checks if userId exists
  includes(userId) {
    return userId in this.users;
  }

  // returns true if added, false if not added
  addUser(userId, socketId) {
    if (this.users.includes(userId)) return false;
    this.users[userId] = {
      socketId: socketId,
    };
    return true;
  }

  // returns the user structure
  // null if it does not exist
  getUser(userId) {
    if (this.user.includes(userId)) {
      if (this.users.includes(userId)) {
        return this.users[userId];
      }
      return null;
    }
  }

  delete(userId) {
    delete this.users[userId];
  }
}

const onlineUsers = new OnlineUsers();
module.exports = onlineUsers;
