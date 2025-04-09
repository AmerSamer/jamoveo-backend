const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    instruments: {
        type: String,
        enum: ['', 'drums', 'guitars', 'bass', 'saxophone', 'keyboards', 'vocals'],
        default: '', // Default to 'drums'
    },
    role: {
        type: String,
        enum: ['admin', 'player'],
        default: 'player', // Default to 'player'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Static method to retrieve enum values
userSchema.statics.getInstrumentsEnumValues = function () {
    return this.schema.path("instruments").enumValues;
};

module.exports = mongoose.model('User', userSchema);
