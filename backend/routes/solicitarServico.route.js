import express from 'express'
import { createSolicitacao, deleteSolicitacao, getSolicitacaoById, getSolicitacoes, updateSolicitacao } from '../controller/solicitarServico.controller.js';

const router = express.Router()

router.get('/', getSolicitacoes);
router.get('/:id', getSolicitacaoById);
router.post('/', createSolicitacao);
router.put("/:id", updateSolicitacao);
router.delete('/:id', deleteSolicitacao);

export default router;