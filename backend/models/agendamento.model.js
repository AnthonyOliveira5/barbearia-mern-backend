import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  dataAgendamento: {
    type: Date,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  }

})

const Agendamento = new mongoose.model('Agendamento', agendamentoSchema);

export default Agendamento;