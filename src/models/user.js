const table = {
    TABLE: "users",
    COLUMN: {
        ID: "ID",
        COMPANY_ID: "COMPANY_ID",
        PROJECT_ID: "PROJECT_ID",
        USERNAME: "USERNAME",
        EMAIL: "EMAIL",
        PASSWORD: "PASSWORD",
        LEVEL: "LEVEL",
        SINCE: "SINCE",
    }
}

const QUERY = {
    insert : `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.COMPANY_ID}, ${table.COLUMN.PROJECT_ID}, ${table.COLUMN.USERNAME}, ${table.COLUMN.EMAIL}, ${table.COLUMN.PASSWORD}, ${table.COLUMN.LEVEL}) VALUES (?,?,?,?,?,?,?)`
}

module.exports = {
    userTable: table,
    userQuerys: QUERY,
}