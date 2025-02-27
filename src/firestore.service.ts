import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirestoreService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      try {
        const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
        const serviceAccount = require(serviceAccountPath);
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } catch (error) {
        console.error('Firebase initialization error:', error);
        throw new Error('Firebase configuration is missing or invalid. Make sure serviceAccountKey.json exists in the server root directory.');
      }
    }
    
    this.db = admin.firestore();
  }

  public getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }
}
