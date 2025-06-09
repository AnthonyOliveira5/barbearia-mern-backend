import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentos, updateAgendamento } from '../controller/agendamento.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "admin"]), getAgendamentos);
router.post('/', verifyTokenAndRole(["client", "admin"]), createAgendamento);
router.put("/:id",verifyTokenAndRole(["client", "admin"]), updateAgendamento)
router.delete('/:id',verifyTokenAndRole(["client", "admin"]), deleteAgendamento);

export default router;