import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import populacaoRoutes from './routes/populacaoRoutes';
import multer from 'multer'; // Importando o multer para o upload de arquivos
import { importarPopulacaoController } from './controllers/importarPopulacaoController';

dotenv.config();

const app = express();

// Configuração do multer para o upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(), // Armazena os arquivos na memória
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB para o arquivo
});

app.use(express.json());

// Rota para upload de arquivo - Adiciona o middleware do multer antes do controlador
app.post('/populacao/importar', upload.single('file'), importarPopulacaoController);

// Rota para as outras operações sobre a população
app.use('/populacao', populacaoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
