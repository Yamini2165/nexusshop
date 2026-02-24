import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

const users = [
  {
    name: 'Admin User',
    email: 'admin@shop.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

const products = (adminId) => [
  {
    name: 'Apple AirPods Pro (2nd Gen)',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500',
    description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.',
    brand: 'Apple', category: 'Electronics',
    price: 249.99, countInStock: 50,
    rating: 4.8, numReviews: 156, isFeatured: true, user: adminId,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Industry-leading noise canceling, 30-hour battery life.',
    brand: 'Sony', category: 'Electronics',
    price: 349.99, countInStock: 30,
    rating: 4.9, numReviews: 89, isFeatured: true, user: adminId,
  },
  {
    name: 'MacBook Pro 14" M3 Pro',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    description: 'Apple M3 Pro chip, 18GB unified memory, 1TB SSD.',
    brand: 'Apple', category: 'Electronics',
    price: 1999.99, countInStock: 15,
    rating: 4.9, numReviews: 43, isFeatured: true, user: adminId,
  },
  {
    name: 'Nike Air Max 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Lifestyle sneaker with the largest Max Air unit ever.',
    brand: 'Nike', category: 'Clothing',
    price: 149.99, countInStock: 75,
    rating: 4.6, numReviews: 201, isFeatured: true, user: adminId,
  },
  {
    name: 'The Pragmatic Programmer',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    description: 'Your journey to mastery. 20th Anniversary Edition.',
    brand: 'Addison-Wesley', category: 'Books',
    price: 49.99, countInStock: 100,
    rating: 4.8, numReviews: 378, user: adminId,
  },
  {
    name: 'Garmin Forerunner 965',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    description: 'Premium GPS running smartwatch with AMOLED display.',
    brand: 'Garmin', category: 'Sports',
    price: 599.99, countInStock: 25,
    rating: 4.8, numReviews: 92, isFeatured: true, user: adminId,
  },
];

// GET /api/seed
router.get('/', async (req, res) => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find((u) => u.isAdmin);
    await Product.create(products(adminUser._id));

    res.json({ message: '✅ Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;