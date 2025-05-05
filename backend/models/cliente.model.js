import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const clienteSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    CPF: {
        type: String,
        required: false,
        get: function (v) {
            if (!v) return v;
            return v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
        },
        set: function (v) {
            return v.replace(/\D/g, '');
        }
    },

    dataNascimento: {
        type: Date,
        required: false
    },

    chaveSeguraRecuperaSenha: {
        type: String,
        required: true
    },

    endereco: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
})

clienteSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

clienteSchema.virtual('agendamentos', {
    ref: 'Agendamento',           
    localField: '_id',          
    foreignField: 'cliente'
});

clienteSchema.set('toJSON', { getters: true, virtuals: true });
clienteSchema.set('toObject', { virtuals: true });

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
