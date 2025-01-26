// server/src/reservations/reservations.module.ts
import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService], // Başka modüller de ReservationsService'e ihtiyaç duyabilir
})
export class ReservationsModule {}
