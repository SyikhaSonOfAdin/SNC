const table = {
    TABLE: "company_projects",
    COLUMN: {
        ID: "ID",
        COMPANY_ID: "COMPANY_ID",
        NAME: "NAME",
        DESCRIPTION: "DESCRIPTION",
        INPUT_BY: "INPUT_BY",
        INPUT_DATE: "INPUT_DATE",
        STATUS: "STATUS",
    }
}

const QUERY = {
    insert: `INSERT INTO ${table.TABLE} (${table.COLUMN.ID}, ${table.COLUMN.COMPANY_ID}, ${table.COLUMN.NAME}, ${table.COLUMN.DESCRIPTION}, ${table.COLUMN.INPUT_BY}) VALUES (?,?,?,?,?)`,
    delete: {
        onlyOne: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ID} = ?`
    },
    update: {
        all: `UPDATE ${table.TABLE} SET ${table.COLUMN.NAME} = ?, ${table.COLUMN.DESCRIPTION} = ?, ${table.COLUMN.INPUT_BY} = ?, ${table.COLUMN.STATUS} = ?, ${table.COLUMN.INPUT_DATE} = NOW() WHERE ${table.COLUMN.ID} = ?`
    }
}

module.exports = {
    projectTable: table,
    projectQuerys: QUERY
}