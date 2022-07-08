
const { Router } = require('express');
const RouteUser = require('../routes/UserRouter')
const router = Router();
const category = require("../routes/CategoryRouter.js");
const Sponsor = require("../routes/SponsorRouter.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/category", category);
router.use('/user', RouteUser);
router.use('/sponsor', Sponsor);



module.exports = router;
