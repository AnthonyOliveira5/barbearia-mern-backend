import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentos, updateAgendamento } from '../controller/agendamento.controller.js';

const router = express.Router()

router.get('/', getAgendamentos);
router.post('/', createAgendamento);
router.put("/:id", updateAgendamento)
router.delete('/:id', deleteAgendamento);

export default router;