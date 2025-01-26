// server/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { FirestoreService } from '../firestore.service';

@Injectable()
export class UsersService {
  private collection;

  constructor(private firestoreService: FirestoreService) {
    this.collection = this.firestoreService.getCollection('users');
  }

  // Basit örnek: user kaydı
  async register(user: User) {
    // ID'yi parametreden değil, user objesinden veya Firestore otomatik ID'sinden alabilirsiniz
    await this.collection.doc(user.id).set(user);
    return user;
  }

  // Basit örnek: login (kullanıcıyı bul, şifre kontrol et)
  async validateUser(username: string, password: string): Promise<User | null> {
    const snapshot = await this.collection
      .where('username', '==', username)
      .limit(1)
      .get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const foundUser = doc.data() as User;

    if (foundUser.password === password) {
      return foundUser;
    }
    return null;
  }

  // Kullanıcı bilgilerini dönmek isteyen endpointler için
  async findById(userId: string): Promise<User | null> {
    const doc = await this.collection.doc(userId).get();
    return doc.exists ? (doc.data() as User) : null;
  }
}
