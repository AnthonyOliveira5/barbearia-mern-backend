import express from 'express'
import { createSolicitacao, deleteSolicitacao, getSolicitacaoById, getSolicitacoes, updateSolicitacao } from '../controller/solicitarServico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "barbeiro", "admin"]), getSolicitacoes);
router.get('/:id', verifyTokenAndRole(["client", "barbeiro", "admin"]), getSolicitacaoById);
router.post('/', verifyTokenAndRole(["client", "barbeiro", "admin"]), createSolicitacao);
router.put("/:id", verifyTokenAndRole(["client", "barbeiro", "admin"]), updateSolicitacao);
router.delete('/:id', verifyTokenAndRole(["client", "barbeiro", "admin"]), deleteSolicitacao);

export default router;