const errorMap = {
    USER_NOT_FOUND: 404,
    INVALID_VALUE: 400,
    INVALID_TOKEN: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
    errorMap,
    mapError,
};