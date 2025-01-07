import { Router } from 'express';
import { getAllPopulacao, getAllPopulacaoComPaginacao } from '../controllers/populacaoController';

const router = Router();

/**
 * @swagger
 * /municipios:
 *   get:
 *     summary: Retorna a lista completa de populações de todos municípios brasileiro. (Pode ser que demore o GET pois tem 5570 municípios)
 *     tags:
 *       - População
 *     responses:
 *       200:
 *         description: Lista completa de populações.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uf:
 *                     type: string
 *                   codUf:
 *                     type: integer
 *                   codMunic:
 *                     type: integer
 *                   nomeMunicipio:
 *                     type: string
 *                   populacao:
 *                     type: integer
 */
router.get('/', getAllPopulacao);

/**
 * @swagger
 * /municipios/paginacao:
 *   get:
 *     summary: Retorna a lista de populações com paginação.
 *     tags:
 *       - População
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número da página (inicia em 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de registros por página. Padrão é 10.
 *     responses:
 *       200:
 *         description: Lista de populações paginada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagina:
 *                   type: integer
 *                   description: Página atual.
 *                 itensPorPagina:
 *                   type: integer
 *                   description: Número de registros por página.
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uf:
 *                         type: string
 *                       codUf:
 *                         type: integer
 *                       codMunic:
 *                         type: integer
 *                       nomeMunicipio:
 *                         type: string
 *                       populacao:
 *                         type: integer
 */
router.get('/paginacao', getAllPopulacaoComPaginacao);

export default router;
