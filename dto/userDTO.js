const userDto = (user) => {
    return {
        // firebaseUID: user.firebaseUID,
        instruments: user.instruments
    };
};


module.exports = {
    userDto
}