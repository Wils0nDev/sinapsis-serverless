import { Router } from 'express';
import { MensajeController } from './controller';
import { MensajeService } from '../../services/mensaje.service';




export class MensajeRoutes {


  static get routes(): Router {

    const router = Router();
    const mensajeService = new MensajeService()
    const controller = new MensajeController(mensajeService)
    router.post('/', controller.createMensaje );
    router.patch('/:id', controller.updateStateMensaje );
    router.post('/send', controller.sendMensaje );
    router.post('/filter', controller.filterMensaje );

    return router;
  }


}

