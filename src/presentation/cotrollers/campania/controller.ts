import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { handlerError } from "@/shared";
import { CampaniaService } from "@/presentation/services/campania.service";
import { CreateCampaniaDto } from "@/domain/dto/campania/create-campania.dto";

export class CampaniaController {
  constructor(private readonly campaniaService: CampaniaService) {}

  createCampania = async (req: Request, res: Response) => {
    const { body } = req;
    const campania = new CreateCampaniaDto();
    try {
      campania.nombre = body.nombre;
      campania.usuario = body.usuario;
      await validateOrReject(campania);
      await this.campaniaService
        .createCampania(campania)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => handlerError(err, res));
    } catch (e: any) {
      const message = Object.values(e[0].constraints);
      res.status(400).send({ message });
    }
  };
}
