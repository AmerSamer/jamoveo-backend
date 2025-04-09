const admin = require('firebase-admin');
// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Decode the Base64 string and parse it as JSON
const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
);

const connectFirebaseAdmin = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log(`Firebase Admin initialized successfully`.cyan.underline);
    } catch (error) {
        console.log(`Error Firebase Admin: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectFirebaseAdmin

