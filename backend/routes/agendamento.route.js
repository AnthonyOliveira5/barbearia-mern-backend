import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentos, updateAgendamento, getAgendamentosFiltrados, getAgendamentoById } from '../controller/agendamento.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), getAgendamentos);
router.get('/:id',verifyTokenAndRole(["cliente", "barbeiro", "admin"]), getAgendamentoById);
router.get('/filtrados', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), getAgendamentosFiltrados);
router.post('/', verifyTokenAndRole(["cliente", "barbeiro", "admin"]), createAgendamento);
router.put("/:id",verifyTokenAndRole(["cliente", "barbeiro", "admin"]), updateAgendamento)
router.delete('/:id',verifyTokenAndRole(["cliente", "barbeiro", "admin"]), deleteAgendamento);

export default router;