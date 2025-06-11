import express from 'express'
import { createSolicitacao, deleteSolicitacao, getSolicitacaoById, getSolicitacoes, updateSolicitacao } from '../controller/solicitarServico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "barber", "admin"]), getSolicitacoes);
router.get('/:id', verifyTokenAndRole(["client", "barber", "admin"]), getSolicitacaoById);
router.post('/', verifyTokenAndRole(["client", "barber", "admin"]), createSolicitacao);
router.put("/:id", verifyTokenAndRole(["client", "barber", "admin"]), updateSolicitacao);
router.delete('/:id', verifyTokenAndRole(["client", "barber", "admin"]), deleteSolicitacao);

export default router;