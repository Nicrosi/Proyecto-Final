
const { Router } = require('express');
const RouteUser = require('../routes/UserRouter')
const router = Router();
const category = require("../routes/CategoryRouter.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/category", category);
router.use('/user', RouteUser)


module.exports = router;
