/*
ADD THIS QUERY TO TABLE list_isometric, kueri ini mencegah duplikasi data 
iso no pada projectId yang sama 
QUERY :
ALTER TABLE list_isometric
ADD CONSTRAINT unique_project_iso UNIQUE (PROJECT_ID, ISO_NO);
*/
const { userTable } = require("./user")

const table = {
    TABLE: "list_isometric",
    COLUMN: {
        ID: "ID",
        PROJECT_ID: "PROJECT_ID",
        INPUT_BY: "INPUT_BY",
        INPUT_DATE: "INPUT_DATE",
        LINE_NO: "LINE_NO",
        ISO_NO: "ISO_NO",
    }
}
 
const QUERY = {
    get: `SELECT LI.${table.COLUMN.ID}, LI.${table.COLUMN.ISO_NO}, LI.${table.COLUMN.LINE_NO}, DATE_FORMAT(LI.${table.COLUMN.INPUT_DATE}, '%Y-%m-%d') AS INPUT_DATE, U.${userTable.COLUMN.USERNAME} AS INPUT_BY FROM ${table.TABLE} AS LI LEFT JOIN ${userTable.TABLE} AS U ON LI.${table.COLUMN.INPUT_BY} = U.${userTable.COLUMN.ID} WHERE LI.${table.COLUMN.PROJECT_ID} = ? LIMIT ? OFFSET ?`,
    insert: `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.PROJECT_ID}, ${table.COLUMN.ISO_NO}, ${table.COLUMN.LINE_NO}, ${table.COLUMN.INPUT_BY}) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE ${table.COLUMN.INPUT_BY} = VALUES(${table.COLUMN.INPUT_BY}), ${table.COLUMN.INPUT_DATE} = NOW(), ${table.COLUMN.LINE_NO} = VALUES(${table.COLUMN.LINE_NO})`,
    update: `UPDATE ${table.TABLE} SET ${table.COLUMN.ISO_NO} = ?, ${table.COLUMN.LINE_NO} = ?, ${table.COLUMN.INPUT_BY} = ?, ${table.COLUMN.INPUT_DATE} = ? WHERE ${table.COLUMN.ID} = ?`,
    delete: {
        all: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.PROJECT_ID} = ?`,
        onlyOne: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ID} = ?`,
    }
}

module.exports = {
    isometricTable: table,
    isometricQuerys: QUERY
}