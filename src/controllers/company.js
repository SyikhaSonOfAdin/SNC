const { companyServices } = require("../services/company")

const company = {
    registration: async (req, res, next) => {
        const { name } = req.body

        if (!name) return res.status(400).json({ message: "Invalid Parameter" })

        try {
            await companyServices.add(name)
            res.status(200).json({ message: "Registration Success" })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    edit: async (req, res, next) => {
        const { id, name, status } = req.body

        if (!id || !name && !status) return res.status(400).json({ message: "Invalid Parameter" })

        try {
            await companyServices.edit(id, name, status)
            res.status(200).json({ message: "Registration Success" })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = {
    companyControllers: company
}