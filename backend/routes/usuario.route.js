import express from 'express'
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from '../controller/usuario.controller.js'

const router = express.Router()

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put("/:id", updateUsuario)
router.delete('/:id', deleteUsuario);

export default router;