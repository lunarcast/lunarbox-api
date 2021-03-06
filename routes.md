# Routes for the API

## Users

### Get current user

`GET /api/users/`

Returns the current logged-in user's: `email`, `username`, and admin(`isAdmin`) status, all within an `user` object.

### Create an user account

`POST /api/users/`

```json
{
    "email": "ilovefp@lunarbox.com",
    "username": "HaskellEnthusiast",
    "password": "ThisIsAStrongPassword39"
}
```

#### JSON Params of Request

|  Field   |  Type  | Note                                                                                |
| :------: | :----: | ----------------------------------------------------------------------------------- |
|  email   | string | Must be a valid email adress                                                        |
| username | string | Must be at least two characters long and at most 32 characters long; must be unique |
| password | string | Must contain at least one uppercase letter, one lowercase letter and one digiit     |

Creates an user, and immediately logs in the requesting client.

### Delete an user account

`DELETE /api/users/`

Deletes the currently logged-in account.

## Auth

### Log-in

`POST /api/auth/login/`

```json
{
    "email": "ilovefp@lunarbox.com",
    "password": "ThisIsAStrongPassword39"
}
```

#### JSON Params of Request

|  Field   |  Type  | Note                         |
| :------: | :----: | ---------------------------- |
|  email   | string | Must be a valid email adress |
| password | string |                              |

Logs-in the requesting client to the user with the specified e-mail.

### Log-out

`GET /api/auth/logout/`

Logs-out the currently logged-in user.

## Projects

### Get the current user's projects

`GET /api/projects/`

```json
{
    "userProjects": [
        {
            "id": 14,
            "name": "My first project",
            "metadata": {
                "functionCount": 1,
                "nodeCount": 3
            }
        },
        {
            "id": 17,
            "name": "Yay for FP",
            "metadata": {
                "functionCount": 3,
                "nodeCount": 12
            }
        }
    ],
    "exampleProjects": [
        {
            "id": 5,
            "name": "Average",
            "metadata": {
                "functionCount": 2,
                "nodeCount": 10
            }
        }
    ]
}
```

#### JSON Params of Response

The Project type is as follows:

|  Field   |   Type   | Note |
| :------: | :------: | ---- |
|    id    |  number  |      |
|   name   |  string  |      |
| metadata | Metadata |      |

The Metadata type is as follows:

|     Field     |  Type  | Note |
| :-----------: | :----: | ---- |
| functionCount | number |      |
|   nodeCount   | number |      |

Returns the current logged-in user's projects and the example projects in the arrays named `userProjects` and `exampleProjects`, respectively.

The response will be made up of two arrays of elements of the type `Project`

### Get a specific project

> Note: the user must be the owner of the project

> Note: The ProjectData type is yet to be documented

`GET /api/projects/:id/`

```json
{
    "id": 5,
    "owner": 1,
    "name": "Average",
    "isExample": true,
    "project": {
        "comment": "This has yet to be documented"
    },
    "metadata": {
        "functionCount": 2,
        "nodeCount": 10
    }
}
```

#### JSON Params of Response

The Project type is as follows:

|   Field   |    Type     | Note                           |
| :-------: | :---------: | ------------------------------ |
|    id     |   number    |                                |
|   owner   |   number    | ID of the owner of the project |
|   name    |   string    |                                |
| isExample |   boolean   |                                |
|  project  | ProjectData |                                |
| metadata  |  Metadata   |                                |

The Metadata type is as follows:

|     Field     |  Type  | Note |
| :-----------: | :----: | ---- |
| functionCount | number |      |
|   nodeCount   | number |      |

The `id` parameter must be of type `number`!

Returns a specific project of type `Project`, including its graph/saveData in the `project` field.

### Clone a project

> Note: the project must be an example

`GET /api/projects/:id/`

```json
{
    "status": 201,
    "message": "Successfully cloned",
    "project": {
        "id": 33
    }
}
```

#### JSON Params of Response

| Field |  Type  | Note                            |
| :---: | :----: | ------------------------------- |
|  id   | number | ID of the newly created project |

The `id` parameter must be of type `number`!

Clones an example project, appends `- clone` to its name, and sets the owner to the id of the requesting client.

### Create a project

`POST /api/projects/`

> Note: to create a project with `isExample` true, one must be an admin

> Note: The ProjectData type is yet to be documented

```json
{
    "name": "My first project",
    "isExample": false,
    "project": {
        "comment": "This has yet to be documented"
    },
    "metadata": {
        "functionCount": 1,
        "nodeCount": 3
    }
}
```

#### JSON Params of Request

|    Field    |    Type     | Note                                            |
| :---------: | :---------: | ----------------------------------------------- |
|    name     |   string    |                                                 |
| description |   string?   | This has not yet been implemented in the client |
|  isExample  |   boolean   |                                                 |
|   project   | ProjectData |                                                 |
|  metadata   |  Metadata   |                                                 |

The Metadata type is as follows:

|     Field     |  Type  | Note |
| :-----------: | :----: | ---- |
| functionCount | number |      |
|   nodeCount   | number |      |

Creates a new project.

### Save a project

`PUT /api/projects/:id/`

> Note: to save a project with `isExample` true, one must be an admin

> Note: The ProjectData type is yet to be documented

```json
{
    "name": "My first project",
    "isExample": false,
    "project": {
        "comment": "This has yet to be documented"
    },
    "metadata": {
        "functionCount": 1,
        "nodeCount": 3
    }
}
```

#### JSON Params of Request

|    Field    |    Type     | Note                                            |
| :---------: | :---------: | ----------------------------------------------- |
|    name     |   string    |                                                 |
| description |   string?   | This has not yet been implemented in the client |
|  isExample  |   boolean   |                                                 |
|   project   | ProjectData |                                                 |
|  metadata   |  Metadata   |                                                 |

The Metadata type is as follows:

|     Field     |  Type  | Note |
| :-----------: | :----: | ---- |
| functionCount | number |      |
|   nodeCount   | number |      |

The `id` parameter must be of type `number`!

Saves/updates a specific project.

### Delete a specific project

> Note: the user must be the owner of the project

`DELETE /api/projects/:id/`

The `id` parameter must be of type `number`!

Deletes a specific project.
