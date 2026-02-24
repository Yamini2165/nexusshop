<<<<<<< HEAD
# 🛍️ NexusShop — Full-Stack MERN E-Commerce Platform

A production-ready e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring JWT authentication, Redux state management, and a polished dark-mode UI.

---

## 📦 Project Structure

```
ecommerce/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic (register/login/profile)
│   │   ├── productController.js # Product CRUD + search
│   │   └── orderController.js  # Order management
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT protect + admin guard
│   │   └── errorMiddleware.js  # Global error handler
│   ├── models/
│   │   ├── User.js             # User schema (bcrypt hashing)
│   │   ├── Product.js          # Product schema with reviews
│   │   └── Order.js            # Order schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   ├── seeder.js               # Sample data seeder
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + Redux
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js        # Navigation with cart badge
    │   │   ├── ProductCard.js   # Product listing card
    │   │   ├── UI.js            # Shared: Loader, Message, Rating, CheckoutSteps
    │   │   ├── Footer.js
    │   │   ├── PrivateRoute.js  # Auth route guard
    │   │   └── AdminRoute.js    # Admin route guard
    │   ├── pages/
    │   │   ├── HomePage.js      # Product catalog with search/filter
    │   │   ├── ProductPage.js   # Product detail + reviews
    │   │   ├── CartPage.js      # Shopping cart
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── ShippingPage.js  # Checkout step 2
    │   │   ├── PaymentPage.js   # Checkout step 3
    │   │   ├── PlaceOrderPage.js # Checkout step 4
    │   │   ├── OrderPage.js     # Order detail + payment sim
    │   │   ├── ProfilePage.js   # User profile editor
    │   │   ├── MyOrdersPage.js  # Order history
    │   │   └── admin/
    │   │       ├── AdminDashboard.js  # Stats overview
    │   │       ├── AdminProducts.js   # Product management table
    │   │       ├── AdminProductEdit.js # Create/edit product form
    │   │       └── AdminOrders.js     # Order management table
    │   ├── redux/
    │   │   ├── store.js
    │   │   └── slices/
    │   │       ├── authSlice.js  # User auth state
    │   │       └── cartSlice.js  # Cart with localStorage
    │   ├── utils/
    │   │   └── api.js           # Axios instance with interceptors
    │   ├── App.js               # Router + route definitions
    │   └── index.css            # Tailwind + custom styles
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce    # or your MongoDB Atlas URI
JWT_SECRET=your_very_secret_key_here_min_32_chars
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### 3. Seed Sample Data

```bash
cd backend
node seeder.js
```

This creates:
- **Admin:** `admin@shop.com` / `admin123`
- **User:** `jane@example.com` / `password123`
- 8 sample products across multiple categories

### 4. Run Development Servers

```bash
# Terminal 1: Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Frontend (http://localhost:3000)
cd frontend
npm start
```

---

## 🔑 Key Features

### Authentication
- JWT-based auth with 30-day token expiry
- Bcrypt password hashing (12 salt rounds)
- Persistent sessions via localStorage
- Auto-redirect on token expiry (401 interceptor)

### Product Catalog
- Full-text search across name, description, brand
- Category filtering with sidebar navigation
- Sort by: newest, price asc/desc, rating
- Pagination with configurable page size
- Product reviews with star ratings

### Shopping Cart
- Persistent cart via Redux + localStorage
- Real-time price calculation (subtotal + tax + shipping)
- Free shipping threshold ($100+)
- Stock validation on add

### Checkout Flow (4 steps)
1. **Cart** → Review items
2. **Shipping** → Enter delivery address
3. **Payment** → Choose payment method
4. **Place Order** → Review & confirm

### Admin Dashboard
- Revenue and order statistics
- Product management (CRUD with image upload)
- Order management with status updates
- Mark orders as delivered

---

## 📡 API Reference

### Auth Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Create account |
| POST | `/login` | Public | Login + get JWT |
| GET | `/profile` | Private | Get current user |
| PUT | `/profile` | Private | Update profile |
| GET | `/users` | Admin | List all users |
| DELETE | `/users/:id` | Admin | Delete user |

### Product Routes (`/api/products`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get products (search/filter/paginate) |
| GET | `/:id` | Public | Get single product |
| GET | `/featured` | Public | Get featured products |
| GET | `/categories` | Public | Get all categories |
| POST | `/` | Admin | Create product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |
| POST | `/:id/reviews` | Private | Add review |

### Order Routes (`/api/orders`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Private | Create order |
| GET | `/my-orders` | Private | Get user's orders |
| GET | `/:id` | Private | Get order by ID |
| PUT | `/:id/pay` | Private | Mark as paid |
| GET | `/` | Admin | Get all orders |
| PUT | `/:id/deliver` | Admin | Mark as delivered |
| PUT | `/:id/status` | Admin | Update status |
| GET | `/admin/stats` | Admin | Dashboard stats |

---

## 🛡️ Security Features

- JWT tokens with configurable expiry
- Bcrypt password hashing (12 rounds)
- Protected routes (middleware-based)
- Admin role verification
- Input validation on all routes
- Error messages don't expose internals in production
- CORS configured for specific origins

---

## 🧪 Destroying Sample Data

```bash
cd backend
node seeder.js -d
```

---

## 🐳 Production Deployment Notes

1. Set `NODE_ENV=production` in environment
2. Use MongoDB Atlas for cloud database
3. Set strong `JWT_SECRET` (32+ chars)
4. Build React app: `cd frontend && npm run build`
5. Serve static build from Express in production
6. Use HTTPS and set appropriate CORS origins

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + React Router v6 |
| State | Redux Toolkit |
| Styling | Tailwind CSS + Custom Design System |
| HTTP | Axios with interceptors |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT + Bcrypt |
| Uploads | Multer |
| Dev | Nodemon, React Scripts |
=======
# nexusshop
>>>>>>> 5dee67c880694ca03738fcda103822e0fedcaa53
