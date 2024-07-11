const authService = require('../services/auth.service');



const register = async (req, res) => {
    const { username, email, password} = req.body;

    try {
        const token = await authService.registerUser(username, email, password);
        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


module.exports = {
    register,
    login
}