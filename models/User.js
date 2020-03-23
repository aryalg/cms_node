const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.testMethod = function() {
  console.log("Using schema methods: test");
};

module.exports = mongoose.model("users", UserSchema);
