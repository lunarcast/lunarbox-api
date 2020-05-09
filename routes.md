# Routes for the API

## Users

### Get current user

`GET /api/users/`

Returns the current logged-in user's: `email`, `username` and admin(`isAdmin`) status, all within an `user` object.

### Create an user account

`POST /api/users/`

```json
{
    "email": "ilovefp@lunarbox.com",
    "username": "HaskellEnthusiast",
    "password": "ThisIsAStrongPassword39"
}
```

#### JSON Params

|  Field   |  Type  | Note                                                                                |
| :------: | :----: | ----------------------------------------------------------------------------------- |
|  email   | string | Must be a valid email adress                                                        |
| username | string | Must be at least two characters long and at most 32 characters long; must be unique |
| password | string | Must contain at least one uppercase letter, one lowercase letter and one digiit     |

Creates an user, and immediately logs in the requesting client.

### Delete an user account

`DELETE /api/users/`

Deletes the currently logged-in account.
