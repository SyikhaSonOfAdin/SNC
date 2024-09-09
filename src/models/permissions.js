const table = {
    TABLE: "list_permissions",
    COLUMN: {
        ID: "ID",
        NAME: "NAME",
        DESCRIPTION: "DESCRIPTION",
    }
}

const QUERY = {
    get: `SELECT * FROM ${table.TABLE}`
}

module.exports = {
    permissionsQuerys: QUERY,
    permissionsTable: table
}