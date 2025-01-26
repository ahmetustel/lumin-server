import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module'; // <--- ekledik
import { UsersModule } from './users/users.module'; // <--- ekledik
import { FirestoreService } from './firestore.service';

@Module({
  imports: [ReservationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
