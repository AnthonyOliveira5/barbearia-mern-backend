import Servico from "../models/servico.model.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/servicos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage });

export const createServicoComImagem = async (req, res) => {
    try {
        const { name, price, duracao, isActive } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Imagem obrigatória" });
        }

        if (!name || !price || !duracao || typeof isActive === "undefined") {
            return res.status(400).json({ success: false, message: "Campos obrigatórios faltando" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/servicos/${req.file.filename}`;

        const novoServico = new Servico({
            name,
            price,
            duracao,
            isActive,
            image: imageUrl,
        });

        await novoServico.save();

        res.status(201).json({ success: true, data: novoServico });
    } catch (error) {
        console.error("Erro ao criar serviço com imagem:", error.message);
        res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }
};

export const getServicos = async (req, res) => {
    try {
        const servicos = await Servico.find({});
        res.status(200).json({ sucess: true, data: servicos })
    } catch (error) {
        console.log("Erro ao buscar os servicos: ", error.message)
        res.status(500).json({ sucess: false, message: "Erro no servidor" });
    }
}

export const createServico = async (req, res) => {
    const servico = req.body;

    if (!servico.name || !servico.price || !servico.duracao || !servico.isActive) {
        return res.status(400).json({ sucess: false, message: "Por favor, preencha todos os campos" })
    }

    const newServico = new Servico(servico)

    try {
        await newServico.save();
        res.status(201).json({ sucess: true, data: newServico })
    } catch (error) {
        console.error("Erro ao criar o serviço", error.message);
        res.status(500).json({ sucess: false, message: "Server error" });
    }
};

export const updateServico = async (req, res) => {
    const { id } = req.params;

    const servico = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ sucess: false, message: "Inválido id de serviço" })
    }

    try {
        const updatedServico = await Servico.findByIdAndUpdate(id, servico, { new: true })
        res.status(200).json({ sucess: true, data: updatedServico });

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Erro no servidor" });
    }
}

export const deleteServico = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ sucess: false, message: "Inválido id de serviço" })
    }

    try {
        await Servico.findByIdAndDelete(id);
        res.status(200).json({ "sucess": true, message: "Serviço deletado" })
    } catch (error) {
        console.log("Erro ao deletar o servico: ", error.message)
        res.status(500).json({ sucess: false, message: "Serviço não encontrado" });
    }

}