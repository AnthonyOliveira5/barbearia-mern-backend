import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import servicoRoutes from './routes/servico.route.js'
import agendamentoRoutes from './routes/agendamento.route.js'
import clienteRoutes from './routes/cliente.route.js'
import usuarioRoutes from './routes/usuario.route.js'
import solicitarservicoRoutes from './routes/solicitarServico.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/servicos', servicoRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/solicitarServicos', solicitarservicoRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
})