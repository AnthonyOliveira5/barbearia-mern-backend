import mongoose from "mongoose";
import SolicitarServico from "../models/solicitarServico.model.js";
import Servico from "../models/servico.model.js";
import Agendamento from "../models/agendamento.model.js";

export const getSolicitacoes = async (req, res) => {
    try {
        const solicitacoes = await SolicitarServico.find({})
            .populate("servico")
            .populate("agendamento");
        res.status(200).json({ success: true, data: solicitacoes });
    } catch (error) {
        console.error("Erro ao buscar solicitações:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const getSolicitacaoById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const solicitacao = await SolicitarServico.findById(id)
            .populate("servico")
            .populate("agendamento");

        if (!solicitacao) {
            return res.status(404).json({ success: false, message: "Solicitação não encontrada" });
        }

        res.status(200).json({ success: true, data: solicitacao });
    } catch (error) {
        console.error("Erro ao buscar solicitação:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const createSolicitacao = async (req, res) => {
    const { servico, quantidade, preco, total, agendamento } = req.body;

    if (!servico || !quantidade || !preco || !total || !agendamento) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios"
        });
    }

    try {
        const novaSolicitacao = new SolicitarServico({
            servico,
            quantidade,
            preco,
            total,
            agendamento
        });

        await novaSolicitacao.save();

        res.status(201).json({ success: true, data: novaSolicitacao });
    } catch (error) {
        console.error("Erro ao criar solicitação:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

const recalcularTotalAgendamento = async (agendamentoId) => {
    const solicitacoes = await SolicitarServico.find({ agendamento: agendamentoId });
    const novoTotal = solicitacoes.reduce((acc, item) => acc + item.total, 0);
    await Agendamento.findByIdAndUpdate(agendamentoId, { total: novoTotal });
};

export const updateSolicitacao = async (req, res) => {
    const { id } = req.params;
    const { servico, quantidade, agendamento } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const servicoData = await Servico.findById(servico);
        if (!servicoData) {
            return res.status(404).json({ success: false, message: "Serviço não encontrado" });
        }

        const preco = servicoData.price;
        const total = preco * quantidade;

        const updated = await SolicitarServico.findByIdAndUpdate(
            id,
            { servico, quantidade, preco, total },
            { new: true }
        );

        await recalcularTotalAgendamento(agendamento);

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        console.error("Erro ao atualizar solicitarServico:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const deleteSolicitacao = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const deleted = await SolicitarServico.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Solicitação não encontrada" });
        }

        res.status(200).json({ success: true, message: "Solicitação deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar solicitação:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};
