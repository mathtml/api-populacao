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
        url: 'http://3.91.226.109', // Altere para a URL base da sua API
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para as rotas onde estão os endpoints
};

export default swaggerOptions;
