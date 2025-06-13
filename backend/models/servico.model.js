import mongoose from "mongoose";

const servicoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    duracao: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Servico = mongoose.model('Servico', servicoSchema)

export default Servico;