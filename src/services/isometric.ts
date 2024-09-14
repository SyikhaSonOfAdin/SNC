import { isometricQuerys } from "../models/isometric";
import { FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";
import { SNC } from "../config/db";
import { v4 } from "uuid";
import { drawingServices } from "./drawing";

export const isometricServices = {
  add: {
    onlyOne: async (
      projectId: string,
      isoNo: string,
      lineNo: string,
      userId: string,
      connection?: PoolConnection
    ) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());
      try {
        const id: string = v4();
        await CONNECTION.query(isometricQuerys.insert, [
          id,
          projectId,
          isoNo,
          lineNo,
          userId,
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
      projectId: string,
      userId: string,
      arrayOfData: { ISO_NO: string; LINE_NO: string }[],
      connection?: PoolConnection
    ) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());
      const errorLog: { no: number; message: string }[] = [];
      let errorOccured: number = 0;

      try {
        if (!connection) await CONNECTION.beginTransaction();
        await Promise.all(
          arrayOfData.map(async (items) => {
            try {
              const id: string = v4();
              await CONNECTION.query(isometricQuerys.insert, [
                id,
                projectId,
                items.ISO_NO,
                items.LINE_NO,
                userId,
              ]);
            } catch (error) {
              errorLog.push({ no: errorOccured++, message: error.message });
            }
          })
        );
        if (!connection) await CONNECTION.commit();

        return {
          successRate: `${(
            ((arrayOfData.length - errorOccured) / arrayOfData.length) *
            100
          ).toFixed(2)}%`,
          // errorLog
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
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());

      try {
        await CONNECTION.query(isometricQuerys.delete.all, [projectId]);
      } catch (error) {
        throw error;
      } finally {
        if (!connection && CONNECTION) {
          CONNECTION.release();
        }
      }
    },
    onlyOne: async (isometricId: string, connection?: PoolConnection) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());

      try {
        await CONNECTION.query(isometricQuerys.delete.onlyOne, [isometricId]);
      } catch (error) {
        throw error;
      } finally {
        if (!connection && CONNECTION) {
          CONNECTION.release();
        }
      }
    },
  },
  edit: async (
    isoNo: string,
    lineNo: string,
    userId: string,
    isometricId: string,
    connection?: PoolConnection
  ) => {
    const CONNECTION: PoolConnection =
      connection || (await SNC.getConnection());
    try {
      await CONNECTION.query(isometricQuerys.update, [
        isoNo,
        lineNo,
        userId,
        isometricId,
      ]);
    } catch (error) {
      throw error;
    } finally {
      if (!connection && CONNECTION) {
        CONNECTION.release();
      }
    }
  },
  get: {
    perProject: async (
      projectId: string,
      page: number,
      perPage: number,
      connection?: PoolConnection
    ) => {
      const CONNECTION: PoolConnection =
        connection || (await SNC.getConnection());
      try {
        const [data]: [RowDataPacket[], FieldPacket[]] = await CONNECTION.query(
          isometricQuerys.get,
          [projectId, perPage, (page * perPage)]
        );
        const isometrics = data as {
          ID: string;
          ISO_NO: string;
          LINE_NO: string;
          INPUT_DATE: string;
          INPUT_BY: string;
        }[];
        const result = await Promise.all(isometrics.map(async (items) => {
            const drawings = await drawingServices.get.perIsometric(items.ID, connection)
            return {
                ...items,
                DRAWINGS: drawings
            }
        }))
        return result
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
