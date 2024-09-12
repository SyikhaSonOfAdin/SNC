const { drawingServices } = require("../services/drawing")

const drawingController = {
    add: {
        onlOne: async (req, res, next) => {
            const { userId, version, isometricId } = req.body
            if (!userId || !version || !isometricId || !req.file) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                await drawingServices.add.onlyOne(userId, req.file.filename, version, isometricId)
                return res.status(200).json({
                    message: "Drawing added Successfully",
                    data: []
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        },
        upload: async (req, res, next) => {

        }
    }
}

module.exports = {
    drawingController
}