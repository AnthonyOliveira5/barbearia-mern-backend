import mongoose from "mongoose";
import Agendamento from "../models/agendamento.model.js";
import Servico from "../models/servico.model.js";
import SolicitarServico from "../models/solicitarServico.model.js";
import { buscarAgendamentosPorClienteEPeriodo } from "../services/agendamento.service.js";

export const getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.find({})
            .populate('cliente', 'name email')
            .populate('usuario', 'name email');
        res.status(200).json({ success: true, data: agendamentos });
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const getAgendamentoById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const agendamento = await Agendamento.findById(id)
            .populate('cliente', 'name email')
            .populate('usuario', 'name email');

        if (!agendamento) {
            return res.status(404).json({ success: false, message: "Agendamento não encontrado" });
        }

        res.status(200).json({ success: true, data: agendamento });
    } catch (error) {
        console.error("Erro ao buscar agendamento:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const createAgendamento = async (req, res) => {
    const { cliente, usuario, dataAgendamento, servicos } = req.body;

    if (!cliente || !usuario || !dataAgendamento || !Array.isArray(servicos) || servicos.length === 0) {
        return res.status(400).json({ success: false, message: "Campos obrigatórios: cliente, usuário, dataAgendamento, e pelo menos um serviço" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const novoAgendamento = new Agendamento({
            cliente,
            usuario,
            dataAgendamento,
            total: 0
        });

        await novoAgendamento.save({ session });

        let totalGeral = 0;
        const solicitacoes = [];

        for (const item of servicos) {
            const { servico, quantidade } = item;

            const servicoData = await Servico.findById(servico);
            if (!servicoData) {
                throw new Error(`Serviço com ID ${servico} não encontrado`);
            }

            const preco = servicoData.price;
            const total = preco * quantidade;
            totalGeral += total;

            const novaSolicitacao = new SolicitarServico({
                servico,
                quantidade,
                preco,
                total,
                agendamento: novoAgendamento._id
            });

            await novaSolicitacao.save({ session });
            solicitacoes.push(novaSolicitacao);
        }

        novoAgendamento.total = totalGeral;
        await novoAgendamento.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            data: {
                agendamento: novoAgendamento,
                solicitacoes
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Erro ao criar agendamento com serviços:", error.message);
        res.status(500).json({ success: false, message: "Erro ao criar agendamento com serviços" });
    }
};

export const updateAgendamento = async (req, res) => {
    const { id } = req.params;
    const { dataAgendamento, cliente, usuario } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const agendamento = await Agendamento.findById(id);
        if (!agendamento) {
            return res.status(404).json({ success: false, message: "Agendamento não encontrado" });
        }

        agendamento.dataAgendamento = dataAgendamento || agendamento.dataAgendamento;
        agendamento.cliente = cliente || agendamento.cliente;
        agendamento.usuario = usuario || agendamento.usuario;

        await agendamento.save();

        res.status(200).json({ success: true, data: agendamento });
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const deleteAgendamento = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const deleted = await Agendamento.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Agendamento não encontrado" });
        }

        res.status(200).json({ success: true, message: "Agendamento deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar agendamento:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const getAgendamentosFiltrados = async (req, res) => {
  const { clienteId, dataInicio, dataFim } = req.query;

  if (!clienteId || !dataInicio || !dataFim) {
    return res.status(400).json({ success: false, message: "Parâmetros obrigatórios: clienteId, dataInicio, dataFim" });
  }

  try {
    const agendamentos = await buscarAgendamentosPorClienteEPeriodo(clienteId, dataInicio, dataFim);
    res.status(200).json({ success: true, data: agendamentos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao buscar agendamentos filtrados" });
  }
};