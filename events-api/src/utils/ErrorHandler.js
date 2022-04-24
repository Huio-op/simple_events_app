const validator = require('./validator');

class ErrorHandler {
  static throwError(code, message) {
    const error = this.createError(code, message);
    console.error(message);
    throw error;
  }

  static createError(code, message) {
    const error = new Error(message);
    error.status = code;
    return error;
  }

  responseError(res, code = 500, message, error, trace) {
    if (validator.checkRequestParams({ message, error }).length > 0) {
      return res.status(code || 500).json({
        error: this.getCodeMessage(0),
        message: this.translator.translate(
          'Ocorreu um erro ao realizar a requisição.',
        ),
      });
    }

    return res.status(code).json({ error, message });
  }

  getResponseHandler(res) {
    return (error) => {
      this.responseError(res, error.status, error.message, error);
    };
  }
}

module.exports = ErrorHandler;
