const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    }

    if (error.name === 'ValidationError') {
        return response.status(403).send({ error: error.message });
    }

    if (error.message === 'InvalidPassword') {
        return response.status(401).send({ error: 'Password has to be at least 3 characters' });
    }

    if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next();
    }
    const authorizationToken = authorization.replace('Bearer ', '');

    try {
        request.decodedToken = jwt.verify( authorizationToken, process.env.SECRET);
        next();
    } catch (error) {
        response.status(401).json({ error: 'token invalid' });
    }
};

const userExtractor = async (request, response, next) => {
    console.log('Decoded Token:', request.decodedToken)
    request.user = await User.findById(request.decodedToken.id);
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};