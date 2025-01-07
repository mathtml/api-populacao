import { PrismaClient } from '@prisma/client';

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
      throw new Error('Erro desconhecido ao buscar dados da população');
    }
  };

