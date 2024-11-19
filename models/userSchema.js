import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      unique: [true, 'Email must be unique!'],
      minlength: [5, 'Email must have at least 5 characters!'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      select: false, // Exclude password by default in queries
    },

    // Indica se o e-mail do usuário foi verificado.
    verified: {
      type: Boolean,
      default: false, // Default value for unverified users
    },

    // Índice de verificação de e-mail, usado para verificar o e-mail do usuário.
    verificationCode: {
      type: String,
      select: false, // Exclude sensitive data from queries
    },

     // Tempo de expiração do código de verificação de e-mail, em milissegundos desde a época (Unix timestamp).
    verificationCodeValidation: {
      type: Number,
      select: false,
    },

     // Código de redefinição de senha, usado para redefinir a senha do usuário em caso de esquecimento.
    forgotPasswordCode: {
      type: String,
      select: false,
    },

     // Tempo de expiração do código de redefinição de senha, em milissegundos desde a época (Unix timestamp).
    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
