import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { handlerError } from "@/shared";
import { CreateUsuarioDto } from "@/domain/dto/usuario/create-usuario.dto";
import { UsuarioService } from "../../services/usuario.service";

export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  createUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    const usuario = new CreateUsuarioDto();

    try {

      usuario.usuario = body.usuario;
      usuario.cliente = body.cliente;

      await validateOrReject(usuario);

      await this.usuarioService.createUsuario(usuario)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };
}
