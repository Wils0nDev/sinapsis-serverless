import { AppRoutes } from './presentation/routes';
import express, { Router } from 'express';
import cors from "cors";

  const app =   main();
  export { app };

 function  main() {

    
    const  app = express();

    const routes: Router = AppRoutes.routes;
   //  app.use(cors)
    app.use( express.json() ); // raw
    app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    app.use( routes );


    return app


}


