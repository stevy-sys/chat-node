const {Message,User} = require("../models/")

const allUser = async () => {
    const data = await User.findAll()
    return data
}

module.exports = { allUser };
