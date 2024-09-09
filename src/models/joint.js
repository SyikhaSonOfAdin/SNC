const { isometricTable } = require("./isometric")

const table = {
    TABLE: "list_joint",
    COLUMN: {
        ID: "ID",
        ISOMETRIC_ID: "ISOMETRIC_ID",
        INPUT_BY: "INPUT_BY",
        INPUT_DATE: "INPUT_DATE",
        JOINT_NO: "JOINT_NO",
        SHOP_FIELD: "SHOP_FIELD",
        DB: "DB",
        ITEM_CODE1: "ITEM_CODE1",
        ITEM_CODE2: "ITEM_CODE2",
        IDENT_CODE1: "IDENT_CODE1",
        IDENT_CODE2: "IDENT_CODE2",
        HEAT_NUMBER1: "HEAT_NUMBER1",
        HEAT_NUMBER2: "HEAT_NUMBER2",
    }
}

const QUERY = {
    get: ``,
    insert: `INSERT INTO ${table.TABLE} (${table.COLUMN.ISOMETRIC_ID}, ${table.COLUMN.ID}, ${table.COLUMN.INPUT_BY}, ${table.COLUMN.JOINT_NO}, ${table.COLUMN.SHOP_FIELD}, ${table.COLUMN.DB}, ${table.COLUMN.ITEM_CODE1}, ${table.COLUMN.ITEM_CODE2}, ${table.COLUMN.IDENT_CODE1}, ${table.COLUMN.IDENT_CODE2}) SELECT LI.${isometricTable.COLUMN.ID}, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM ${isometricTable.TABLE} AS LI WHERE LI.${isometricTable.COLUMN.ISO_NO} = ?`,
    delete: {
        all: `DELETE A.* FROM ${table.TABLE} AS A JOIN ${isometricTable.TABLE} AS B ON A.${table.COLUMN.ISOMETRIC_ID} = B.${isometricTable.COLUMN.ID} WHERE B.${isometricTable.COLUMN.PROJECT_ID} = ?`,
        onlyOne: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ID} = ?`,
        perIsometric: `DELETE FROM ${table.TABLE} WHERE ${table.COLUMN.ISOMETRIC_ID} = ?`,
    }
}

module.exports = {
    jointQuerys: QUERY
}