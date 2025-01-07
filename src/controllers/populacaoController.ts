import { Request, Response } from "express";
import {
  getPopulacao,
  getPopulacaoComPaginacao,
} from "../services/populacaoService";

export const getAllPopulacao = async (req: Request, res: Response) => {
  try {
    const populacao = await getPopulacao();
    res.status(200).json(populacao);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
};

export const getAllPopulacaoComPaginacao = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const populacao = await getPopulacaoComPaginacao(page, limit);
    res.status(200).json({
      pagina: populacao.page,
      limit: populacao.limit,
      total: populacao.total,
      totalPages: populacao.totalPages,
      dados: populacao.dados,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro ao fazer consulta." });
    }
  }
};
