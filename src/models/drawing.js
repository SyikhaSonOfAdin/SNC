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
    delete: {
        onlyOne: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ID} = ?`,
    },
    get: {
        perIsometric: `SELECT A.${table.COLUMN.ID}, A.${table.COLUMN.NAME} AS FILE_NAME, A.${table.COLUMN.VERSION} AS VERSION, B.${isometricTable.COLUMN.ISO_NO} AS ISO_NO FROM ${table.TABLE} AS A JOIN ${isometricTable.TABLE} AS B ON A.${table.COLUMN.ISOMETRIC_ID} = B.${isometricTable.COLUMN.ID} WHERE B.${isometricTable.COLUMN.ID} = ?`,
        onlyOne: `SELECT A.${table.COLUMN.ID}, A.${table.COLUMN.NAME} AS FILE_NAME, A.${table.COLUMN.VERSION} AS VERSION, B.${isometricTable.COLUMN.ISO_NO} AS ISO_NO FROM ${table.TABLE} AS A JOIN ${isometricTable.TABLE} AS B ON A.${table.COLUMN.ISOMETRIC_ID} = B.${isometricTable.COLUMN.ID} WHERE A.${table.COLUMN.ID} = ?`,
    },
    insert: {
        onlyOne: `INSERT INTO ${table.TABLE} (${table.COLUMN.ISOMETRIC_ID}, ${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.NAME}, ${table.COLUMN.VERSION}) VALUES (?,?,?,?,?)`,
        upload: `INSERT INTO ${table.TABLE} (${table.COLUMN.ISOMETRIC_ID}, ${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.NAME}, ${table.COLUMN.VERSION}) SELECT A.${isometricTable.COLUMN.ID}, ?,?,?,? FROM ${isometricTable.TABLE} AS A WHERE A.${isometricTable.COLUMN.PROJECT_ID} = ? AND A.${isometricTable.COLUMN.ISO_NO} = ?`,
        onePerOne: `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.NAME}, ${table.COLUMN.VERSION}, ${table.COLUMN.ISOMETRIC_ID}) VALUES (?,?,?,?,(SELECT A.${isometricTable.COLUMN.ID} FROM ${isometricTable.TABLE} AS A WHERE A.${isometricTable.COLUMN.PROJECT_ID} = ? AND A.${isometricTable.COLUMN.ISO_NO} = ?)) `,
    }
}

module.exports = {
    drawingTable: table,
    drawingQuerys: QUERY
}