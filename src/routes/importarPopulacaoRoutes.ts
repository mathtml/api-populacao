import { Router } from 'express';
import { importarPopulacaoController } from '../controllers/importarPopulacaoController';

const router = Router();

router.post('/importar', importarPopulacaoController);

export default router;
