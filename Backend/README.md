# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. This endpoint validates the input, hashes the password, creates a captain with vehicle details, and returns an authentication token along with the captain data.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (one of: car, bike, auto, required)"
  }
}
```

### Example

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

## Error Responses

- **Status:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```
- **Status:** `400 Bad Request` (if captain already exists)
  ```json
  {
    "error": "Captain already exists"
  }
  ```
- **Status:** `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

---

**Note:**

- All fields are required.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
- Vehicle type must be one of: `car`, `bike`, or `auto`.

````<!-- filepath: c:\Users\Nisarg\Desktop\Uber clone\Backend\README.md -->

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. This endpoint validates the input, hashes the password, creates a captain with vehicle details, and returns an authentication token along with the captain data.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (one of: car, bike, auto, required)"
  }
}
````

### Example

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
   token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

## Error Responses

- **Status:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```
- **Status:** `400 Bad Request` (if captain already exists)
  ```json
  {
    "error": "Captain already exists"
  }
  ```
- **Status:** `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

---

**Note:**

- All fields are required.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
- Vehicle type must be

---

# Captain Endpoints Documentation

## Login Captain

### Endpoint

`POST /captains/login`

### Description

Authenticates a captain with email and password. Returns a JWT token and captain data if credentials are valid.

### Request Body

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}
```

### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

### Error Responses

- **Status:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Email must be a valid email address",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
- **Status:** `401 Unauthorized`
  ```json
  {
    "error": "Invalid credentials"
  }
  ```
- **Status:** `500 Internal Server Error`
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

---

## Captain Profile

### Endpoint

`GET /captains/profile`

### Description

Returns the authenticated captain's profile information. Requires a valid JWT token.

### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

### Error Responses

- **Status:** `401 Unauthorized`
  ```json
  {
    "error": "Authentication required"
  }
  ```
- **Status:** `404 Not Found`
  ```json
  {
    "error": "Captain not found"
  }
  ```

---

## Captain Logout

### Endpoint

`GET /captains/logout`

### Description

Logs out the authenticated captain by invalidating the JWT token and clearing the authentication cookie. Requires a valid JWT token.

### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Error Responses

- **Status:** `401 Unauthorized`
  ```json
  {
    "error": "Authentication required"
  }
  ```

---

**Note:**

- All fields are required for registration.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
- Vehicle type must be one of: `car`,
