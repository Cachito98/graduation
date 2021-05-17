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
async function addUser(username, password,imgurl,introduce,realname, phone, email,educode, school, edu, star, review) {
    try {
        let use = new User({
            username: username,
            password: password,
            imgurl:imgurl,
            introduce:introduce,
            realname:realname,
            phone: phone,
            email: email,
            educode:educode,
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
async function setInfor(username, realname,imgurl,educode,introduce,phone, email, school, edu, star, review) {
    try {
        let result = await User.updateOne(
        {username: username},    
        {
            realname:realname,
            imgurl:imgurl,
            introduce:introduce,
            educode:educode,
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