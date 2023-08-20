# WIP Spring API Application

This project consists of a Spring Boot application (backend) with a RESTful API and an Angular application (frontend).

## Pre-requisites
- Java 17
- Maven
- Node.js
- Angular CLI

## Structure
```
.
├── pom.xml
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── example
│       │           └── scoottododemo
│       └── resources
└── TodoUI
    ├── angular.json
    ├── package.json
    └── src
        └── app
```

The Spring Boot application is in the `src/main/java` directory, and the Angular application is in the `TodoUI` directory.

## Getting Started

### Backend

1. Navigate to the root directory of the project, where the `pom.xml` file resides.

2. To compile the Spring Boot application, run the following command:

```bash
mvn clean install
```

3. To start the Spring Boot application, run the following command:

```bash
mvn spring-boot:run
```

The Spring Boot application will start, and by default, it will run on port 8080.

### Frontend

1. Navigate to the `TodoUI` directory.

2. Install the dependencies:

```bash
npm install
```

3. Start the Angular application:

```bash
ng serve
```

The Angular application will start, and by default, it will run on port 4200.

## API Endpoints

The following API endpoints are available:

- `GET /api/todos/`: Returns all TodoItems.
- `GET /api/todos/{id}`: Returns a specific TodoItem based on the provided ID.
- `POST /api/todos/`: Creates a new TodoItem.
- `PUT /api/todos/{id}`: Updates a specific TodoItem based on the provided ID.
- `DELETE /api/todos/{id}`: Deletes a specific TodoItem based on the provided ID.
- `GET /api/todos/search`: Searches for TodoItems based on description or priority.

## Accessing the Application

Once both applications are running, you can access the Angular application in a web browser at `http://localhost:4200`.

The RESTful API can be accessed through `http://localhost:8080/api/todos/`.
