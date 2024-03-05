import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { handlerError } from "@/shared";
import { MensajeService } from '../../services/mensaje.service';
import { CreateMensajeDto } from "@/domain/dto/mensaje/create-mensaje.dto";
import { UpdateMensajeDto } from "@/domain/dto/mensaje/update-mensaje.dto";
import { SendMensajeDto } from "@/domain/dto/mensaje/send-mensaje.dto";
import { FilterMensajeDto } from "@/domain/dto/mensaje/filter-mensaje.dto";

export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  createMensaje = async (req: Request, res: Response) => {
    const { body } = req;
    const mensaje = new CreateMensajeDto();
    try {
        mensaje.mensaje = body.mensaje;
        mensaje.campania = body.campania;
        await validateOrReject(mensaje);
        await this.mensajeService
        .createMensaje(mensaje)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };

  updateStateMensaje = async (req: Request, res: Response) => {
    const { body } = req;

    const id = +req.params.id! 

    const mensaje = new UpdateMensajeDto();
    try {
        mensaje.id = id
        mensaje.mensaje = body.mensaje;
        mensaje.estado = body.estado;
        
        await validateOrReject(mensaje);
        await this.mensajeService
        .updateMensaje(mensaje)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };


  sendMensaje = async (req: Request, res: Response) => {

    const { body } = req;

    const mensaje = new SendMensajeDto();
    try {
        mensaje.id = body.id
        await validateOrReject(mensaje);
        await this.mensajeService
        .sendMensaje(mensaje)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };

  filterMensaje = async  (req: Request, res: Response) => {

      const { body } = req;

      const filter = new FilterMensajeDto();
      try {
          filter.id = body.id
          filter.estadoEnvio = body.estadoEnvio
          filter.fechaHoraEnvio =  body.fechaHoraEnvio
          filter.cliente =  body.cliente

          await validateOrReject(filter);
          await this.mensajeService
          .filterMensaje(filter)
          .then((resp) => res.status(200).json(resp))
          .catch((err) => handlerError(err, res));
      } catch (e: any) {
        const message = Object.values(e[0].constraints);
        res.status(400).send({ message });
      }

  }
}
