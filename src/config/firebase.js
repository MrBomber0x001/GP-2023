// Realtime notificaton [fcm]

import { initializeApp, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import { getMessaging } from 'firebase-admin/messaging'
import { env } from '../config/constants.js';
const serviceAccount = require('./path/to/serviceAccountKey.json')


initializeApp({
    credential: cert(env.FIREBASE_SERVICE_ACCOUNT),
    storageBucket: '<BUCKET_NAME>.appspot.com'
})


const bucket = getStorage().bucket()
const fcm = getMessaging();
// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.

export default bucket