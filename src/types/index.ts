export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  isVerified: boolean;
}

export type UserRole =
  | "owner"
  | "vet"
  | "groomer"
  | "trainer"
  | "vendor"
  | "shelter"
  | "admin";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: number;
  color: string;
  gender: "male" | "female";
  image: string;
  ownerId: string;
  vaccinated: boolean;
  microchipped: boolean;
  neutered: boolean;
  dob: string;
  allergies: string[];
  conditions: string[];
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  vetId: string;
  vetName: string;
  date: string;
  time: string;
  type: "consultation" | "vaccination" | "surgery" | "checkup" | "telemedicine";
  status: "scheduled" | "completed" | "cancelled" | "pending";
  notes?: string;
  fee: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
}

export interface Vet {
  id: string;
  name: string;
  specialization: string;
  clinic: string;
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  available: boolean;
  fee: number;
  location: string;
  languages: string[];
}

export interface AdoptionPet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: "male" | "female";
  image: string;
  shelter: string;
  location: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  status: "available" | "pending" | "adopted";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  badge?: string;
  color: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  address: string;
  paymentMethod: string;
}

export interface GroomingService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
  rating: number;
}

export interface TrainingProgram {
  id: string;
  name: string;
  trainer: string;
  trainerImage: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  sessions: number;
  price: number;
  rating: number;
  image: string;
  description: string;
  enrolled: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
  petName?: string;
}
