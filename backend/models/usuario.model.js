import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
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

  endereco: {
    type: String,
    required: false
  },

  telefone: {
    type: String,
    required: true,
    get: function (v) {
      if (!v) return v;
      return v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    },
    set: function (v) {
      return v.replace(/\D/g, '');
    }
  },

  salario: {
    type: Number,
    required: false
  },
  role: { 
    type: String, 
    required: true 
  }
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

usuarioSchema.set('toJSON', { getters: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
