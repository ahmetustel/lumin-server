// server/src/reservations/reservations.module.ts
import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { FirestoreModule } from '../firestore.module'; // FirestoreModule import edildi

@Module({
  imports: [FirestoreModule], // FirestoreModule buraya eklendi!
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService], // Başka modüller de ReservationsService'e ihtiyaç duyabilir
})
export class ReservationsModule {}
