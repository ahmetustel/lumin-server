// src/firestore/firestore.module.ts
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirestoreService } from './firestore.service';

@Module({
  providers: [
    FirestoreService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
      },
    },
  ],
  exports: [FirestoreService],
})
export class FirestoreModule {}
