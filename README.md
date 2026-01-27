# Coffee Shop

A full-stack coffee shop application built with Go (Gin) backend and React (TypeScript) frontend.

## Features

- Browse coffee beans catalog
- View detailed information about each coffee bean
- Add new coffee beans
- Purchase coffee beans

## Tech Stack

### Backend
- **Go 1.25.4** - Programming language
- **Gin** - HTTP web framework
- **PostgreSQL** - Database
- **lib/pq** - PostgreSQL driver

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **TanStack Query** - Data fetching and caching

## Project Structure

```
coffee-shop/
├── endpoints/          # API endpoint handlers
│   └── beans.go
├── models/             # Data models
│   ├── beans.go
│   └── coffee.go
├── repositories/       # Data access layer
│   ├── bean_repository.go
│   └── coffee-repository.go
├── web/                # Frontend React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── models/     # TypeScript models
│   └── package.json
├── main.go             # Backend entry point
└── go.mod              # Go dependencies
```

## Prerequisites

- Go 1.25.4 or higher
- Node.js and npm (for frontend)
- PostgreSQL database

## Setup

### Database Setup

1. Create a PostgreSQL database named `coffee`:
```sql
CREATE DATABASE coffee;
```

2. Create the beans table:
```sql
CREATE TABLE Beans (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);
```

### Backend Setup

1. Install Go dependencies:
```bash
go mod download
```

2. Update the database connection string in `main.go` if needed:
```go
db, err := sql.Open("postgres", "user=postgres password=YOUR_PASSWORD dbname=coffee sslmode=disable")
```

3. Run the backend server:
```bash
go run main.go
```

The backend will start on `http://127.0.0.1:8080`

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns)

## API Endpoints

### Beans

- `GET /beans` - Get all coffee beans
- `GET /beans/:id` - Get a specific coffee bean by ID
- `POST /beans` - Add a new coffee bean
- `POST /beans/:id/purchase` - Purchase a coffee bean

## Development

### Running the Full Stack

1. Start PostgreSQL database
2. Run the Go backend: `go run main.go`
3. In a separate terminal, run the frontend dev server: `cd web && npm run dev`

The backend serves the built frontend from `web/dist` when running in production mode. For development, run both servers separately.

## License

MIT
