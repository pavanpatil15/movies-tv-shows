# 🎬 Favorite Movies & TV Shows Manager

A full-stack web application for managing your favorite movies and TV shows with infinite scrolling, built with React, TypeScript, Node.js, Express, and MySQL.

## ✨ Features

- ➕ Add new movies and TV shows
- 📋 View all entries in a responsive table
- ✏️ Edit existing entries
- 🗑️ Delete entries with confirmation
- ♾️ Infinite scroll pagination
- 🎨 Modern UI with TailwindCSS
- ✅ Form validation
- 📱 Fully responsive design

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- Axios (HTTP client)
- Lucide React (Icons)

### Backend
- Node.js & Express
- TypeScript
- Prisma ORM
- Zod (Schema validation)
- MySQL Database

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd movies-tv-shows-manager
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MySQL credentials
# DATABASE_URL="mysql://username:password@localhost:3306/movies_db"
```

#### Create MySQL Database

```sql
CREATE DATABASE movies_db;
```

#### Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

#### Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env if needed (default: http://localhost:5000/api)
```

#### Start Frontend Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── controllers/
│   │   │   └── entry.controller.ts
│   │   ├── routes/
│   │   │   └── entry.routes.ts
│   │   ├── validators/
│   │   │   └── entry.validator.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EntriesTable.tsx
    │   │   ├── EntryForm.tsx
    │   │   └── DeleteModal.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── index.html
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/entries?page=1&limit=20` | Get paginated entries |
| GET | `/api/entries/:id` | Get single entry |
| POST | `/api/entries` | Create new entry |
| PUT | `/api/entries/:id` | Update entry |
| DELETE | `/api/entries/:id` | Delete entry |

### Sample Request Body (POST/PUT)

```json
{
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": "$160M",
  "location": "LA, Paris",
  "duration": "148 min",
  "yearTime": "2010"
}
```

## 🎯 Usage

1. **Add Entry**: Click "Add New Entry" button to open the form
2. **Edit Entry**: Click the edit icon (pencil) on any row
3. **Delete Entry**: Click the delete icon (trash) and confirm
4. **Infinite Scroll**: Scroll down to automatically load more entries

## 🧪 Testing

### Test with Sample Data

After seeding the database, you should see 8 sample entries including:
- Inception
- Breaking Bad
- The Dark Knight
- Stranger Things
- And more...

### Manual Testing Checklist

- [ ] Add a new movie
- [ ] Add a new TV show
- [ ] Edit an existing entry
- [ ] Delete an entry
- [ ] Scroll to load more entries
- [ ] Test form validation (try submitting empty title)
- [ ] Test responsive design on mobile

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Push your code to GitHub
2. Create a new Web Service on Render/Railway
3. Connect your repository
4. Add environment variables:
   - `DATABASE_URL`
   - `PORT`
5. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Push your code to GitHub
2. Import project on Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=<your-backend-url>/api`
6. Deploy!

### Database Hosting

For production, consider:
- **PlanetScale** (Free tier available)
- **Railway** (Includes MySQL)
- **AWS RDS**
- **DigitalOcean Managed Databases**

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify DATABASE_URL in .env
- Ensure database exists
- Run `npx prisma generate`

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Check CORS settings in backend

### Prisma errors
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL="mysql://username:password@localhost:3306/movies_db"
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- React Team
- Prisma Team
- TailwindCSS Team
- Vite Team

---

![App Screenshot](./frontend/public/Screenshot.png)