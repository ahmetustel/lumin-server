import * as admin from 'firebase-admin';
import { faker } from '@faker-js/faker';

console.log(faker.string.uuid()); // UUID oluşturur
console.log(faker.number.int({ min: 1, max: 100 })); // Rastgele bir sayı
console.log(faker.person.fullName()); // Tam isim oluşturur
console.log(faker.helpers.replaceSymbols('FL###')); // Uçuş numara

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

type User = {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'staff';
};

type Customer = {
  id: string;
  name: string;
  email: string;
};

type Reservation = {
  id: string;
  flightNumber: string;
  date: Date;
  customers: Customer[];
};

const generateUsers = async () => {
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.string.uuid(), // UUID oluşturma
      username: `user${i}`,
      password: faker.internet.password(),
      role: i === 0 ? 'admin' : 'staff',
    });
  }
  const batch = db.batch();
  users.forEach((user) => {
    const ref = db.collection('users').doc(user.id);
    batch.set(ref, user);
  });
  await batch.commit();
  console.log('Users generated');
};

const generateReservations = async () => {
  const reservations: Reservation[] = [];
  for (let i = 0; i < 1000; i++) {
    const customers: Customer[] = Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) }, // Rastgele sayı
      () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(), // Tam isim oluşturma
        email: faker.internet.email(),
      }),
    );
    reservations.push({
      id: faker.string.uuid(),
      flightNumber: faker.helpers.replaceSymbols('FL###'), // Uçuş numarası formatı
      date: faker.date.future(),
      customers,
    });
  }
  const batch = db.batch();
  reservations.forEach((reservation) => {
    const ref = db.collection('reservations').doc(reservation.id);
    batch.set(ref, reservation);
  });
  await batch.commit();
  console.log('Reservations generated');
};

const run = async () => {
  await generateUsers();
  await generateReservations();
  process.exit();
};

run();
