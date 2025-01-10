import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de População',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de dados populacionais por municípios.',
    },
    servers: [
      {
        url: 'http://3.91.226.109', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerOptions;
