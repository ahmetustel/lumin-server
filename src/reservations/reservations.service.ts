// src/reservations/reservations.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Reservation } from './reservation.interface';

@Injectable()
export class ReservationsService {
  private db = admin.firestore();

  async findAll(limit = 5, lastDoc?: string): Promise<Reservation[]> {
    let query = this.db.collection('reservations').orderBy('date').limit(limit);
    if (lastDoc) {
      const lastSnapshot = await this.db
        .collection('reservations')
        .doc(lastDoc)
        .get();
      query = query.startAfter(lastSnapshot);
    }
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => doc.data() as Reservation);
  }

  private readonly reservations: Reservation[] = [];

  findOne(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  create(reservation: Reservation): Reservation {
    this.reservations.push(reservation);
    return reservation;
  }

  update(id: string, updatedReservation: Reservation): Reservation | undefined {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index === -1) return undefined;
    this.reservations[index] = updatedReservation;
    return updatedReservation;
  }

  remove(id: string): boolean {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index === -1) return false;
    this.reservations.splice(index, 1);
    return true;
  }

  // Other CRUD methods...
}
