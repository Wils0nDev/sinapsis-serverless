import { Router } from 'express';
import { CampaniaController } from './controller';
import { CampaniaService } from '@/presentation/services/campania.service';




export class CampaniaRoutes {


  static get routes(): Router {

    const router = Router();
    const campaniaService = new CampaniaService()
    const controller = new CampaniaController(campaniaService)
    router.post('/', controller.createCampania );

    return router;
  }


}

