import { Campania, Usuario } from "../../data/mysql/entities";
import { AppDataSource } from "@/data/mysql/mysql-database";
import { DataSource } from "typeorm";
import { CustomError } from "@/domain";
import { CreateCampaniaDto } from "@/domain/dto/campania/create-campania.dto";

export class CampaniaService {
  dataSource: Promise<DataSource>;
  constructor() {
    this.dataSource = AppDataSource.initialize();
  }

  createCampania = async (createCampaniaDto: CreateCampaniaDto) => {
    try {
      const { nombre, usuario} = createCampaniaDto;

      const campania = new Campania();

      campania.nombre = nombre;
      const userRepository = (await this.dataSource).getRepository(Usuario);
      const user = await userRepository.findOneBy({id: usuario })
      if(!user) throw CustomError.notFound(`No existe el cliente con id "${user}"`);
      campania.usuario = user
      const campaniaRepository = (await this.dataSource).getRepository(Campania);
      const resp =  await campaniaRepository.save(campania)
      return { campania : resp };
    } catch (error : any ) {
      if(error.code = 'ER_DUP_ENTRY') {
        throw CustomError.badRequest(`${error}`);
      }else{
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  

 
}


