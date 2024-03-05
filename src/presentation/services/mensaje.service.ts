import { Campania, Mensaje } from "../../data/mysql/entities";
import { AppDataSource } from "@/data/mysql/mysql-database";
import { Brackets, DataSource, IsNull } from "typeorm";
import { CustomError } from "@/domain";
import { CreateMensajeDto } from "@/domain/dto/mensaje/create-mensaje.dto";
import { UpdateMensajeDto } from "@/domain/dto/mensaje/update-mensaje.dto";
import { SendMensajeDto } from "@/domain/dto/mensaje/send-mensaje.dto";
import { FilterMensajeDto } from "@/domain/dto/mensaje/filter-mensaje.dto";

export class MensajeService {
  dataSource: Promise<DataSource>;
  message: Mensaje;
  constructor() {
    this.dataSource = AppDataSource.initialize();
    this.message = new Mensaje();
  }

  createMensaje = async (createMensajeDto: CreateMensajeDto) => {
    try {
      const { mensaje, campania } = createMensajeDto;

      this.message.mensaje = mensaje;

      const campaniaRepository = (await this.dataSource).getRepository(
        Campania
      );
      const campaign = await campaniaRepository.findOneBy({ id: campania });

      if (!campaign)
        throw CustomError.notFound(`No existe el cliente con id "${campaign}"`);

      this.message.campania = campaign;
      const messageRepository = (await this.dataSource).getRepository(Mensaje);
      const resp = await messageRepository.save(this.message);
      return { mensaje: resp };
    } catch (error: any) {
      if ((error.code = "ER_DUP_ENTRY")) {
        throw CustomError.badRequest(`${error}`);
      } else {
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  updateMensaje = async (updateMensajeDto: UpdateMensajeDto) => {
    try {
      const { id, mensaje, estado = 0 } = updateMensajeDto;

      const mensajeRepository = (await this.dataSource).getRepository(Mensaje);

      const respMensaje = await mensajeRepository.findOneBy({ id: id });

      if (!respMensaje)
        throw CustomError.notFound(`No existe el mens con id "${id}"`);

      this.message.mensaje = mensaje;
      this.message.estado = estado;

      //  const messageRepository = (await this.dataSource).getRepository(Mensaje);
      (await this.dataSource)
        .createQueryBuilder()
        .update(Mensaje)
        .set(this.message)
        .where("id = :id", { id: id })
        .execute();

      return { mensaje: "Mensaje actualizado" };
    } catch (error: any) {
      if ((error.code = "ER_DUP_ENTRY")) {
        throw CustomError.badRequest(`${error}`);
      } else {
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  sendMensaje = async (sendMensajeDto: SendMensajeDto) => {
    const { id } = sendMensajeDto;
    try {
      const mensajeRepository = (await this.dataSource).getRepository(Mensaje);

      const respMensaje = await mensajeRepository.findOneBy({ id: id });

      if (!respMensaje)
        throw CustomError.notFound(`No existe el mensaje con id "${id}"`);
      if (respMensaje.estado === 0)
        throw CustomError.notFound(`El mensaje esta inactivo`);

      this.message.fechaHoraEnvio = new Date();
      this.message.estadoEnvio = 2;

      //  const messageRepository = (await this.dataSource).getRepository(Mensaje);
      (await this.dataSource)
        .createQueryBuilder()
        .update(Mensaje)
        .set(this.message)
        .where("id = :id", { id: id })
        .execute();

      return { mensaje: "Mensaje enviado" };
    } catch (error: any) {

      // this.message.estadoEnvio = 3;
      // (await this.dataSource)
      //   .createQueryBuilder()
      //   .update(Mensaje)
      //   .set(this.message)
      //   .where("id = :id", { id: id })
      //   .execute();

      if ((error.code = "ER_DUP_ENTRY")) {
        throw CustomError.badRequest(`${error}`);
      } else {
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  filterMensaje = async (filterMensajeDto: FilterMensajeDto) => {
    try {
      const { estado ,estadoEnvio,fechaHoraEnvio, cliente = null} = filterMensajeDto;
      const mesFilter = new Date(fechaHoraEnvio);
      const mes = mesFilter.getMonth() + 1;
      const messageRepository = (await this.dataSource).getRepository(Mensaje)
      
      const queryMensaje = await messageRepository.createQueryBuilder("mensaje")  
      .select('mensaje.id,campania.nombre')  
      .innerJoinAndSelect('mensaje.campania','campania')
      .innerJoinAndSelect('campania.usuario','usuario')
      .innerJoinAndSelect('usuario.cliente','cliente')
      .select(['campania.id','campania.nombre',
      'mensaje.id','mensaje.mensaje','mensaje.estado','mensaje.estadoEnvio','mensaje.fechaHoraEnvio',
      'usuario.id', 'usuario.usuario',
      'cliente.id', 'cliente.nombre'])
      .where("mensaje.estado = :estado", { estado: estado })
      .andWhere("MONTH(mensaje.fechaHoraEnvio) = :fechaHoraEnvio", { fechaHoraEnvio: mes })
      .andWhere("mensaje.estadoEnvio = :estadoEnvio", { estadoEnvio: estadoEnvio })
      .andWhere(new Brackets((qb) => {
        qb.where("cliente.id = :id", {id: cliente}).orWhere("cliente.id IS NOT :id", {id: null})
    }))
    
    .getMany()
 

      return { mensaje:queryMensaje };
    } catch (error: any) {

      if ((error.code = "ER_DUP_ENTRY")) {
        throw CustomError.badRequest(`${error}`);
      } else {
        throw CustomError.internalServer(`${error}`);
      }
    }
  };
}
