import mongoose from "mongoose";

interface MongoOptions {
  url: string;
  dbName?: string;
}

export class MongoConnection {
  public static async connection(option: MongoOptions) {
    const { dbName = "inventario", url } = option;

    try {
      await mongoose.connect(url, {
        dbName,
      });

      console.log("Conexion exitosa a MONGODB");
    } catch (error) {
      console.log("Error al intentar conectar a la BD", error);
    }
  }
}
