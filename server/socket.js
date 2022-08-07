const socketio = require("socket.io");

let io;
class myIoClass {
  init(server) {
    io = socketio(server, {
        cors: {
          origin: "*",
        },
      });
    return io;
  }

  getIO() {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  }

  closeConn(){
    io.close()
  }
}
module.exports = new myIoClass();

