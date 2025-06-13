import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentos, updateAgendamento, getAgendamentosFiltrados, getAgendamentoById } from '../controller/agendamento.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "barbeiro", "admin"]), getAgendamentos);
router.get('/:id',verifyTokenAndRole(["client", "barbeiro", "admin"]), getAgendamentoById);
router.get('/filtrados', verifyTokenAndRole(["client", "barbeiro", "admin"]), getAgendamentosFiltrados);
router.post('/', verifyTokenAndRole(["client", "barbeiro", "admin"]), createAgendamento);
router.put("/:id",verifyTokenAndRole(["client", "barbeiro", "admin"]), updateAgendamento)
router.delete('/:id',verifyTokenAndRole(["client", "barbeiro", "admin"]), deleteAgendamento);

export default router;