import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const importarPopulacaoService = async (fileBuffer: Buffer) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets["MUNICÍPIOS"];
    if (!sheet) {
      throw new Error("A aba 'MUNICÍPIOS' não foi encontrada no arquivo Excel.");
    }
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 });
    console.log("Dados extraídos da planilha:", rows);
    for (const row of rows) {
      const rowData = row as any[];
      const uf = rowData[0];  
      const codUf = rowData[1];  
      const codMunic = rowData[2]; 
      const nomeMunicipio = rowData[3];  
      const populacao = rowData[4];  
      if (!uf || !codUf || !codMunic || !nomeMunicipio || !populacao) {
        console.log(`Dados faltando na linha: ${uf}, ${codUf}, ${codMunic}, ${nomeMunicipio}`);
        continue; 
      }
      const populacaoInt = parseInt(populacao.toString().replace(",", ""), 10);
      await prisma.populacaoMunic.create({
        data: {
          uf,
          codUf: parseInt(codUf.toString(), 10),
          codMunic: parseInt(codMunic.toString(), 10),
          nomeMunicipio,
          populacao: populacaoInt,
        },
      });
      console.log(`Município ${nomeMunicipio} inserido`);
    }
    return { message: "Dados importados com sucesso!" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao importar dados: ${error.message}`);
    } else {
      throw new Error("Erro desconhecido ao importar dados");
    }
  }
};
