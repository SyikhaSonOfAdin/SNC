import { FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";
import { permissionsQuerys } from "../models/permissions";
import { SNC } from "../config/db";
import { permission } from "../utils/customTypes";

export const permissionServices = {
    get: async (connection?: PoolConnection) => {
        const CONNECTION = connection || await SNC.getConnection()
        try {
            const [data]: [RowDataPacket[], FieldPacket[]] = await CONNECTION.query(permissionsQuerys.get)
            const permissions: permission[] = data as permission[]
            return permissions
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    }
}