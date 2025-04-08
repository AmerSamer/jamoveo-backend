const User = require('../models/userModel')

const findUserByFirebaseUID = (firebaseUID) => {
    return User.findOne({ firebaseUID });
}

module.exports = {
    findUserByFirebaseUID
}