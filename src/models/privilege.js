const { permissionsTable } = require("./permissions")

const table = {
    TABLE: "user_permissions",
    COLUMN: {
        ID: "ID",
        USER_ID: "USER_ID",
        PERMISSION_ID: "PERMISSION_ID",
    }
}

const QUERY = {
    get: `SELECT * ${table.TABLE} WHERE ${table.COLUMN.USER_ID} = ?`,
    insert: `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.USER_ID}, ${table.COLUMN.PERMISSION_ID}) VALUES (?,?,?)`,
    delete: {
        all: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.USER_ID} = ?`,
        onlyOne: `DELETE A.* FROM ${table.TABLE} AS A JOIN ${permissionsTable.TABLE} AS B ON ${table.COLUMN.PERMISSION_ID} = ${permissionsTable.COLUMN.ID} WHERE A.${table.COLUMN.USER_ID} = ? AND B.${permissionsTable.COLUMN.NAME} = ?`,
    }
}

module.exports = {
    privilegeTable: table,
    privilegeQuerys: QUERY
}