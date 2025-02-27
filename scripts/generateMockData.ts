import * as admin from 'firebase-admin';
import { faker } from '@faker-js/faker';
import * as path from 'path';

(async () => {
  // Kendinize ait servis hesap JSON veya environment parametreleriyle initialize edin
  if (!admin.apps.length) {
    const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath))
    });
  }

  const db = admin.firestore();

  // 10 kullanıcı (1 admin, 9 staff)
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      // id: faker.datatype.uuid(),
      id: faker.string.uuid(), // UUID oluşturma
      username: `user${i}`,
      password: '123456', 
      role: i === 0 ? 'admin' : 'staff',
    });
  }

  // 1000 rezervasyon
  const reservations = [];
  for (let i = 0; i < 1000; i++) {
    const customerCount = faker.number.int({ min: 1, max: 3 });

    const customers = Array.from({ length: customerCount }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email(),
    }));
    reservations.push({
      id: faker.string.uuid(),
      flightNumber: `TK${faker.number.int({ min: 100, max: 999 })}`,
      date: faker.date.future(),
      customers,
    });
  }

  // Batch yazma
  const batch = db.batch();

  users.forEach((user) => {
    const ref = db.collection('users').doc(user.id);
    batch.set(ref, user);
  });

  reservations.forEach((resv) => {
    const ref = db.collection('reservations').doc(resv.id);
    batch.set(ref, resv);
  });

  await batch.commit();

  console.log('Mock data oluşturma tamamlandı.');
  process.exit(0);
})();
