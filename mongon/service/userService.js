const User = require("../db/model/user");

async function getUser(username, password) {
    try {
        let result = await User.find({
            username: username,
            password: password
        });
        return result;
    } catch (error) {
        return error
    }
}
async function getAll() {
    try {
        let result = await User.find();
        return result;
    } catch (error) {
        return error
    }
}
async function getUsername(username) {
    try {
        let result = await User.find({
            username: username
        });
        return result;
    } catch (error) {
        return error
    }
}
async function addUser(username, password, phone, email, school, edu, star, review) {
    try {
        let use = new User({
            username: username,
            password: password,
            phone: phone,
            email: email,
            school: school,
            edu: edu,
            star: star,
            review: review,
        });
        let result = await use.save();
        return result;
    } catch (error) {
        return error
    }
}
async function setInfor(username, phone, email, school, edu, star, review) {
    try {
        let result = await User.updateOne(
        {username: username},    
        {
            phone: phone,
            email: email,
            school: school,
            edu: edu,
            star: star,
            review: review,
        });
        console.log(result);
        return result;
    } catch (error) {
        return error
    }
}
async function setReview(username,review) {
    try {
        let result = await User.updateOne(
            {username: username}, //条件
            {review: review},     //要更新的内容
        )
        return result;
    } catch (error) {
        return error
    }
}
module.exports = {
    getUser,
    getUsername,
    addUser,
    setReview,
    setInfor,
    getAll
}