import express from 'express'
import { createServico, deleteServico, getServicos, updateServico } from '../controller/servico.controller.js';

const router = express.Router()

router.get('/', getServicos);
router.post('/', createServico);
router.put("/:id", updateServico)
router.delete('/:id', deleteServico);

export default router;