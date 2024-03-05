# SERVERLESS SINAPSIS

## Configuracion

1. Configurar las credenciales de AWS key y secret_key en tu maquina local
2. Configurar un dominio en la nube para alojar bd recomendado -->  [railway](https://railway.app/)

## Instalación
1. Clonar .env.template a .env.production y configurar las variables de entorno del dominio donde alojara su BD.

2. Ejecutar npm install para instalar las dependencias

3. Ejecutar  ```docker-compose up -d ``` para levantar los servicios deseados.

4. Ejecutar ```npm run dev:server```  para levantar el proyecto en modo desarrollo.

5. Ejecutar ```npm run deploy:db```  para enviar bd al dominio en la nube.

5. Ejecutar ```npm run deploy:app```  para deployar la apliacación en los servicios de AWS Lambda.