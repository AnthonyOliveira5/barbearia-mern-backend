import express from 'express'
import { createUsuario, deleteUsuario, getUsuarios, getUsuariosById, updateUsuario, getUsuarioByFirebaseUid, getBarbeiros } from '../controller/usuario.controller.js'
import {verifyTokenAndRole} from "../middleware/verifyTokenAndRole.js";

const router = express.Router()

router.get('/',/* verifyTokenAndRole(["admin"]),  */getUsuarios);
router.get('/barbeiros/', /* verifyTokenAndRole(["cliente", "admin"]), */ getBarbeiros);
router.get('/:id', /* verifyTokenAndRole(["cliente", "admin"]), */ getUsuariosById);
router.get('/firebase/:firebase_uid', /* verifyTokenAndRole(["cliente", "admin"]), */ getUsuarioByFirebaseUid);
router.post('/', createUsuario);
router.put("/:id", verifyTokenAndRole(["admin"]), updateUsuario)
router.delete('/:id', verifyTokenAndRole(["admin"]), deleteUsuario);

export default router;