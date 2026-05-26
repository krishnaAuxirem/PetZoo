import type {
  Pet, Appointment, Product, BlogPost, Vet, AdoptionPet,
  MembershipPlan, Order, CartItem, GroomingService, TrainingProgram,
  CommunityPost, Notification
} from "@/types";

export const mockPets: Pet[] = [
  { id: "p1", name: "Max", species: "Dog", breed: "Golden Retriever", age: "3 years", weight: 28, color: "Golden", gender: "male", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400", ownerId: "u1", vaccinated: true, microchipped: true, neutered: false, dob: "2021-03-15", allergies: ["Wheat"], conditions: [] },
  { id: "p2", name: "Luna", species: "Cat", breed: "Persian", age: "2 years", weight: 4, color: "White", gender: "female", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400", ownerId: "u1", vaccinated: true, microchipped: false, neutered: true, dob: "2022-07-20", allergies: [], conditions: ["Asthma"] },
  { id: "p3", name: "Tweety", species: "Bird", breed: "Canary", age: "1 year", weight: 0.02, color: "Yellow", gender: "male", image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400", ownerId: "u1", vaccinated: false, microchipped: false, neutered: false, dob: "2023-01-10", allergies: [], conditions: [] },
];

export const mockAppointments: Appointment[] = [
  { id: "a1", petId: "p1", petName: "Max", vetId: "v1", vetName: "Dr. Sarah Johnson", date: "2024-12-28", time: "10:00 AM", type: "checkup", status: "scheduled", notes: "Annual checkup", fee: 85 },
  { id: "a2", petId: "p2", petName: "Luna", vetId: "v2", vetName: "Dr. Michael Chen", date: "2024-12-20", time: "2:30 PM", type: "vaccination", status: "completed", notes: "Rabies booster", fee: 65 },
  { id: "a3", petId: "p1", petName: "Max", vetId: "v1", vetName: "Dr. Sarah Johnson", date: "2024-12-15", time: "11:00 AM", type: "consultation", status: "completed", notes: "Skin irritation", fee: 95 },
  { id: "a4", petId: "p2", petName: "Luna", vetId: "v3", vetName: "Dr. Emily Davis", date: "2025-01-05", time: "3:00 PM", type: "telemedicine", status: "pending", notes: "Follow-up consultation", fee: 45 },
];

export const mockVets: Vet[] = [
  { id: "v1", name: "Dr. Sarah Johnson", specialization: "General Practice & Surgery", clinic: "PetCare Plus Clinic", rating: 4.9, reviews: 284, experience: "12 years", image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400", available: true, fee: 85, location: "New York, NY", languages: ["English", "Spanish"] },
  { id: "v2", name: "Dr. Michael Chen", specialization: "Exotic Animals & Avian", clinic: "City Animal Hospital", rating: 4.8, reviews: 196, experience: "9 years", image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400", available: true, fee: 95, location: "Los Angeles, CA", languages: ["English", "Mandarin"] },
  { id: "v3", name: "Dr. Emily Davis", specialization: "Feline Medicine", clinic: "Cat Wellness Center", rating: 4.7, reviews: 152, experience: "7 years", image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400", available: false, fee: 75, location: "Chicago, IL", languages: ["English"] },
  { id: "v4", name: "Dr. James Wilson", specialization: "Orthopedics & Neurology", clinic: "Advanced Vet Specialists", rating: 4.9, reviews: 341, experience: "18 years", image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400", available: true, fee: 150, location: "Houston, TX", languages: ["English"] },
  { id: "v5", name: "Dr. Priya Sharma", specialization: "Dermatology & Allergy", clinic: "Skin & Coat Specialists", rating: 4.8, reviews: 217, experience: "11 years", image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400", available: true, fee: 110, location: "Seattle, WA", languages: ["English", "Hindi"] },
  { id: "v6", name: "Dr. Robert Brown", specialization: "Emergency & Critical Care", clinic: "24/7 Animal Emergency", rating: 4.6, reviews: 98, experience: "14 years", image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400", available: true, fee: 120, location: "Miami, FL", languages: ["English", "Portuguese"] },
];

export const mockProducts: Product[] = [
  { id: "pr1", name: "Royal Canin Adult Dog Food", category: "Food", price: 45.99, originalPrice: 59.99, rating: 4.8, reviews: 1247, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Complete nutrition for adult dogs. Formulated for optimal digestion and healthy coat.", brand: "Royal Canin", inStock: true, badge: "Best Seller" },
  { id: "pr2", name: "Premium Cat Tree Tower", category: "Accessories", price: 89.99, originalPrice: 119.99, rating: 4.6, reviews: 834, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Multi-level cat tree with scratching posts, cozy hammocks and observation perches.", brand: "PetHome", inStock: true, badge: "20% Off" },
  { id: "pr3", name: "Interactive Dog Puzzle Toy", category: "Toys", price: 24.99, rating: 4.7, reviews: 562, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Mental stimulation toy to keep your dog engaged and prevent boredom.", brand: "PawsPlay", inStock: true },
  { id: "pr4", name: "Flea & Tick Collar", category: "Healthcare", price: 19.99, originalPrice: 27.99, rating: 4.5, reviews: 423, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=400", description: "8-month protection against fleas and ticks. Waterproof and safe formula.", brand: "Seresto", inStock: true, badge: "New" },
  { id: "pr5", name: "Wireless Pet Camera", category: "Technology", price: 79.99, originalPrice: 99.99, rating: 4.9, reviews: 721, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=400", description: "HD camera with two-way audio, treat dispenser and night vision. Monitor your pet anytime.", brand: "Furbo", inStock: true, badge: "Top Rated" },
  { id: "pr6", name: "Organic Catnip Toys Set", category: "Toys", price: 14.99, rating: 4.6, reviews: 389, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Set of 6 organic catnip toys in various shapes. 100% natural and safe.", brand: "ZippyPaws", inStock: true },
  { id: "pr7", name: "Orthopedic Memory Foam Bed", category: "Accessories", price: 65.99, originalPrice: 85.99, rating: 4.8, reviews: 956, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Premium orthopedic bed for dogs with joint issues. Washable cover included.", brand: "BestFriends", inStock: false, badge: "Premium" },
  { id: "pr8", name: "Bird Seed Premium Mix", category: "Food", price: 18.99, rating: 4.4, reviews: 214, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Nutritious blend of seeds, nuts and dried fruits for parrots and canaries.", brand: "Kaytee", inStock: true },
];

export const mockBlogPosts: BlogPost[] = [
  { id: "b1", title: "10 Signs Your Dog Needs to See a Vet Immediately", excerpt: "Learn the critical warning signs that require immediate veterinary attention to keep your dog safe and healthy.", content: "", author: "Dr. Sarah Johnson", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Health", tags: ["dogs", "health", "emergency", "vet"], image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-12-15", readTime: 8, views: 12480, likes: 847 },
  { id: "b2", title: "Complete Guide to Cat Nutrition in 2024", excerpt: "Everything you need to know about feeding your cat for optimal health, longevity and happiness.", content: "", author: "Dr. Emily Davis", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Nutrition", tags: ["cats", "nutrition", "food", "health"], image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-12-10", readTime: 12, views: 9234, likes: 612 },
  { id: "b3", title: "How to Train Your Dog: Positive Reinforcement Techniques", excerpt: "Professional trainers share the most effective positive reinforcement methods for obedient and happy dogs.", content: "", author: "Jake Miller", authorAvatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Training", tags: ["dogs", "training", "behavior"], image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-12-08", readTime: 10, views: 7891, likes: 534 },
  { id: "b4", title: "Pet Adoption: What to Expect in the First 30 Days", excerpt: "A comprehensive guide to welcoming your newly adopted pet and making the transition smooth for everyone.", content: "", author: "Rachel Green", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Adoption", tags: ["adoption", "new pet", "guide"], image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-12-05", readTime: 7, views: 6745, likes: 421 },
  { id: "b5", title: "5 Best Grooming Tips for Long-Haired Cats", excerpt: "Keep your fluffy feline looking their best with these professional grooming techniques from expert groomers.", content: "", author: "Maria Santos", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Grooming", tags: ["cats", "grooming", "care"], image: "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-12-01", readTime: 6, views: 5234, likes: 367 },
  { id: "b6", title: "Understanding Bird Body Language and Communication", excerpt: "Decode what your feathered friend is trying to tell you with this comprehensive bird behavior guide.", content: "", author: "Dr. Michael Chen", authorAvatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", category: "Behavior", tags: ["birds", "behavior", "communication"], image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=600", publishedAt: "2024-11-28", readTime: 9, views: 4123, likes: 289 },
];

export const mockAdoptionPets: AdoptionPet[] = [
  { id: "ad1", name: "Buddy", species: "Dog", breed: "Labrador Mix", age: "2 years", gender: "male", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "Happy Tails Shelter", location: "New York, NY", description: "Buddy is a playful and affectionate lab mix who loves outdoor adventures. He's great with children and has basic obedience training.", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, status: "available" },
  { id: "ad2", name: "Mittens", species: "Cat", breed: "Domestic Shorthair", age: "3 years", gender: "female", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "City Cat Rescue", location: "Los Angeles, CA", description: "Mittens is a calm, gentle cat who enjoys quiet environments. She's perfect for a cozy home and loves being brushed.", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, status: "available" },
  { id: "ad3", name: "Charlie", species: "Dog", breed: "Beagle", age: "1 year", gender: "male", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "Paws & Claws Rescue", location: "Chicago, IL", description: "Charlie is an energetic young beagle full of curiosity and love. He needs a yard to run in and an active family.", vaccinated: true, neutered: false, goodWithKids: true, goodWithPets: true, status: "pending" },
  { id: "ad4", name: "Polly", species: "Bird", breed: "African Grey Parrot", age: "4 years", gender: "female", image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "Wing & Song Sanctuary", location: "Miami, FL", description: "Polly is a highly intelligent parrot with an impressive vocabulary. She needs stimulation and social interaction daily.", vaccinated: true, neutered: false, goodWithKids: false, goodWithPets: false, status: "available" },
  { id: "ad5", name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "8 months", gender: "female", image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "Small Critters Rescue", location: "Seattle, WA", description: "Snowball is an adorable lop-eared bunny who loves being petted. She's litter trained and very sociable.", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, status: "available" },
  { id: "ad6", name: "Rex", species: "Dog", breed: "German Shepherd", age: "5 years", gender: "male", image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=400", shelter: "Forever Home Rescue", location: "Houston, TX", description: "Rex is a loyal and well-trained German Shepherd, excellent for families wanting a protective and intelligent companion.", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, status: "available" },
];

export const mockMembershipPlans: MembershipPlan[] = [
  { id: "m1", name: "Paw Starter", price: 0, yearlyPrice: 0, features: ["1 Pet Profile", "Basic Health Records", "Community Access", "3 Vet Consultations/year", "Marketplace Access"], highlighted: false, color: "#64748B" },
  { id: "m2", name: "Pet Care Plus", price: 9.99, yearlyPrice: 89.99, features: ["3 Pet Profiles", "Full Health Records", "Vaccination Reminders", "Unlimited Vet Chat", "10% Marketplace Discount", "Grooming Booking", "Priority Support"], highlighted: false, badge: "Popular", color: "#0EA5E9" },
  { id: "m3", name: "Premium Guardian", price: 24.99, yearlyPrice: 239.99, features: ["Unlimited Pets", "AI Health Assistant", "Telemedicine Consultations", "15% Marketplace Discount", "Free Monthly Grooming", "Training Programs", "Emergency 24/7 Vet Line", "Pet Insurance Integration", "Dedicated Account Manager"], highlighted: true, badge: "Best Value", color: "#F97316" },
  { id: "m4", name: "Enterprise Pack", price: 99.99, yearlyPrice: 999.99, features: ["All Premium Features", "Multi-location Support", "White-label Options", "API Access", "Priority Onboarding", "Custom Integrations", "SLA Guarantee", "Dedicated Team"], highlighted: false, badge: "Enterprise", color: "#A855F7" },
];

export const mockGroomingServices: GroomingService[] = [
  { id: "g1", name: "Full Grooming Package", description: "Complete grooming including bath, haircut, nail trim, ear cleaning and de-shedding treatment.", price: 65, duration: "2-3 hours", image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Dog", rating: 4.9 },
  { id: "g2", name: "Cat Spa Treatment", description: "Gentle cat bath, blow dry, nail trim and ear cleaning for a pampered feline experience.", price: 55, duration: "1.5-2 hours", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Cat", rating: 4.8 },
  { id: "g3", name: "Express Bath & Brush", description: "Quick bath, blow dry and brush out to keep your pet clean between full grooms.", price: 35, duration: "1 hour", image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Dog", rating: 4.7 },
  { id: "g4", name: "Nail Trim & Filing", description: "Professional nail trim and filing for dogs and cats. Quick and stress-free service.", price: 20, duration: "20 minutes", image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=400", category: "All", rating: 4.6 },
  { id: "g5", name: "De-shedding Treatment", description: "Intensive de-shedding treatment to reduce shedding by up to 80% for heavy shedders.", price: 45, duration: "1.5 hours", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400", category: "Dog", rating: 4.8 },
  { id: "g6", name: "Pet Massage & Aromatherapy", description: "Relaxing aromatherapy massage using pet-safe essential oils to reduce anxiety and stress.", price: 40, duration: "45 minutes", image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=400", category: "All", rating: 4.9 },
];

export const mockTrainingPrograms: TrainingProgram[] = [
  { id: "t1", name: "Basic Obedience Bootcamp", trainer: "Jake Miller", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", level: "beginner", duration: "4 weeks", sessions: 8, price: 199, rating: 4.9, image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Master the fundamentals: sit, stay, come, heel and leash manners.", enrolled: 234 },
  { id: "t2", name: "Advanced Agility Training", trainer: "Sofia Rodriguez", trainerImage: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", level: "advanced", duration: "8 weeks", sessions: 16, price: 449, rating: 4.8, image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Competition-level agility training including jumps, weave poles, and tunnels.", enrolled: 87 },
  { id: "t3", name: "Puppy Socialization Class", trainer: "Tom Bradley", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", level: "beginner", duration: "3 weeks", sessions: 6, price: 149, rating: 4.7, image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Essential socialization for puppies 8-16 weeks. Safe, fun environment to learn social skills.", enrolled: 312 },
  { id: "t4", name: "Behavior Correction Program", trainer: "Jake Miller", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", level: "intermediate", duration: "6 weeks", sessions: 12, price: 349, rating: 4.8, image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=400", description: "Address challenging behaviors: excessive barking, jumping, aggression and separation anxiety.", enrolled: 156 },
];

export const mockCommunityPosts: CommunityPost[] = [
  { id: "c1", author: "Sarah M.", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Max just graduated from his obedience training. So proud of my boy — he can now sit, stay, shake and even roll over on command. Jake Miller is an absolutely amazing trainer!", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", likes: 247, comments: 32, shares: 18, createdAt: "2024-12-18T10:30:00Z", tags: ["dogtraining", "proudpetmom", "goldenretriever"], petName: "Max" },
  { id: "c2", author: "David K.", authorAvatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Luna's first vet visit went so well! Dr. Davis said she's perfectly healthy. Pro tip: bring your cat's favorite treat to make the visit less stressful — it changed everything for us.", likes: 189, comments: 24, shares: 11, createdAt: "2024-12-17T15:45:00Z", tags: ["catcare", "vettips", "persian"], petName: "Luna" },
  { id: "c3", author: "Emma R.", authorAvatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Just adopted Buddy from Happy Tails Shelter and he has already settled in like he has been here forever. Adoption is the best decision we ever made. Please consider adopting before shopping.", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=600", likes: 412, comments: 67, shares: 89, createdAt: "2024-12-16T09:20:00Z", tags: ["adopt", "rescuedog", "beagle"], petName: "Buddy" },
  { id: "c4", author: "Alex T.", authorAvatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Reminder to all pet owners: December temperatures are dropping. Make sure your outdoor pets have warm shelter, fresh water (check for freezing) and enough food to maintain body heat. Stay safe out there.", likes: 534, comments: 45, shares: 127, createdAt: "2024-12-15T08:00:00Z", tags: ["petwinter", "petcare", "reminder"] },
];

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Appointment Reminder", message: "Max has a checkup with Dr. Sarah Johnson tomorrow at 10:00 AM", type: "info", read: false, createdAt: "2024-12-27T09:00:00Z", link: "/dashboard/appointments" },
  { id: "n2", title: "Vaccination Due", message: "Luna's annual vaccination is due in 7 days. Book now to ensure timely protection.", type: "warning", read: false, createdAt: "2024-12-26T08:30:00Z", link: "/dashboard/vaccination" },
  { id: "n3", title: "Order Shipped", message: "Your order #ORD-2024-1847 has been shipped. Estimated delivery: Dec 30.", type: "success", read: true, createdAt: "2024-12-25T14:20:00Z", link: "/dashboard/orders" },
  { id: "n4", title: "New Message from Vet", message: "Dr. Michael Chen sent you a follow-up message regarding Luna's last visit.", type: "info", read: true, createdAt: "2024-12-24T11:00:00Z", link: "/dashboard/messages" },
  { id: "n5", title: "Community Mention", message: "Sarah M. mentioned you in a post about dog training tips.", type: "info", read: true, createdAt: "2024-12-23T16:45:00Z", link: "/community" },
];

export const mockOrders: Order[] = [
  { id: "ord1", items: [{ id: "ci1", productId: "pr1", name: "Royal Canin Adult Dog Food", price: 45.99, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=100", quantity: 2, category: "Food" }], total: 97.97, status: "delivered", createdAt: "2024-12-15", address: "123 Main St, New York, NY 10001", paymentMethod: "Visa •••• 4242" },
  { id: "ord2", items: [{ id: "ci2", productId: "pr5", name: "Wireless Pet Camera", price: 79.99, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=100", quantity: 1, category: "Technology" }], total: 84.98, status: "shipped", createdAt: "2024-12-22", address: "123 Main St, New York, NY 10001", paymentMethod: "MasterCard •••• 8821" },
  { id: "ord3", items: [{ id: "ci3", productId: "pr2", name: "Premium Cat Tree Tower", price: 89.99, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=100", quantity: 1, category: "Accessories" }, { id: "ci4", productId: "pr6", name: "Organic Catnip Toys Set", price: 14.99, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=100", quantity: 2, category: "Toys" }], total: 124.97, status: "processing", createdAt: "2024-12-26", address: "123 Main St, New York, NY 10001", paymentMethod: "PayPal" },
];

export const chartDataMonthly = [
  { month: "Jan", appointments: 4, spending: 180, weight: 26.5 },
  { month: "Feb", appointments: 2, spending: 95, weight: 27.0 },
  { month: "Mar", appointments: 5, spending: 240, weight: 27.3 },
  { month: "Apr", appointments: 3, spending: 130, weight: 27.8 },
  { month: "May", appointments: 6, spending: 280, weight: 28.0 },
  { month: "Jun", appointments: 2, spending: 110, weight: 28.2 },
  { month: "Jul", appointments: 4, spending: 195, weight: 27.9 },
  { month: "Aug", appointments: 3, spending: 155, weight: 28.1 },
  { month: "Sep", appointments: 7, spending: 320, weight: 28.0 },
  { month: "Oct", appointments: 5, spending: 250, weight: 27.8 },
  { month: "Nov", appointments: 3, spending: 170, weight: 27.5 },
  { month: "Dec", appointments: 4, spending: 210, weight: 28.0 },
];

export const vetRevenueData = [
  { month: "Jan", revenue: 4200, patients: 48, consultations: 36 },
  { month: "Feb", revenue: 3800, patients: 42, consultations: 31 },
  { month: "Mar", revenue: 5100, patients: 57, consultations: 44 },
  { month: "Apr", revenue: 4750, patients: 53, consultations: 40 },
  { month: "May", revenue: 5800, patients: 64, consultations: 51 },
  { month: "Jun", revenue: 5200, patients: 58, consultations: 46 },
  { month: "Jul", revenue: 6100, patients: 68, consultations: 55 },
  { month: "Aug", revenue: 5700, patients: 63, consultations: 50 },
  { month: "Sep", revenue: 6400, patients: 71, consultations: 57 },
  { month: "Oct", revenue: 5900, patients: 66, consultations: 52 },
  { month: "Nov", revenue: 5400, patients: 60, consultations: 48 },
  { month: "Dec", revenue: 6200, patients: 69, consultations: 55 },
];

export const adminStats = {
  totalUsers: 48291,
  petOwners: 38420,
  vets: 1247,
  groomers: 892,
  trainers: 634,
  vendors: 1891,
  shelters: 207,
  activePets: 72841,
  totalRevenue: 1284750,
  monthlyRevenue: 128475,
  totalOrders: 24891,
  pendingOrders: 1247,
  adoptions: 3421,
  appointments: 18742,
};

export const revenueBreakdown = [
  { name: "Marketplace", value: 45, color: "#F97316" },
  { name: "Veterinary", value: 25, color: "#0EA5E9" },
  { name: "Memberships", value: 15, color: "#22C55E" },
  { name: "Grooming", value: 8, color: "#A855F7" },
  { name: "Training", value: 7, color: "#EC4899" },
];

export const testimonials = [
  { id: "te1", name: "Jennifer Walsh", role: "Dog Mom of 2", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", content: "PetZoo has completely transformed how I manage my dogs' health. The vaccination reminders, vet booking system and AI chat have saved me so much time and worry. Absolutely love this platform!", rating: 5, pet: "Golden Retrievers", location: "New York, NY" },
  { id: "te2", name: "Marcus Thompson", role: "Veterinarian", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", content: "The vet dashboard is incredibly intuitive. Managing appointments, uploading prescriptions and following up with patients has never been easier. My productivity increased 40% since joining PetZoo.", rating: 5, pet: "", location: "Chicago, IL" },
  { id: "te3", name: "Priya Patel", role: "Cat Parent", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", content: "I was skeptical at first but PetZoo's AI health assistant accurately identified my cat's skin condition before I even saw the vet. The telemedicine feature is a game changer for busy pet parents!", rating: 5, pet: "Persian Cats", location: "Los Angeles, CA" },
  { id: "te4", name: "Robert Chen", role: "Pet Store Owner", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Running my pet store through PetZoo's vendor platform has doubled my online sales. The inventory management, order tracking and customer analytics are enterprise-grade. Worth every penny!", rating: 5, pet: "", location: "San Francisco, CA" },
  { id: "te5", name: "Amanda Foster", role: "Shelter Manager", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100", content: "Our adoption rates jumped 60% after listing on PetZoo. The adoption application management and foster program tools are exceptional. We've found loving homes for over 200 animals through this platform!", rating: 5, pet: "", location: "Austin, TX" },
  { id: "te6", name: "Kevin Park", role: "Dog Trainer", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100", content: "PetZoo's trainer platform lets me manage all my programs, track client progress and handle payments seamlessly. The virtual training feature opened up a whole new revenue stream for my business.", rating: 5, pet: "", location: "Miami, FL" },
];

export const mockMedicalReports = [
  { id: "mr1", petName: "Max", title: "Annual Blood Panel Report", date: "2024-12-28", vet: "Dr. Sarah Johnson", summary: "All values within normal range.", status: "normal" },
  { id: "mr2", petName: "Luna", title: "Respiratory Assessment", date: "2024-12-20", vet: "Dr. Michael Chen", summary: "Mild asthma confirmed.", status: "attention" },
];

export const faqData = [
  { id: "f1", question: "How do I create a pet profile on PetZoo?", answer: "After registering, navigate to 'My Pets' in your dashboard and click 'Add New Pet'. Fill in your pet's details including name, breed, age, and upload a photo. You can add as many pets as your plan allows.", category: "Getting Started" },
  { id: "f2", question: "Is my pet's health data secure on PetZoo?", answer: "Absolutely. We use bank-grade AES-256 encryption for all health records. Your data is stored on SOC 2 compliant servers, never sold to third parties, and you maintain full ownership and control.", category: "Security" },
  { id: "f3", question: "How does the telemedicine consultation work?", answer: "After booking a telemedicine appointment, you'll receive a secure video link. Connect with a licensed vet from your home via HD video, share photos/videos of symptoms, and receive prescriptions digitally.", category: "Veterinary" },
  { id: "f4", question: "Can I cancel my membership plan?", answer: "Yes, you can cancel anytime from your Settings > Membership page. You'll retain access until the end of your billing period. We offer a 30-day money-back guarantee for all paid plans.", category: "Billing" },
  { id: "f5", question: "How does pet adoption work on PetZoo?", answer: "Browse available pets, click on any pet to view details and then submit an adoption application. The shelter reviews your application, may schedule a meet & greet, and if approved, coordinates the adoption process.", category: "Adoption" },
  { id: "f6", question: "What is the AI Pet Care Assistant?", answer: "Our AI assistant, powered by advanced language models, helps with symptom assessment, nutrition advice, breed-specific guidance and emergency care instructions. It's available 24/7 but doesn't replace professional veterinary care.", category: "AI Features" },
  { id: "f7", question: "How do I book a grooming appointment?", answer: "Go to the Grooming section, select your preferred service, choose a date and time, and select a groomer near you. You'll receive confirmation and reminders before your appointment.", category: "Services" },
  { id: "f8", question: "Can multiple family members access the same pet profile?", answer: "Yes! With the Premium Guardian and higher plans, you can invite family members to co-manage your pets. Each member gets their own login while sharing access to the same pet profiles and records.", category: "Account" },
];
