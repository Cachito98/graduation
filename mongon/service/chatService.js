const Chat = require("../db/model/chatroom");

async function removeChats(username) {
    try {
        let result = await Chat.remove({
            username: username
        });
        return result;
    } catch (error) {
        return error
    }
}
async function addChats(username) {
    try {
        let chats = new Chat({
            username: username
        });
        let result = await chats.save();
        console.log(result);
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    removeChats,
    addChats
}