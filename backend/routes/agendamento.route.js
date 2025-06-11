import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentos, updateAgendamento } from '../controller/agendamento.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["client", "barber", "admin"]), getAgendamentos);
router.post('/', verifyTokenAndRole(["client", "barber", "admin"]), createAgendamento);
router.put("/:id",verifyTokenAndRole(["client", "barber", "admin"]), updateAgendamento)
router.delete('/:id',verifyTokenAndRole(["client", "barber", "admin"]), deleteAgendamento);

export default router;