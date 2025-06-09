import express from 'express'
import { createServico, deleteServico, getServicos, updateServico } from '../controller/servico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', getServicos);
router.post('/', verifyTokenAndRole(["admin"]), createServico);
router.put("/:id", verifyTokenAndRole(["admin"]), updateServico)
router.delete('/:id', verifyTokenAndRole(["client", "admin"]), deleteServico);

export default router;