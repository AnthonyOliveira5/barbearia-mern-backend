import mongoose from "mongoose";


const solicitarServicoSchema = new mongoose.Schema({
  agendamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agendamento',
    required: true
  },
  servico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servico',
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const SolicitarServico = mongoose.model('SolicitarServico', solicitarServicoSchema);

export default SolicitarServico;