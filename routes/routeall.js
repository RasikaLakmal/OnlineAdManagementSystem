
const adsController =require("../controllers/adsController");

const routerf =require('express').Router()


// item per page
routerf.get('/:page', adsController.adPerPage);


module.exports =routerf