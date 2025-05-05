import Servico from "../models/servico.model.js";
import mongoose from "mongoose";

export const getServicos = async (req, res) => {
    try {
        const servicos = await Servico.find({});
        res.status(200).json({sucess: true, data: servicos})
    } catch(error){
        console.log("Erro ao buscar os servicos: ", error.message)
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const createServico = async (req, res) => {
    const servico = req.body;

    if(!servico.name || !servico.price || !servico.duracao || !servico.isActive) {
        return res.status(400).json({sucess:false, message: "Por favor, preencha todos os campos"})
    }

    const newServico = new Servico(servico)

    try {
        await newServico.save();
        res.status(201).json({sucess: true, data: newServico})
    }catch(error){
        console.error("Erro ao criar o serviço", error.message);
        res.status(500).json({sucess: false, message: "Server error"});
    }
};

export const updateServico = async (req,res) => {
    const { id } = req.params;

    const servico = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de serviço"})
    }

    try {
        const updatedServico = await Servico.findByIdAndUpdate(id, servico, {new:true})
        res.status(200).json({sucess: true, data: updatedServico});
    
    } catch(error) {
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const deleteServico = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de serviço"})
    }
    
    try{
        await Servico.findByIdAndDelete(id);
        res.status(200).json({"sucess": true, message: "Serviço deletado"})
    } catch(error) {
        console.log("Erro ao deletar o servico: ", error.message)
        res.status(500).json({sucess: false, message: "Serviço não encontrado"});
    }

}