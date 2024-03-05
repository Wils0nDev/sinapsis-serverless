import { Request, Response } from "express";
import { ClienteService } from "../../services/cliente.service";
import { CreateClienteDto } from "@/domain/dto/cliente/create-cliente.dto";
import { validateOrReject } from "class-validator";
import { handlerError } from "@/shared";

export class ClienteController {
  constructor(private readonly clienteSerivce: ClienteService) {}

  createCliente = async (req: Request, res: Response) => {
    const { body } = req;
    const cliente = new CreateClienteDto();
    try {
      cliente.nombre = body.nombre;
      await validateOrReject(cliente);

      await this.clienteSerivce
        .createCliente(cliente)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };

  getCliente = async (req: Request, res: Response) => {
   
    try {
     
      await this.clienteSerivce
        .getCliente()
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };
}
