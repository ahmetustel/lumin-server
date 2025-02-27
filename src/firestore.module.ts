import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Module({
  providers: [FirestoreService], // FirestoreService burada tanımlandı
  exports: [FirestoreService], // Dışa aktarıldı, böylece diğer modüller kullanabilir
})
export class FirestoreModule {}
