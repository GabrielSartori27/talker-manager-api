require('dotenv').config();
const jwt = require('jsonwebtoken');
const TalkerService = require('../services/talker.service');

const secret = process.env.JWT_SECRET;

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

module.exports = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) return res.status(401).json({ message: 'Token não encontrado' });

    const token = extractToken(bearerToken);

    try {
        const decoded = jwt.verify(token, secret);
        const user = await TalkerService.findById(decoded.data.userId);
        if (!user) return res.status(401).json({ message: 'Usuário do token não encontrado' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};