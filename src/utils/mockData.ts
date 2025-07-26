export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store-owner';
  password: string;
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  averageRating: number;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    address: '123 Admin Street, Admin City',
    role: 'admin',
    password: 'Admin123!',
  },
  {
    id: '2',
    name: 'Jane User',
    email: 'user@example.com',
    address: '456 User Avenue, User Town',
    role: 'user',
    password: 'User123!',
  },
  {
    id: '3',
    name: 'Mike Store Owner',
    email: 'store@example.com',
    address: '789 Store Boulevard, Store City',
    role: 'store-owner',
    password: 'Store123!',
    storeId: '1',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    address: '321 Oak Street, Springfield',
    role: 'user',
    password: 'Sarah123!',
  },
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tech Paradise',
    email: 'store@example.com',
    address: '789 Store Boulevard, Store City',
    ownerId: '3',
    averageRating: 4.2,
  },
  {
    id: '2',
    name: 'Book Haven',
    email: 'books@example.com',
    address: '555 Literary Lane, Book City',
    ownerId: '3',
    averageRating: 4.8,
  },
  {
    id: '3',
    name: 'Fashion Forward',
    email: 'fashion@example.com',
    address: '777 Style Street, Fashion District',
    ownerId: '3',
    averageRating: 3.9,
  },
];

export const mockRatings: Rating[] = [
  {
    id: '1',
    userId: '2',
    storeId: '1',
    rating: 4,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    userId: '4',
    storeId: '1',
    rating: 5,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    userId: '2',
    storeId: '2',
    rating: 5,
    createdAt: '2024-01-20',
  },
];