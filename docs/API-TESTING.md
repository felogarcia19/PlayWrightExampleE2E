# API Testing & Automation Guide 🔬

## Overview

API testing involves automating tests for REST and GraphQL endpoints, validating requests, responses, and integration flows.

**Location:** `/api-testing/`

---

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn
- REST client (Postman, Insomnia) or command line tools (curl, HTTPie)
- Basic understanding of HTTP methods (GET, POST, PUT, DELETE, etc.)

---

## 🚀 Setup Instructions

### 1. Navigate to API Testing Directory
```bash
cd api-testing
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env` file in the api-testing directory:
```
BASE_URL=https://api.example.com
API_KEY=your_api_key_here
AUTH_TOKEN=your_auth_token_here
```

---

## 📁 Project Structure

```
api-testing/
├── tests/                    # API test files
│   ├── rest/                # REST API tests
│   ├── graphql/             # GraphQL tests
│   └── integration/         # Integration tests
├── requests/                 # API request definitions
├── fixtures/                 # Test data & mocks
├── utils/                    # Helper functions
├── config/                   # Configuration files
├── package.json
└── README.md
```

---

## 🏃 Running Tests

### Run All API Tests
```bash
npm test
```

### Run REST Tests Only
```bash
npm test -- tests/rest
```

### Run GraphQL Tests Only
```bash
npm test -- tests/graphql
```

### Run Integration Tests
```bash
npm test -- tests/integration
```

### Run with Verbose Output
```bash
npm test -- --verbose
```

### Generate Coverage Report
```bash
npm test -- --coverage
```

---

## 📚 API Testing Patterns

### 1. **REST API Testing**

#### GET Request
```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.example.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'has users': (r) => r.json('users').length > 0,
  });
}
```

#### POST Request
```javascript
const payload = JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com',
});

const res = http.post('https://api.example.com/users', payload, {
  headers: { 'Content-Type': 'application/json' },
});
```

### 2. **GraphQL Testing**

```javascript
const query = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const res = http.post('https://api.example.com/graphql', 
  JSON.stringify({ query, variables: { id: '123' } })
);
```

### 3. **Authentication Testing**

```javascript
const loginRes = http.post('https://api.example.com/login', 
  JSON.stringify({ username: 'user', password: 'pass' })
);

const token = loginRes.json('token');

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const res = http.get('https://api.example.com/profile', { headers });
```

---

## 🔍 Request/Response Validation

### Status Code Validation
```javascript
check(res, {
  'status is 200': (r) => r.status === 200,
  'status is not 500': (r) => r.status !== 500,
});
```

### Response Body Validation
```javascript
check(res, {
  'has correct name': (r) => r.json('user.name') === 'John',
  'has valid email': (r) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.json('user.email')),
});
```

### Response Headers Validation
```javascript
check(res, {
  'has content-type': (r) => r.headers['Content-Type'] !== undefined,
  'is json': (r) => r.headers['Content-Type'].includes('application/json'),
});
```

---

## 📖 Resources

- [K6 HTTP API](https://k6.io/docs/javascript-api/k6-http/)
- [REST API Testing Guide](https://restfulapi.net/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [API Testing Tools Comparison](https://www.postman.com/)

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [Playwright E2E Testing](./PLAYWRIGHT.md)
- [K6 Performance Testing](./K6.md)