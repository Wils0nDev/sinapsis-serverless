import { Router } from 'express';
import { ClienteRoutes } from './cotrollers/cliente/routes';
import { UsuarioRoutes } from './cotrollers/usuario/routes';
import { CampaniaRoutes } from './cotrollers/campania/routes';
import { MensajeRoutes } from './cotrollers/mensaje/routes';




export class AppRoutes {

  //routes : este metodo obtiene todas las rutas de AuthRoutes
  static get routes(): Router {

    const router = Router();
    
    // router.use : por este middleware pasaran mis rutas
     router.use('/api/cliente', ClienteRoutes.routes );
     router.use('/api/usuario', UsuarioRoutes.routes );
     router.use('/api/campania', CampaniaRoutes.routes );
     router.use('/api/mensaje', MensajeRoutes.routes );
    return router;
  }


}

