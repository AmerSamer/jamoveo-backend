const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    instruments: {
        type: String,
        enum: ['drums', 'guitars', 'bass','saxophone', 'keyboards', 'vocals'],
        default: 'drums', // Default to 'drums'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Static method to retrieve enum values
userSchema.statics.getInstrumentsEnumValues = function () {
    return this.schema.path("instruments").enumValues;
};

module.exports = mongoose.model('User', userSchema);
