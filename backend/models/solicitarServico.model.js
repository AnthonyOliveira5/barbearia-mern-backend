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

solicitarServicoSchema.post("save", async function () {
  const SolicitarServico = mongoose.model("SolicitarServico");
  const Agendamento = mongoose.model("Agendamento");

  const solicitacoes = await SolicitarServico.find({ agendamento: this.agendamento });
  const novoTotal = solicitacoes.reduce((acc, item) => acc + item.total, 0);

  await Agendamento.findByIdAndUpdate(this.agendamento, { total: novoTotal });
});

solicitarServicoSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  
  const SolicitarServico = mongoose.model("SolicitarServico");
  const Agendamento = mongoose.model("Agendamento");

  const solicitacoes = await SolicitarServico.find({ agendamento: doc.agendamento });
  const novoTotal = solicitacoes.reduce((acc, item) => acc + item.total, 0);

  await Agendamento.findByIdAndUpdate(doc.agendamento, { total: novoTotal });
});

const SolicitarServico = mongoose.model('SolicitarServico', solicitarServicoSchema);

export default SolicitarServico;