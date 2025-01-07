import { Request, Response } from 'express';
import { getPopulacao } from '../services/populacaoService';

export const getAllPopulacao = async (req: Request, res: Response) => {
    try {
      const populacao = await getPopulacao();
      res.status(200).json(populacao);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  };
  