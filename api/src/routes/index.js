const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const category = require("../routes/Category.routes.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/category", category);

module.exports = router;
