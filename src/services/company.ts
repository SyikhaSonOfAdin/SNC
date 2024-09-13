import { companyQuerys } from "../models/companyTable";
import { PoolConnection } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { SNC } from "../config/db";

export const companyServices = {
  add: async (name: string, connection?: PoolConnection) => {
    const CONNECTIONS: PoolConnection = connection || (await SNC.getConnection());
    try {
      const id = uuidv4();
      await CONNECTIONS.query(companyQuerys.insert, [id, name]);
      return id
    } catch (error) {
      throw error;
    } finally {
      if (!connection && CONNECTIONS) {
        CONNECTIONS.release();
      }
    }
  },
  edit: {
    name: async (id: string, name: string, connection?: PoolConnection) => {
      const CONNECTION: PoolConnection = connection || await SNC.getConnection()

      try {
        await CONNECTION.query(companyQuerys.update.name, [name, id])
      } catch (error) {
        throw error
      } finally {
        if (!connection && CONNECTION) {
          CONNECTION.release();
        }
      }
    },
    status: async (id: string, status: string, connection?: PoolConnection) => {
      const CONNECTION: PoolConnection = connection || await SNC.getConnection()

      try {
        await CONNECTION.query(companyQuerys.update.status, [status, id])
      } catch (error) {
        throw error
      } finally {
        if (!connection && CONNECTION) {
          CONNECTION.release();
        }
      }
    }
  },
  delete: async (id: string, connection?: PoolConnection) => {
    let CONNECTIONS: PoolConnection;

    CONNECTIONS = connection || (await SNC.getConnection());
    try {
      await CONNECTIONS.query(companyQuerys.delete, [id]);
    } catch (error) {
      throw error;
    } finally {
      if (!connection && CONNECTIONS) {
        CONNECTIONS.release();
      }
    }
  },
};
