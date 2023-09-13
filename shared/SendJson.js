module.exports = (res, { code = 200, message, data, is_next } = {}) => {
    if (data) console.log(data);
  
    if (code != 200) {
      message = message ?? "Internal server error";
    }
  
    return res.status(code ?? 500).json({
      data,
      is_next,
      message,
    });
  };
  