import express from 'express'
import { createCliente, deleteCliente, getCliente, updateCliente } from '../controller/cliente.controller.js';
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js';

const router = express.Router()

router.get('/', verifyTokenAndRole(["admin"]), getCliente);
router.post('/', createCliente);
router.put("/:id", verifyTokenAndRole(["client", "admin"]), updateCliente);
router.delete('/:id', verifyTokenAndRole(["admin"]), deleteCliente);

export default router;