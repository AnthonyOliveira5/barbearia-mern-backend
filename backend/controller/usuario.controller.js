import mongoose from "mongoose";
import Usuario from "../models/usuario.model.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.status(200).json({sucess: true, data: usuarios})
    } catch(error){
        console.log("Erro ao buscar os usuarios: ", error.message)
        res.status(500).json({sucess: false, message: "Erro no servidor"});
    }
}

export const getUsuariosById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
    }

    try {
        const usuario = await Usuario.findById(id)

        if (!usuario) {
            return res.status(404).json({ success: false, message: "usuario não encontrado" });
        }

        res.status(200).json({ success: true, data: usuario });
    } catch (error) {
        console.error("Erro ao buscar usuario:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const getUsuarioByFirebaseUid = async (req, res) => {
    const { firebase_uid } = req.params;

    try {
        const usuario = await Usuario.findOne({ firebase_uid });

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }

        res.status(200).json({ success: true, data: usuario });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const getBarbeiros = async (req, res) => {
  try {
    const barbeiros = await Usuario.find({ role: 'barbeiro' });
    res.status(200).json({ success: true, data: barbeiros });
  } catch (error) {
    console.error('Erro ao buscar barbeiros:', error.message);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const createUsuario = async (req, res) => {
    const usuario = req.body;

    if(!usuario.name || !usuario.email || !usuario.senha || !usuario.telefone || !usuario.role) {
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