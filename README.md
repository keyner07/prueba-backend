# Prueba backend

Esto es una prueba donde desarrolle una api de carros. Usando nodejs, express y mysql.

## Instalacion

`yarn install`

## Run the app

`yarn run start`

Si tiene instalado en su computador mysql solo tendra que correr el script de arriba. Al correr este comando automaticamente se le poblaran la base de datos con algunos rows para su prueba.

# REST API

Endpoint detallados abajo.

## Create user and dealer

### Request

`POST /api/create`

    'Accept: application/json' http://localhost:3000/api/create

    {
        "name": "Keyner Baez",
        "email": "skerling1@hotmail.com",
        "password": "1234",
        "age": 21,
        "dealer": "CleanerStudio",
        "addressDealer": "C/ 27 de Febrero 250"
    }

### Response

    HTTP/1.1 201 Created
    Content-Type: application/json

    {
        "message": "User created."
    }

## Login User

### Request

`GET /api/login`

    'Accept: application/json' http://localhost:3000/api/login

    {
        "email": "skerling1@hotmail.com",
        "password": "1234"
    }

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVzZXIiLCJpYXQiOjE2MTYxNzE5NDksImV4cCI6MTY0NzcyOTU0OX0.bznYKH4q_QWc63MJAp5m1dibHeFFjqO9SCs4S7lw85Y",
        "user": {
            "id": 1,
            "name": "Skerling Baez",
            "email": "skerling19@hotmail.com"
        }
    }

## Edit user

### Request

`PUT /api/edit`

    'Accept: application/json' http://localhost:3000/api/edit

    {
        "name": "Skerling Baez"
    }

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "message": "Edited user."
    }


## Create car

### Request

`POST /api/cars`

    'Accept: application/json' http://localhost:3000/api/cars

    {
        "name": "BMW",
        "year": 2021,
        "color": "Gris"
    }

### Response

    HTTP/1.1 201 CREATED
    Content-Type: application/json

    {
        "message": "Created car."
    }

## Show car by id

### Request

`GET /api/cars/:id`

    'Accept: application/json' http://localhost:3000/api/cars/:id

    {}

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "id": 2,
        "createdAt": "2021-03-19T07:15:33.934Z",
        "name": "BMW",
        "year": 2021,
        "color": "Amarrillo",
        "user": {
            "id": 1,
            "name": "Skerling Baez",
            "age": 21,
            "email": "skerling19@hotmail.com",
            "dealer": {
                "id": 1,
                "name": "CleanerStudio",
                "address": "C/ 27 de Febrero 250"
            }
        }
    }

## Delete car by id

### Request

`DELETE /api/cars/:id`

    'Accept: application/json' http://localhost:3000/api/cars/:id

    {}

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "message": "Deleted car."
    }

## Edit car by id

### Request

`PUT /api/cars/:id`

    'Accept: application/json' http://localhost:3000/api/cars/:id

    {
        "color": "Amarrillo"
    }

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    { message: 'Edited car.' }

## Get cars

### Request

`GET /api/cars`\
`GET /api/cars?search=b`\
Search es para buscar ya sea por nombre o color del carro.

    'Accept: application/json' http://localhost:3000/api/edit

    {}

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    [
        {
            "id": 44,
            "createdAt": "2021-03-19T20:35:30.728Z",
            "name": "Bugatti Challenger",
            "year": 2011,
            "color": "azure",
            "user": {
                "id": 48,
                "name": "Gertrude McKenzie",
                "age": 58,
                "email": "Daryl_Dicki74@yahoo.com",
                "dealer": {
                    "id": 43,
                    "name": "Russel - Beer",
                    "address": "37459 Brayan Mill"
                }
            }
        },
        {
            "id": 42,
            "createdAt": "2021-03-19T20:35:30.028Z",
            "name": "Mercedes Benz Mercielago",
            "year": 2009,
            "color": "white",
            "user": {
                "id": 46,
                "name": "Gloria Abshire",
                "age": 56,
                "email": "Romaine99@gmail.com",
                "dealer": {
                    "id": 41,
                    "name": "VonRueden, Wiza and Kuhic",
                    "address": "5122 Moriah Tunnel"
                }
            }
        }
    ]