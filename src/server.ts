import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import multer from 'multer'; // Para upload de arquivos
import swaggerJsDoc from 'swagger-jsdoc'; // Para documentação Swagger
import swaggerUi from 'swagger-ui-express'; // Para servir a documentação Swagger
import populacaoRoutes from './routes/populacaoRoutes';
import { importarPopulacaoController } from './controllers/importarPopulacaoController';
import swaggerConfig from './config/swaggerConfig';

dotenv.config();

if (!process.env.PORT) {
  throw new Error("A variável de ambiente 'PORT' é obrigatória.");
}

const app = express();
const port = process.env.PORT;

// Middleware para JSON
app.use(express.json());

// Configuração do Swagger
const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuração do multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
});

// Rotas para upload de arquivo
app.post('/municipios/importar', upload.single('file'), importarPopulacaoController);

// Rotas para as operações de população
app.use('/municipios', populacaoRoutes);

// Rota base para verificar o status da API
app.get('/', (req: Request, res: Response) => {
  res.send('API de População está rodando. Acesse /api-docs para a documentação.');
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
