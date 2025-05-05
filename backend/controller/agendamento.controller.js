import mongoose from "mongoose";
import Agendamento from "../models/agendamento.model.js";

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
    const { cliente, usuario, dataAgendamento, total } = req.body;

    if (!cliente || !usuario || !dataAgendamento || !total) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    try {
        const novoAgendamento = new Agendamento({
            cliente,
            usuario,
            dataAgendamento,
            total
        });

        await novoAgendamento.save();
        res.status(201).json({ success: true, data: novoAgendamento });
    } catch (error) {
        console.error("Erro ao criar agendamento:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
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
