import * as path from "path"
import * as xlsx from "xlsx"

export const excelServices = {
    getData: async (fileName: string) => {
        const filePath = path.join(__dirname, '../../../uploads/excel/', fileName);
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames;
        const data: {}[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
        

        return data;
    }
}