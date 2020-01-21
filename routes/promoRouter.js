const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('will send all the promotions to you');
})
.post((req, res, next) => {
    res.end('will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('will send details of promotion: ' + req.params.promoId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('post operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('updating promotion: ' + req.params.promoId  + '\n');
    res.end('will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;