# API Documentation

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://api.cartora.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-07T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User

**GET** `/auth/me`

Get currently authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Product Endpoints

### Get All Products

**GET** `/products`

Retrieve all products with optional filtering and pagination.

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)
- `category` (string) - Filter by category
- `search` (string) - Search in name and description
- `sort` (string) - Sort field (default: -createdAt)

**Example:** `/products?page=1&limit=10&category=Electronics`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones",
      "price": 99.99,
      "category": "Electronics",
      "stock": 50,
      "sku": "WH-001",
      "rating": 4.5,
      "reviewCount": 120,
      "createdAt": "2024-01-07T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

### Get Single Product

**GET** `/products/:id`

Retrieve a specific product by ID.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    ...
  }
}
```

### Create Product

**POST** `/products`

Create a new product (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "category": "Electronics",
  "stock": 100,
  "sku": "NP-001"
}
```

**Response:** `201 Created`

### Update Product

**PUT** `/products/:id`

Update an existing product (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`

### Delete Product

**DELETE** `/products/:id`

Delete a product (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`

---

## User Management Endpoints

### Get All Users

**GET** `/users`

Get all users (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`

### Get Single User

**GET** `/users/:id`

Get user by ID (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`

### Update User

**PUT** `/users/:id`

Update user information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Response:** `200 OK`

### Delete User

**DELETE** `/users/:id`

Delete a user (Admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Rate Limiting

API requests are rate-limited to prevent abuse:
- **Unauthenticated**: 100 requests/hour
- **Authenticated**: 1000 requests/hour
- **Admin**: 5000 requests/hour

---

## Django Admin API

Base URL: `http://localhost:8000/api`

### Get Reports

**GET** `/reports`

Retrieve all generated reports (Admin only).

### Generate Sales Report

**POST** `/reports/generate_sales`

Trigger sales report generation.

**Response:** `202 Accepted`
```json
{
  "message": "Sales report generation started",
  "task_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### Generate Inventory Report

**POST** `/reports/generate_inventory`

Trigger inventory report generation.

### Get Job Logs

**GET** `/job-logs?status=completed`

View background job execution logs.
