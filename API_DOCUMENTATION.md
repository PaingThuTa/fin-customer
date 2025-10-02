# Customer API Documentation

This document describes the CRUD API endpoints for the Customer resource.

## Base URL
All API endpoints are prefixed with the base path: `/fin-customer/api`

---

## 1. List All Customers

**Description:** Retrieve a list of all customers, sorted by member number in ascending order.

**Route:** `GET /fin-customer/api/customer`

**Payload (body):** `-`

**Query Parameters (optional):**
- `s` (string) - Search customers by name (case-insensitive partial match)

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1,
    "interests": "movies, football, gym"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "dateOfBirth": "1985-08-22T00:00:00.000Z",
    "memberNumber": 2,
    "interests": "gaming, reading"
  }
]
```

**File:** `/app/api/customer/route.js`

**Test:**
```bash
# List all customers
curl http://localhost:3000/fin-customer/api/customer

# Search customers by name
curl http://localhost:3000/fin-customer/api/customer?s=john
```

---

## 2. Get Single Customer

**Description:** Retrieve details of a specific customer by ID.

**Route:** `GET /fin-customer/api/customer/:id`

**Payload (body):** `-`

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym"
}
```

**File:** `/app/api/customer/[id]/route.js`

**Test:**
```bash
curl http://localhost:3000/fin-customer/api/customer/507f1f77bcf86cd799439011
```

---

## 3. Create Customer

**Description:** Create a new customer.

**Route:** `POST /fin-customer/api/customer`

**Payload (body):**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-05-15",
  "memberNumber": 1,
  "interests": "movies, football, gym"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym"
}
```

**File:** `/app/api/customer/route.js`

**Test:**
```bash
curl -X POST http://localhost:3000/fin-customer/api/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dateOfBirth": "1990-05-15",
    "memberNumber": 1,
    "interests": "movies, football, gym"
  }'
```

---

## 4. Update Customer

**Description:** Update an existing customer by ID.

**Route:** `PUT /fin-customer/api/customer`

**Payload (body):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe Updated",
  "dateOfBirth": "1990-05-15",
  "memberNumber": 1,
  "interests": "movies, football, gym, reading"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe Updated",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym, reading"
}
```

**File:** `/app/api/customer/route.js`

**Test:**
```bash
curl -X PUT http://localhost:3000/fin-customer/api/customer \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    "dateOfBirth": "1990-05-15",
    "memberNumber": 1,
    "interests": "movies, football, gym, reading"
  }'
```

---

## 5. Delete Customer

**Description:** Delete a customer by ID.

**Route:** `DELETE /fin-customer/api/customer/:id`

**Payload (body):** `-`

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym"
}
```

**File:** `/app/api/customer/[id]/route.js`

**Test:**
```bash
curl -X DELETE http://localhost:3000/fin-customer/api/customer/507f1f77bcf86cd799439011
```

---

## Data Model

### Customer Schema
```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  memberNumber: Number (required),
  interests: String (required)
}
```

## Notes
- All endpoints automatically connect to MongoDB via the instrumentation hook
- Dates are stored in ISO 8601 format
- Search functionality uses case-insensitive regex matching
- Member numbers are used for default sorting
