// src/reservations/reservation.interface.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Reservation {
  id: string;
  name: string;
  flightNumber: string;
  date: Date;
  customers: Customer[];
  [key: string]: any; // Diğer alanlar isteğe bağlı
}
