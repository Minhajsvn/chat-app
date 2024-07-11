const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');


const registerUser = async (username, email, password) => {
    let user = await User.findOne({ email });
    if(user){
        throw new Error('User already exists');
    }

    user = new User({
        username,
        email,
        password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user: {
            id: user.id,
        },
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    return token;
}

const loginUser = async (email, password) => {
    let user = await User.findOne({ email });
    if(!user){
        throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Invalid Credentials');
    }

    const payload = {
        user: {
            id: user.id,
        },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    return token;
}

module.exports = {
    registerUser,
    loginUser
}