import { drawingQuerys } from "../models/drawing";
import { PoolConnection } from "mysql2/promise";
import { drawing } from "../utils/customTypes";
import { SNC } from "../config/db";
import { v4 } from "uuid";

export const drawingServices = {
  add: {
    onlyOne: async (
      userId: string,
      fileName: string,
      version: string,
      isometricId: string,
      connection?: PoolConnection
    ) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());
      try {
        const id: string = v4();
        await CONNECTION.query(drawingQuerys.insert.onlyOne, [
          isometricId,
          id,
          userId,
          fileName,
          version,
        ]);
      } catch (error) {
        throw error;
      } finally {
        if (!connection && CONNECTION) {
          CONNECTION.release();
        }
      }
    },
    upload: async (
      userId: string,
      projectId: string,
      arrayOfData: drawing[],
      connection?: PoolConnection
    ) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());
      const errorLog: { no: number; message: string; isometricNumber: string }[] = [];
      let errorOccured: number = 1;
      try {
        if (!connection) await CONNECTION.beginTransaction();
        await Promise.all(
          arrayOfData.map(async (items) => {
            try {
              const id: string = v4();
              await CONNECTION.query(drawingQuerys.insert.upload, [
                id,
                userId,
                items.FILE_NAME,
                items.VERSION,
                projectId,
                items.ISO_NO,
              ]);
            } catch (error) {
              errorLog.push({ no: errorOccured++, message: error.message, isometricNumber: items.ISO_NO });
            }
          })
        );
        if (!connection) await CONNECTION.commit();
        return {
          successRate: `${(
            ((arrayOfData.length - errorOccured) / arrayOfData.length) *
            100
          ).toFixed(2)}%`,
          errorLog
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
};
