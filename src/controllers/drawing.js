const { drawingServices } = require("../services/drawing");
const { storageServices } = require("../services/storage");
const unzipper = require('unzipper');
const fs = require('fs-extra');
const path = require('path');
const { v4 } = require("uuid");
const { SNC } = require("../config/db");

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
            const { chunkNumber, totalChunks, fileName, userId, uuid, projectId } = req.body;
            const chunk = req.file;
            const tempDir = path.join(__dirname, '../../../uploads/temp/');
            const tempFilePath = path.join(tempDir, `${uuid + "_" + chunkNumber}.part`);

            await fs.ensureDir(tempDir);
            await fs.move(chunk.path, tempFilePath);

            if (chunkNumber == totalChunks) {
                const finalDir = path.join(__dirname, '../../../uploads/drawing', projectId);
                await fs.ensureDir(finalDir);

                const finalFilePath = path.join(finalDir, fileName);
                const writeStream = fs.createWriteStream(finalFilePath);

                for (let i = 1; i <= totalChunks; i++) {
                    const partPath = path.join(tempDir, `${uuid + "_" + i}.part`);
                    const data = fs.readFileSync(partPath);
                    writeStream.write(data);
                    fs.unlinkSync(partPath);
                }
                writeStream.end();

                // Tunggu hingga semua data selesai ditulis ke file
                await new Promise((resolve) => writeStream.on('finish', resolve));

                // Jika file yang diunggah adalah file ZIP, lakukan ekstraksi
                if (path.extname(fileName) === '.zip') {
                    const connection = await SNC.getConnection()
                    const extractTempDir = path.join(__dirname, '../../../uploads/drawing', projectId, uuid);

                    await fs.createReadStream(finalFilePath)
                        .pipe(unzipper.Extract({ path: extractTempDir }))
                        .promise();
                    const extractedFiles = await fs.readdir(extractTempDir);
                    await fs.ensureDir(finalDir);
                    const names = extractedFiles.map((file) => {
                        const underscoreIndex = file.indexOf('_');
                        const version = (underscoreIndex !== -1 && underscoreIndex < file.lastIndexOf('.'))
                            ? file.substring(underscoreIndex + 1, file.lastIndexOf('.'))
                            : "0";
                        return {
                            FILE_NAME: file,
                            ISO_NO: path.parse(file).name,
                            VERSION: version
                        }
                    })
                    const result = await drawingServices.add.upload(userId, projectId, names)
                    console.log(result)
                    for (const extractedFile of extractedFiles) {
                        const oldFilePath = path.join(extractTempDir, extractedFile);
                        const newFileName = v4() + "@" + extractedFile;
                        const newFilePath = path.join(extractTempDir, newFileName);

                        await fs.move(oldFilePath, path.join(finalDir, newFileName));
                    }

                    await fs.remove(extractTempDir);
                    await fs.unlink(finalFilePath);
                }

            }
            res.status(200).json({ message: "Chunk uploaded successfully" });
        }

    }
}

module.exports = {
    drawingController
}