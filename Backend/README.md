# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

## Example Responses

{
"token": "<jwt_token>",
"user": {
"\_id": "<user_id>",
"fullname": {
"firstname": "John",
"lastname": "Doe"
},
"email": "john.doe@example.com"
// ...other user fields
}
}

```

## Notes

- All fields are required.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
```
