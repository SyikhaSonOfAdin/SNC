const { SNC } = require("../config/db");
const { excelServices } = require("../services/excel");
const { isometricServices } = require("../services/isometric");
const { jointServices } = require("../services/joint");

const isometricController = {
    add: {
        onlyOne: async (req, res, next) => {
            const { projectId, userId, isoNo, lineNo } = req.body;
            if (!projectId || !userId || !isoNo || !lineNo) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                await isometricServices.add.onlyOne(projectId, isoNo, lineNo, userId)
                return res.status(200).json({
                    message: "Isometric added Successfully",
                    data: []
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        },
        upload: async (req, res, next) => {
            const { projectId, userId } = req.body;
            if (!projectId || !userId || !req.file) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                const connection = await SNC.getConnection()
                await connection.beginTransaction()
                try {
                    const arrayOfData = await excelServices.getData(req.file.filename)
                    const isometric = await isometricServices.add.upload(projectId, userId, arrayOfData, connection)
                    const joint = await jointServices.add.upload(userId, projectId, arrayOfData, connection)
                    await connection.commit()
                    return res.status(200).json({
                        message: "Upload Successfully",
                        data: [{
                            isometric,
                            joint
                        }]
                    })
                } catch (error) {
                    connection.rollback()
                    return res.status(500).json({
                        message: error.message
                    })
                } finally {
                    connection.release()
                }
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