import mongoose from "mongoose";
import Cliente from "../models/cliente.model";

export const getCliente = async (req, res) => {
    try {
        const clientes = await Cliente.find({});
        res.status(200).json({sucess: true, data: clientes})
    } catch(error){
        console.log("Erro ao buscar os clientes: ", error.message)
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const createCliente = async (req, res) => {
    const cliente = req.body;

    if(!cliente.name || !cliente.email || !cliente.senha || !cliente.chaveSeguraRecuperaSenha || cliente.role) {
        return res.status(400).json({sucess:false, message: "Por favor, preencha todos os campos"})
    }

    const newCliente = new Cliente(cliente)

    try {
        await newCliente.save();
        res.status(201).json({sucess: true, data: newCliente})
    }catch(error){
        console.error("Erro ao criar o cliente", error.message);
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
};

export const updateCliente = async (req,res) => {
    const { id } = req.params;

    const cliente = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de cliente"})
    }

    try {
        const updatedCliente = await Cliente.findByIdAndUpdate(id, cliente, {new:true})
        res.status(200).json({sucess: true, data: updatedCliente});
    
    } catch(error) {
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const deleteCliente = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de cliente"})
    }
    
    try{
        await Cliente.findByIdAndDelete(id);
        res.status(200).json({"sucess": true, message: "Cliente deletado"})
    } catch(error) {
        console.log("Erro ao deletar o cliente: ", error.message)
        res.status(500).json({sucess: false, message: "Cliente não encontrado"});
    }

}