const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};


module.exports.connexion = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ where: {email} });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            const token = createToken(user.id);
            res.cookie("jwt", token, { httpOnly: true, maxAge });
            return res.status(200).json({ user: user, token });
          }
          return res.status(200).json({ message:"incorrect password" });
        }
        return res.status(200).json({ message:"incorrect email" });
    } catch (err) {
        console.log(err)
        // const errors = signInErrors(err);
        return res.status(500).json( err );
    }
};

module.exports.register = async (req, res) => {
    let { name, email, password , role } = req.body;
    if (!role) {
        role = "user" ;
    }
    try {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password , role });
        res.status(201).json({ user: user });
    } catch (err) {
        console.log(err)
        res.status(200).send({ err });
    }
};

module.exports.deconnect = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "deconnect" });
};