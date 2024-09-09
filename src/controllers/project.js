const { projectServices } = require("../services/project");

const projectControllers = {
    add: async (req, res, next) => {
        const { companyId, name, desc, userId } = req.body;
        if (!companyId || !name || !userId) return res.status(400).json({ message: "Invalid Parameter" })

        try {
            const id = await projectServices.add(companyId, name, desc, userId)
            return res.status(200).json({
                message: "Project added successfully",
                data: [{
                    projectId: id,
                }]
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    edit: async (req, res, next) => {
        const { projectId, name, desc, status, userId } = req.body
        if (!projectId || !name || !userId) return res.status(400).json({ message: "Invalid Parameter" })

        try {
            await projectServices.edit(projectId, name, desc, status, userId)
            return res.status(200).json({
                message: "Project edited successfully",
                data: []
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    delete: async (req, res, next) => {
        const { projectId } = req.body
        if (!projectId) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            await projectServices.delete.onlyOne(projectId)
            return res.status(200).json({
                message: "Project deleted successfully",
                data: []
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = {
    projectControllers
}