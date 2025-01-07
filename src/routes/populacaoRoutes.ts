import { Router } from 'express';
import { getAllPopulacao } from '../controllers/populacaoController';

const router = Router();

router.get('/', getAllPopulacao); 

export default router;
