const Load = require("../db/model/resouce");

async function removeRE(id) {
    try {
        let result = await Load.remove({
            "_id": id
        });
        return result;
    } catch (error) {
        return error
    }
}
async function findRE(id) {
    try {
        let result = await Load.find({
            "_id": id
        });
        return result;
    } catch (error) {
        return error
    }
}
async function findUserRE(username) {
    try {
        let result = await Load.find({
            "username": username
        });
        return result;
    } catch (error) {
        return error
    }
}
async function addRE(username,description,filename, url) {
    try {
        let load = new Load({
            username: username,
            filename:filename,
            description:description,
            url:url,
        });
        let result = await load.save();
        console.log(result);
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    removeRE,
    addRE,
    findRE,
    findUserRE
}