export const notFound = (req, res) => {
  res.status(404).json({ ok: false, msg: "Ruta no encontrada" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, msg: "Error interno del servidor" });
};