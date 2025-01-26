import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    // Örnek: Servis hesap JSON'u veya environment parametreleri
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          // JSON dosyası yerine environment parametrelerini kullanma
          //   {
          //   projectId: process.env.FIREBASE_PROJECT_ID,
          //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          // }

          // JSON dosyası kullanma
          require('../serviceAccountKey.json'),
        ),
      });
    }
    this.db = admin.firestore();
  }

  public getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }
}
