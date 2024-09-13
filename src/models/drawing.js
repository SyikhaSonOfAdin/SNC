const { isometricTable } = require("./isometric")

const table = {
    TABLE: "list_drawing",
    COLUMN: {
        ID: "ID",
        ISOMETRIC_ID: "ISOMETRIC_ID",
        INPUT_BY: "INPUT_BY",
        INPUT_DATE: "INPUT_DATE",
        NAME: "NAME",
        VERSION: "VERSION",
    }
}

const QUERY = {
    insert: {
        onlyOne: `INSERT INTO ${table.TABLE} (${table.COLUMN.ISOMETRIC_ID}, ${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.NAME}, ${table.COLUMN.VERSION}) VALUES (?,?,?,?,?)`,
        upload: `INSERT INTO ${table.TABLE} (${table.COLUMN.ISOMETRIC_ID}, ${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.NAME}, ${table.COLUMN.VERSION}) SELECT A.${isometricTable.COLUMN.ID}, ?,?,?,? FROM ${isometricTable.TABLE} AS A WHERE A.${isometricTable.COLUMN.PROJECT_ID} = ? AND A.${isometricTable.COLUMN.ISO_NO} = ?`,
    }
}

module.exports = {
    drawingTable: table,
    drawingQuerys: QUERY
}