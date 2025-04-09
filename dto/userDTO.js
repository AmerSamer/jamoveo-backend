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