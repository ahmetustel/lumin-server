import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.interface';
import { FirestoreService } from '../firestore.service';
import * as admin from 'firebase-admin';

@Injectable()
export class ReservationsService {
  private collection;

  constructor(private readonly firestoreService: FirestoreService) {
    this.collection = this.firestoreService.getCollection('reservations');
  }

  async findAll() {
    try {
      const snapshot = await this.firestoreService
        .getCollection('reservations')
        .orderBy('date', 'desc')
        .limit(50)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }));
    } catch (error) {
      console.error('Reservations fetch error:', error);
      throw error;
    }
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
