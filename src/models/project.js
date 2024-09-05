const table = {
    TABLE: "company_projects",
    COLUMN: {
        ID: "ID",
        COMPANY_ID: "COMPANY_ID",
        NAME: "NAME",
        INPUT_BY: "INPUT_BY",
        INPUT_DATE: "INPUT_DATE",
    }
}

const QUERY = {
    insert: `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.COMPANY_ID}, ${table.COLUMN.NAME}, ${table.COLUMN.INPUT_BY}) VALUES (?,?,?,?)`
}

module.exports = {
    projectTable: table,
    projectQuerys: QUERY
}