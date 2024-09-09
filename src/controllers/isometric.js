const isometricController = {
    add: {
        upload: async (req, res, next) => {
            const { projectId, userId } = req.body;
            if (!projectId || !userId || !req.file) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                return res.status(200).json({
                    message: req.file
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        }
    }
}

module.exports = {
    isometricController
}