import { envs } from './config/envs';
import { MongoConnection } from './data/mongo/mongo.connection';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


function main() {

  MongoConnection.connection({
    url: envs.MONGO_URL, 
    dbName: envs.MONGO_DBNAME
  })


  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}