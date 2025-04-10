/**
 * userService.js
 *
 * Service layer to handle database operations for the User model.
 * - Isolates Mongoose logic from controller logic
 * - Helps keep controllers clean and testable
 */

const User = require('../models/userModel')

/**
 * findUserByFirebaseUID
 * Finds a user by their Firebase UID (provided by Firebase Auth).
 *
 * @param {string} firebaseUID - UID from Firebase Auth
 * @returns {Promise<Object|null>} User document or null if not found
 */
const findUserByFirebaseUID = (firebaseUID) => {
    return User.findOne({ firebaseUID });
}

/**
 * createUser
 * Creates a new user document in MongoDB.
 *
 * @param {Object} query - User details (email, firebaseUID, instrument, role, etc.)
 * @returns {Promise<Object>} Created user document
 */
const createUser = (query) => {
    return User.create(query);
}

/**
 * listInstruments
 * Gets the list of instrument enum values from the User schema.
 *
 * @returns {string[]} Array of available instrument options
 */
const listInstruments = () => {
    return User.getInstrumentsEnumValues();
}

module.exports = {
    findUserByFirebaseUID,
    createUser,
    listInstruments
}