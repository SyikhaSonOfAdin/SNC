import { projectQuerys } from "../models/project";
import { PoolConnection } from "mysql2/promise";
import { SNC } from "../config/db";
import { v4 } from "uuid";

export const projectServices = {
    add: async (companyId: string, name: string, desc: string, userId: string, connection?: PoolConnection) => {
        const CONNECTION: PoolConnection = connection || await SNC.getConnection()
        try {
            const id: string = v4()
            await CONNECTION.query(projectQuerys.insert, [id, companyId, name, desc, userId])
            return id
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    },
    edit: async (projectId: string, name: string, desc: string, status: string, userId: string, connection?: PoolConnection) => {
        const CONNECTION: PoolConnection = connection || await SNC.getConnection()
        try {
            await CONNECTION.query(projectQuerys.update.all, [name, desc, userId, status, projectId])
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    },
    delete: {
        onlyOne: async (projectId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()

            try {
                await CONNECTION.query(projectQuerys.delete.onlyOne, [projectId])
            } catch (error) {
                throw error
            } finally {
                CONNECTION.release()
            }
        }
    }
}