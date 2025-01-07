import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPopulacao = async () => {
  try {
    return await prisma.populacaoMunic.findMany({
      select: {
        uf: true,
        codUf: true,
        codMunic: true,
        nomeMunicipio: true,
        populacao: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar dados da população: ${error.message}`);
    }
    throw new Error("Erro desconhecido ao buscar dados da população");
  }
};

export const getPopulacaoComPaginacao = async (page: number, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;  // Ignora os registros das páginas anteriores
    const populacao = await prisma.populacaoMunic.findMany({
      skip,  // Usa o cálculo de skip
      take: limit,  // Retorna apenas os registros dessa página
      select: {
        uf: true,
        codUf: true,
        codMunic: true,
        nomeMunicipio: true,
        populacao: true,
      },
    });

    // Conta o total de registros para calcular o número total de páginas
    const total = await prisma.populacaoMunic.count();

    // Retorna a página atual, o limite, total de itens e as páginas totais
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),  // Calcula o número total de páginas
      dados: populacao,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar dados da população: ${error.message}`);
    }
    throw new Error("Erro desconhecido ao buscar dados da população");
  }
};

