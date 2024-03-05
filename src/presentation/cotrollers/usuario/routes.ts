import { Router } from 'express';
import { UsuarioController } from './controller';
import { UsuarioService } from '../../services/usuario.service';




export class UsuarioRoutes {


  static get routes(): Router {

    const router = Router();
    const usuarioService = new UsuarioService()
    const controller = new UsuarioController(usuarioService)
    router.post('/', controller.createUsuario );

    return router;
  }


}

