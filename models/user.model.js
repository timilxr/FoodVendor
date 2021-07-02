const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  });

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = (password)=>{
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;