const Admin = require("../db/model/admin");

async function getAdmin(username, password) {
    try {
        let result = await Admin.find({
            username: username,
            password: password
        });
        console.log("aaaa jjj",result);
        return result;
    } catch (error) {
        return error
    }
}
async function getUsername(username) {
    try {
        let result = await Admin.find({
            username: username
        });
        return result;
    } catch (error) {
        return error
    }
}
async function addAdmin(username, password, nickname) {
    try {
        let use = new Admin({
            username: username,
            password: password,
            nickname: nickname
        });
        let result = await use.save();
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    getAdmin,
    getUsername,
    addAdmin,
}