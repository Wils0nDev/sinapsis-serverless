import { Cliente, Usuario } from "../../data/mysql/entities";
import { AppDataSource } from "@/data/mysql/mysql-database";
import { DataSource } from "typeorm";
import { CustomError } from "@/domain";
import { CreateUsuarioDto } from "@/domain/dto/usuario/create-usuario.dto";

export class UsuarioService {
  dataSource: Promise<DataSource>;
  constructor() {
    this.dataSource = AppDataSource.initialize();
  }

  createUsuario = async (createUsuarioDto: CreateUsuarioDto) => {
    try {
      const { usuario, cliente } = createUsuarioDto
      const user = new Usuario();
      user.usuario = usuario;
      const clientRepository = (await this.dataSource).getRepository(Cliente);
      const client = await clientRepository.findOneBy({id: cliente })
      if(!client) throw CustomError.notFound(`No existe el cliente con id "${cliente}"`);
      user.cliente = client
       const usuarioRepository = (await this.dataSource).getRepository(Usuario);
      const resp =  await usuarioRepository.save(user)
      return { usuario : resp };
      
    } catch (error : any ) {
      if(error.code = 'ER_DUP_ENTRY') {
        throw CustomError.badRequest(`${error}`);
      }else{
        throw CustomError.internalServer(`${error}`);
      }
    }
  };

  

 
}


