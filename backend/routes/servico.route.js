import express from 'express'
import { createServico, deleteServico, getServicos, updateServico, createServicoComImagem } from '../controller/servico.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';
import upload from "../middleware/upload.js";

const router = express.Router()

router.get('/', getServicos);
router.post("/servicos/upload", upload.single("image"), createServicoComImagem);
router.post('/', verifyTokenAndRole(["admin"]), createServico);
router.put("/:id", verifyTokenAndRole(["admin"]), updateServico)
router.delete('/:id', verifyTokenAndRole(["admin"]), deleteServico);

export default router;