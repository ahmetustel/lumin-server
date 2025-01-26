import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.interface';
import { FirestoreService } from '../firestore.service';
import * as admin from 'firebase-admin';

@Injectable()
export class ReservationsService {
  private collection;

  constructor(private firestoreService: FirestoreService) {
    this.collection = this.firestoreService.getCollection('reservations');
  }

  async findAll(limit = 5, lastDoc?: string): Promise<Reservation[]> {
    let query: FirebaseFirestore.Query = this.collection
      .orderBy('date')
      .limit(limit);

    if (lastDoc) {
      const snapshot = await this.collection.doc(lastDoc).get();
      query = query.startAfter(snapshot);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => doc.data() as Reservation);
  }

  async findOne(id: string): Promise<Reservation | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as Reservation) : null;
  }

  async create(reservation: Reservation): Promise<void> {
    await this.collection.doc(reservation.id).set(reservation);
  }

  async update(id: string, reservation: Reservation): Promise<void> {
    await this.collection.doc(id).update(reservation);
  }

  async remove(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
