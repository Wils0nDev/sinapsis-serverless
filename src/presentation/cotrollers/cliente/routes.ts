import { Router } from 'express';
import { ClienteService } from '../../services/cliente.service';
import { ClienteController } from './controller';




export class ClienteRoutes {


  static get routes(): Router {

    const router = Router();
    const clienteSerivce = new ClienteService()
    const controller = new ClienteController(clienteSerivce)
    router.post('/', controller.createCliente );

    return router;
  }


}

