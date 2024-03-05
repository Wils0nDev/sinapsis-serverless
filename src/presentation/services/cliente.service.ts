import { Cliente } from "../../data/mysql/entities";
import { CreateClienteDto } from "@/domain/dto/cliente/create-cliente.dto";
import { AppDataSource } from "@/data/mysql/mysql-database";
import { DataSource } from "typeorm";
import { CustomError } from "@/domain";

export class ClienteService {
  dataSource: Promise<DataSource>;
  constructor() {
    this.dataSource = AppDataSource.initialize();
  }

  createCliente = async (createClienteDto: CreateClienteDto) => {
    try {
      const cliente = new Cliente();
      cliente.nombre = createClienteDto.nombre;
      const clienteRepository = (await this.dataSource).getRepository(Cliente);
      const resp =  await clienteRepository.save(cliente)
      return { cliente : resp };
    } catch (error : any ) {
      if(error.code = 'ER_DUP_ENTRY') {
        throw CustomError.badRequest(`${error}`);
      }else{
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  getCliente = async () => {
    try {
     
      const clienteRepository = (await this.dataSource).getRepository(Cliente);
      return await clienteRepository.find()
    } catch (error : any ) {
      if(error.code = 'ER_DUP_ENTRY') {
        throw CustomError.badRequest(`${error}`);
      }else{
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  

 
}


