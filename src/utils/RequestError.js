const CustomError = require("custom-error");

class RequestError extends CustomError {
    constructor(code, message, status){
      this.code = code,
      this.message = message,
      this.status = status
    }
}

module.exports =  RequestError;
