import { PoolConnection } from "mysql2/promise";
import { jointQuerys } from "../models/joint";
import { SNC } from "../config/db";
import { v4 } from "uuid";

export const jointServices = {
    add: {
        onlyOne: async (projectId: string, userId: string, jointNo: string, shopField: string, diameter: string, itemCode1: string, itemCode2: string, identCode1: string, identCode2: string, isoNo: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()

            try {
                const id: string = v4()
                await CONNECTION.query(jointQuerys.insert, [id, userId, jointNo, shopField, diameter, itemCode1, itemCode2, identCode1, identCode2, projectId, isoNo])
                return id
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release()
                }
            }
        },
        upload: async (
            userId: string,
            projectId: string,
            arrayOfData: {
                JOINT_NO: string;
                "S/F": string;
                DB: string;
                ITEM_CODE1: string;
                ITEM_CODE2: string;
                IDENT_CODE1: string;
                IDENT_CODE2: string;
                ISO_NO: string;
            }[],
            connection?: PoolConnection
        ) => {
            const CONNECTION: PoolConnection = connection || (await SNC.getConnection());
            let errorOccured: number = 1;
            const errorLog: { no: number; message: string }[] = [];
            try {
                if (!connection) await CONNECTION.beginTransaction()
                await Promise.all(
                    arrayOfData.map(async (items) => {
                        try {
                            const id: string = v4();
                            await CONNECTION.query(jointQuerys.insert, [
                                id,
                                userId,
                                items.JOINT_NO,
                                items["S/F"],
                                items.DB,
                                items.ITEM_CODE1,
                                items.ITEM_CODE2,
                                items.IDENT_CODE1,
                                items.IDENT_CODE2,
                                projectId,
                                items.ISO_NO,
                            ]);
                        } catch (error) {
                            errorLog.push({ no: errorOccured++, message: error.message });
                        }
                    })
                );
                if (!connection) await CONNECTION.commit()
                return {
                    successRate: `${((arrayOfData.length - errorOccured) / arrayOfData.length * 100).toFixed(2)}%`,
                    // errorLog,
                };
            } catch (error) {
                throw error;
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release();
                }
            }
        },
    },
    delete: {
        all: async (projectId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()
            try {
                await CONNECTION.query(jointQuerys.delete.all, [projectId])
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release()
                }
            }
        },
        onlyOne: async (jointId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()

            try {
                await CONNECTION.query(jointQuerys.delete.onlyOne, [jointId])
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release();
                }
            }
        },
        perIsometric: async (isometricId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || await SNC.getConnection()

            try {
                await CONNECTION.query(jointQuerys.delete.perIsometric, [isometricId])
            } catch (error) {
                throw error
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release();
                }
            }
        },
    },
    edit: async (userId: string, jointId: string, jointNo: string, shopField: string, diameter: string, itemCode1: string, itemCode2: string, identCode1: string, identCode2: string, heatNo1: string, heatNo2: string, connection?: PoolConnection) => {
        const CONNECTION: PoolConnection = connection || await SNC.getConnection()
        try {
            await CONNECTION.query(jointQuerys.edit, [userId, jointNo, shopField, diameter, itemCode1, itemCode2, identCode1, identCode2, heatNo1, heatNo2, jointId])
        } catch (error) {
            throw error
        } finally {
            if (!connection && CONNECTION) {
                CONNECTION.release();
            }
        }
    },
    get: {
        perIsometric: async (isometricId: string, connection?: PoolConnection) => {
            const CONNECTION: PoolConnection = connection || (await SNC.getConnection());
    
            try {
                const [data] = await CONNECTION.query(jointQuerys.get, [isometricId]);
                return data;
            } catch (error) {
                throw error;
            } finally {
                if (!connection && CONNECTION) {
                    CONNECTION.release();
                }
            }
        },
    },
};
