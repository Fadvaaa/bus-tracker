const mongoose = require("mongoose");

module.exports = (error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const keys = Object.keys(error.errors);
    error.message = error.errors[keys[keys.length - 1]].message;
    return {
      code: 400,
      message: error.message,
    };
  }

  return {
    code: error.code ?? 500,
    message: error?.message ?? "Internal server error",
  };
};
