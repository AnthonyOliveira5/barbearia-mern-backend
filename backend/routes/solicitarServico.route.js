import express from 'express'
import { createSolicitacao, deleteSolicitacao, getSolicitacaoById, getSolicitacoes, updateSolicitacao } from '../controller/solicitarServico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), getSolicitacoes);
router.get('/:id', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), getSolicitacaoById);
router.post('/', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), createSolicitacao);
router.put("/:id", verifyTokenAndRole(["cliente", "barbeiro", "admin"]), updateSolicitacao);
router.delete('/:id', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), deleteSolicitacao);

export default router;