const table = {
    TABLE: "users",
    COLUMN: {
        ID: "ID",
        COMPANY_ID: "COMPANY_ID",
        PROJECT_ID: "PROJECT_ID",
        USERNAME: "USERNAME",
        EMAIL: "EMAIL",
        PASSWORD: "PASSWORD",
        SINCE: "SINCE",
    }
}

const QUERY = {
    get: {
        onlyOne: {
            all: {
                byEmail: `SELECT * FROM ${table.TABLE} WHERE ${table.COLUMN.EMAIL} = ?`
            },
            email: {
                byEmail: `SELECT ${table.COLUMN.EMAIL} FROM ${table.TABLE} WHERE ${table.COLUMN.EMAIL} = ?`
            }
        },
    },
    insert : `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.COMPANY_ID}, ${table.COLUMN.PROJECT_ID}, ${table.COLUMN.USERNAME}, ${table.COLUMN.EMAIL}, ${table.COLUMN.PASSWORD}) VALUES (?,?,?,?,?,?)`,
    delete: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ID} = ?`,
}

module.exports = {
    userTable: table,
    userQuerys: QUERY,
}