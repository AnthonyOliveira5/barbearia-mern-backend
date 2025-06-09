import express from 'express'
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from '../controller/usuario.controller.js'
import {verifyTokenAndRole} from "../middleware/verifyTokenAndRole.js";

const router = express.Router()

router.get('/',verifyTokenAndRole(["admin"]), getUsuarios);
router.post('/', verifyTokenAndRole(["admin"]), createUsuario);
router.put("/:id", verifyTokenAndRole(["admin"]), updateUsuario)
router.delete('/:id', verifyTokenAndRole(["admin"]), deleteUsuario);

export default router;