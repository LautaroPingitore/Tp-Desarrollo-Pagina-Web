import mongoose from "mongoose";
import { ValidationError as CustomValidationError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // 🛠️ Detectar errores de Mongoose y convertirlos en errores operacionales
  if (err instanceof mongoose.Error.ValidationError) {
    err = new CustomValidationError(err.message);
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Producción
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Error de programación: no enviar detalles al cliente
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal'
      });
    }
  }
}; 