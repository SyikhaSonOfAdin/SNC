import { PoolConnection } from "mysql2/promise";
import { SNC } from "../config/db";
import { privilegeQuerys } from "../models/privilege";
import { v4 } from "uuid";

export const privilegeServices = {
    add: async (userId: string, permissionId: string, connection?: PoolConnection) => {
        const CONNECTION: PoolConnection = connection || await SNC.getConnection()

        try {
            const id: string = v4()
            await CONNECTION.query(privilegeQuerys.insert, [id, userId, permissionId])
            return id
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    },
    delete: {
        all: async (userId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()
    
            try {
                await CONNECTION.query(privilegeQuerys.delete.all, [userId])
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release()
                }
            }
        },
        onlyOne: async (userId: string, permissionId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()
    
            try {
                await CONNECTION.query(privilegeQuerys.delete.onlyOne, [userId, permissionId])
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release()
                }
            }
        },
    },
    get: async (userId: string, connection?: PoolConnection) => {
        const CONNECTION: PoolConnection = connection || await SNC.getConnection()

        try {
            const [data] = await CONNECTION.query(privilegeQuerys.get, [userId])
            return data
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    }
}