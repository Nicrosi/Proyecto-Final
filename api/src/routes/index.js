const { Router } = require('express');
const RouteUser = require("../routes/UserRouter");
const category = require("../routes/CategoryRouter.js");
const Sponsor = require("../routes/SponsorRouter.js");
const Score = require("../routes/ScoreRouter.js");
const Subtournament = require("../routes/SubtRouter.js");
const Tournament = require("../routes/TournamentRouter.js");
const inscription = require("../routes/InscriptionRouter.js");
const Team = require("../routes/TeamRouter.js");
const Auth = require("../routes/AuthRouter.js");
const Gallery = require("../routes/GalleryRouter.js");
const router = Router();



router.use("/category", category);
router.use("/user", RouteUser);
router.use("/sponsor", Sponsor);
router.use("/score", Score);
router.use("/subtournament", Subtournament);
router.use("/inscription", inscription);
router.use('/tournament', Tournament);
router.use('/team', Team);
router.use('/auth', Auth);
router.use('/gallery', Gallery);


module.exports = router;
