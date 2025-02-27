// server/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirestoreModule } from '../firestore.module'; // FirestoreModule'ü import ettik

@Module({
  imports: [FirestoreModule], // FirestoreModule burada olmalı!
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
