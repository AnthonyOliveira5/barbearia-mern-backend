import mongoose from "mongoose";
import Usuario from "../models/usuario.model";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.status(200).json({sucess: true, data: usuarios})
    } catch(error){
        console.log("Erro ao buscar os usuarios: ", error.message)
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const createUsuario = async (req, res) => {
    const usuario = req.body;

    if(!usuario.name || !usuario.email || !usuario.senha || !usuario.telefone || usuario.role) {
        return res.status(400).json({sucess:false, message: "Por favor, preencha todos os campos"})
    }

    const newUsuario = new Usuario(usuario)

    try {
        await newUsuario.save();
        res.status(201).json({sucess: true, data: newUsuario})
    }catch(error){
        console.error("Erro ao criar o usuario", error.message);
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
};

export const updateUsuario = async (req,res) => {
    const { id } = req.params;

    const usuario = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de usuario"})
    }

    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(id, usuario, {new:true})
        res.status(200).json({sucess: true, data: updatedUsuario});
    
    } catch(error) {
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const deleteUsuario = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "Inválido id de usuário"})
    }
    
    try{
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({"sucess": true, message: "Usuario deletado"})
    } catch(error) {
        console.log("Erro ao deletar o usuário: ", error.message)
        res.status(500).json({sucess: false, message: "Usuario não encontrado"});
    }

}