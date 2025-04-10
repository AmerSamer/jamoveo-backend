/**
 * userDto.js
 *
 * This function defines how user data is formatted and returned to the client.
 * - Strips internal fields (like MongoDB _id, __v, timestamps)
 * - Ensures only safe and necessary fields are exposed
 */

const userDto = (user) => {
    return {
        firebaseUID: user.firebaseUID,
        userEmail: user.userEmail,
        instruments: user.instruments,
        role: user.role
    };
};


module.exports = {
    userDto
}