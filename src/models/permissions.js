const table = {
    TABLE: "list_permissions",
    COLUMN: {
        ID: "ID",
        NAME: "NAME",
        DESC: "DESC",
    }
}

const QUERY = {
    get: `SELECT * FROM ${table.TABLE}`
}

module.exports = {
    permissionsQuerys: QUERY,
    permissionsTable: table
}