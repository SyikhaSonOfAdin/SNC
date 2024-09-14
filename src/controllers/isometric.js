const { isometricServices } = require("../services/isometric");
const { excelServices } = require("../services/excel");
const { jointServices } = require("../services/joint");
const { SNC } = require("../config/db");

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
                            file: req.file,
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
    },
    delete: {
        all: async (req, res, next) => {
            const { projectId } = req.body
            if (!projectId) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                await isometricServices.delete.all(projectId)
                return res.status(200).json({
                    message: "Isometric deleted Successfully",
                    data: []
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        },
        onlyOne: async (req, res, next) => {
            const { isometricId } = req.body
            if (!isometricId) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                await isometricServices.delete.onlyOne(isometricId)
                return res.status(200).json({
                    message: "Isometric deleted Successfully",
                    data: []
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        }
    },
    edit: async (req, res, next) => {
        const { isoNo, lineNo, userId, isometricId } = req.body
        if (!isoNo || !lineNo || !isometricId) return res.status(400).json({ message: "Invalid Parameter" })
        try {
            await isometricServices.edit(isoNo, lineNo, userId, isometricId)
            return res.status(200).json({
                message: "Isometric edited Successfully",
                data: []
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    get: {
        perProject: async (req, res, next) => {
            const projectId = req.params.projectId
            const perPage = req.query.perPage
            const page = req.query.page

            if (!projectId || !page || !perPage) return res.status(400).json({ message: "Invalid Parameter" })
            try {
                const data = await isometricServices.get.perProject(projectId, parseInt(page), parseInt(perPage))
                return res.status(200).json({
                    message: "Get Isometric perProject Successfully",
                    data: data
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