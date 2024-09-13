import { RowDataPacket, FieldPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise"
import { user } from "../utils/customTypes";
import { userQuerys } from "../models/user"
import { SNC } from "../config/db"
import * as argon2 from "argon2";
import { v4 } from "uuid"

export const userServices = {
    add: async (companyId: string, projectId: string, username: string, email: string, password: string, connection?: PoolConnection): Promise<string> => {
        const CONNECTION: PoolConnection = connection || (await SNC.getConnection())

        try {
            const id = v4()
            const hashedPassword = await argon2.hash(password)

            await CONNECTION.query(userQuerys.insert, [id, companyId, projectId, username, email, hashedPassword])
            return id
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release()
            }
        }
    },
    check: {
        email: async (email: string, connection?: PoolConnection) => {
            const CONNECTION = connection || (await SNC.getConnection())
            try {
                const [data]: [RowDataPacket[], FieldPacket[]] = await CONNECTION.query(userQuerys.get.onlyOne.email.byEmail, [email])
                if (data.length > 0) return true
                return false
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release()
                }
            }
        }
    },
    delete: async (userId: string, connection?: PoolConnection) => {
        const CONNECTION = connection || await SNC.getConnection()

        try {
            await CONNECTION.query(userQuerys.delete, [userId])
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release();
            }
        }
    },
    login: async (email: string, password: string, connection?: PoolConnection): Promise<user | string> => {
        const CONNECTION: PoolConnection = connection || (await SNC.getConnection());

        try {
            const [isExist]: [RowDataPacket[], FieldPacket[]] = await CONNECTION.query(userQuerys.get.onlyOne.all.byEmail, [email]);

            if (isExist.length > 0) {
                const user: user = isExist[0] as user
                const isMatch: boolean = await argon2.verify(user.PASSWORD, password);

                if (isMatch) {
                    return user
                } else {
                    return "Invalid email or password"
                }
            } else {
                return "Email not found"
            }
        } catch (error) {
            throw error;
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release();
            }
        }
    },

}