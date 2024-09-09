const { privilegeServices } = require("../services/privilege")

const privilegeController = {
    add: async (req, res, next) => {
        const { userId, permissionId } = req.body
        if (!userId || !permissionId) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            await privilegeServices.add(userId, permissionId)
            return res.status(200).json({ message: "Privilege added Successfully", data: [] })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    delete: {
        onlyOne: async (req, res, next) => {
            const { userId, permissionId } = req.body
            if (!userId || !permissionId) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                await privilegeServices.delete.onlyOne(userId, permissionId)
                return res.status(200).json({ message: "Privilege deleted Successfully", data: [] })
            } catch (error) {
                res.status(500).json({
                    message: error.message
                })
            }
        }
    }
}

module.exports = {
    privilegeController
}