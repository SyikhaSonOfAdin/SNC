const { userServices } = require("../services/user")
const jwt = require('jsonwebtoken');

const userControllers = {
    add: async (req, res, next) => {
        const { companyId, projectId, username, email, password } = req.body
        if (!companyId || !projectId || !username || !email || !password) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            const id = await userServices.add(companyId, projectId, username, email, password)
            return res.status(200).json({
                message: `User added successfully`,
                data: [{
                    userId: id
                }]
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    delete: async (req, res, next) => {
        const { userId } = req.body
        if (!userId) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            await userServices.delete(userId)
            return res.status(200).json({
                message: `User deleted successfully`,
                data: []
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            const user = await userServices.login(email, password)
            if (typeof user !== 'string') {
                return res.status(200).json({
                    message: "Login Success",
                    data: [{
                        ID: user.ID,
                        COMPANY_ID: user.COMPANY_ID,
                        PROJECT_ID: user.PROJECT_ID,
                        USERNAMES: user.USERNAME,
                        EMAIL: user.EMAIL,
                        TOKEN: jwt.sign({ email, password }, process.env.PASSWORD, { expiresIn: '7d' })
                    }]
                })
            }
            return res.status(401).json({ message: user })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = {
    userControllers
}