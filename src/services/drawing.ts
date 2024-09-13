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
    upload: {
      onlyOne: async (
        userId: string,
        projectId: string,
        fileName: string,
        isoNo: string,
        version: string,
        connection?: PoolConnection
      ) => {
        const CONNECTION: PoolConnection =
          connection || (await SNC.getConnection());
        try {
          const id: string = v4();
          await CONNECTION.query(drawingQuerys.insert.onePerOne, [
            id,
            userId,
            fileName,
            version,
            projectId,
            isoNo,
          ]);
          return {
            fileName: fileName,
            isometricNumber: isoNo,
            version: version,
            status: "success",
            message: "-",
          };
        } catch (error) {
          return {
            fileName: fileName,
            isometricNumber: isoNo,
            version: version,
            status: "failed",
            message: error.message == "Column 'ISOMETRIC_ID' cannot be null" ? "Isometric Not Found" : error.message,
          };
        } finally {
          if (!connection && CONNECTION) {
            CONNECTION.release();
          }
        }
      },
      oneData: async (
        userId: string,
        projectId: string,
        arrayOfData: drawing[],
        connection?: PoolConnection
      ) => {
        const CONNECTION: PoolConnection =
          connection || (await SNC.getConnection());
        const log: {
          fileName: string;
          isometricNumber: string;
          version: string;
          status: string;
          message: string;
        }[] = [];
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
                log.push({
                  fileName: items.FILE_NAME,
                  isometricNumber: items.ISO_NO,
                  version: items.VERSION,
                  status: "success",
                  message: "-",
                });
              } catch (error) {
                errorOccured++
                log.push({
                  fileName: items.FILE_NAME,
                  isometricNumber: items.ISO_NO,
                  version: items.VERSION,
                  status: "failed",
                  message: error.message,
                });
              }
            })
          );
          if (!connection) await CONNECTION.commit();
          return {
            successRate: `${(
              ((arrayOfData.length - errorOccured) / arrayOfData.length) *
              100
            ).toFixed(2)}%`,
            log,
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
  },
};
