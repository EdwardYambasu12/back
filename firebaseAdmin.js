const admin = require('firebase-admin');


const serviceAccount = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
