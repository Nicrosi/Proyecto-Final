const { Router } = require('express');
const RouteUser = require('../routes/UserRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/user', RouteUser)

module.exports = router;
