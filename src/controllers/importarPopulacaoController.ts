import { Request, Response } from 'express';
import { importarPopulacaoService } from '../services/importarPopulacaoService';
import dotenv from 'dotenv';

dotenv.config(); 

export const importarPopulacaoController = async (req: Request, res: Response): Promise<void> => {
  try {

    const senha = req.headers['password'] as string;
    const senhaCorreta = process.env.SENHA_IMPORTACAO; 

    if (senha !== senhaCorreta) {
      res.status(401).json({ error: 'Acesso negado.' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const result = await importarPopulacaoService(req.file.buffer);

    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
