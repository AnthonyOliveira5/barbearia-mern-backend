import express from 'express'
import { createSolicitacao, deleteSolicitacao, getSolicitacaoById, getSolicitacoes, updateSolicitacao } from '../controller/solicitarServico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "admin"]), getSolicitacoes);
router.get('/:id', verifyTokenAndRole(["client", "admin"]), getSolicitacaoById);
router.post('/', verifyTokenAndRole(["client", "admin"]), createSolicitacao);
router.put("/:id", verifyTokenAndRole(["client", "admin"]), updateSolicitacao);
router.delete('/:id', verifyTokenAndRole(["client", "admin"]), deleteSolicitacao);

export default router;