const User = require('../models/userModel')

const findUserByFirebaseUID = (firebaseUID) => {
    return User.findOne({ firebaseUID });
}
const createUser = (query) => {
    return User.create(query);
}
const listInstruments = () => {
    return User.getInstrumentsEnumValues();
}

module.exports = {
    findUserByFirebaseUID,
    createUser,
    listInstruments
}