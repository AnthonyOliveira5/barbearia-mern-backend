import express from 'express'
import { createCliente, deleteCliente, getCliente, updateCliente } from '../controller/cliente.controller.js';

const router = express.Router()

router.get('/', getCliente);
router.post('/', createCliente);
router.put("/:id", updateCliente);
router.delete('/:id', deleteCliente);

export default router;