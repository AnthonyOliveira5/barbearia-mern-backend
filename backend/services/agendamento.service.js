import Agendamento from "../models/agendamento.model.js";

export async function buscarAgendamentosPorClienteEPeriodo(clienteId, dataInicio, dataFim) {
  try {
    const filtro = {
      cliente: clienteId,
      dataAgendamento: {
        $gte: new Date(dataInicio),
        $lte: new Date(dataFim)
      }
    };

    return await Agendamento.find(filtro)
      .populate("cliente", "name email")
      .populate("usuario", "name email");
  } catch (error) {
    console.error("Erro no filtro de agendamento:", error);
    throw new Error("Erro ao buscar agendamentos por período");
  }
}
