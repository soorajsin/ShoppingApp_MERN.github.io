const mongoose = require("mongoose");
const validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const keysecret = "kjhgfdretyuhjnbvgfdretyujhgfvb";
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: 1,
                    required: true,
                    validator(value) {
                              if (!validator.isEmail(value)) {
                                        throw "Invalid Email";
                              }
                    }
          },
          password: {
                    type: String,
                    require: true,
                    minlength: 6
          },
          cpassword: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});



//hash password
userSchema.pre('save', async function (next) {
          if (this.isModified('password')) {
                    this.password = await bcrypt.hash(this.password, 12);
                    this.cpassword = await bcrypt.hash(this.cpassword, 12);
          }
          return next();
});


//generate token
userSchema.methods.getSignedToken = async function () {
          try {
                    const token = jwt.sign({
                              _id: this._id
                    }, keysecret);
                    this.tokens = this.tokens.concat({
                              token
                    });
                    await this.save();
                    return token;
          } catch (error) {
                    throw new Error("Failed to generate token");
          }
}




const userdb = mongoose.model("users", userSchema);

module.exports = userdb;