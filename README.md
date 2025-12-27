# 📺 TV Maze Explorer

A modern, responsive web application for exploring TV shows using the TVMaze API. Built with TypeScript, React, and Vite.

[TV Maze Explorer](https://img.shields.io/badge/React-19.2.0-blue) [TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue) [Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## ✨ Features

### Core Features
- 🏠 **Home Page** - Browse all TV shows with infinite scroll pagination
- 🔍 **Search Functionality** - Search TV shows by name with sticky search bar
- 📄 **Show Details Page** - Detailed information including cast gallery
- ⭐ **Star Ratings** - Visual rating display with star icons
- 🖼️ **Lazy Loading Images** - Optimized image loading with fallback support
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop devices

### Bonus Features
- ❤️ **Favorites System** - Save/unsave favorite shows using local storage
- 📅 **Episode Schedule Calendar** - View upcoming episodes in calendar format
- 🐳 **Docker Support** - Easy deployment with Docker and Nginx
- ✅ **Unit Tests** - Comprehensive test coverage with Vitest

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd tv-maze-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint for code quality checks |

## 🐳 Docker Deployment

### Using Docker Commands

1. **Build the Docker image:**
```bash
docker build -t tv-maze-app .
```

2. **Run the container:**
```bash
docker run -d --name tv-maze-app-container -p 8080:80 tv-maze-app
```

3. **Access the application:**
Open `http://localhost:8080` in your browser

4. **Stop the container:**
```bash
docker stop tv-maze-app-container
docker rm tv-maze-app-container
```

### Using Makefile

The project includes a Makefile for convenient command execution:

```bash
# View all available commands
make help

# Build Docker image
make docker-build

# Run Docker container
make docker-run

# Stop Docker container
make docker-stop

# View container logs
make docker-logs

# Run all checks (install, lint, test, build)
make all
```

## 🏗️ Project Structure

```
tv-maze-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CastGallery.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── LazyImage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ScheduleCalendar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StarRating.tsx
│   │   ├── TVCard.tsx
│   │   └── __tests__/       # Component tests
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   └── ShowDetails.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── helpers.ts
│   │   ├── localStorage.ts
│   │   └── __tests__/       # Utility tests
│   ├── styles/              # CSS modules
│   ├── tests/               # Test configuration
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
├── nginx.conf               # Nginx configuration
├── Makefile                 # Build automation
├── vitest.config.ts         # Test configuration
└── package.json             # Project dependencies
```

## 🎯 Key Features Implementation

### 1. Home Page
- **TV Show List**: Displays all shows in a responsive grid layout
- **Pagination**: Infinite scroll - new items load automatically when scrolling to bottom
- **Search**: Sticky search bar that remains visible while scrolling
- **Lazy Loading**: Images load only when they enter the viewport
- **Fallback Images**: Placeholder images for shows without images
- **Favorites Toggle**: Quick access to view favorite shows

### 2. Show Details Page
- **Comprehensive Information**: Image, name, rating, type, summary, language, premiered year, official site link
- **Cast Gallery**: Grid layout with actor and character names
- **Episode Schedule**: Interactive calendar showing upcoming episodes
- **Responsive Layout**: Optimized for all screen sizes

### 3. Reusable Components
- `TVCard`: Show card with image, title, rating, and type
- `StarRating`: Visual star rating display (0-10 scale)
- `LazyImage`: Intersection Observer-based lazy loading
- `SearchBar`: Sticky search with real-time updates
- `CastGallery`: Actor/character image gallery
- `ScheduleCalendar`: Monthly calendar with episode schedule
- `LoadingSpinner`: Loading state indicator
- `ErrorMessage`: User-friendly error display with retry option

### 4. Local Storage Features
- Save favorite shows
- Persist favorites across sessions
- Quick toggle favorite status
- View all favorites in dedicated view

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library.

**Run tests:**
```bash
npm run test
```

**Run tests with UI:**
```bash
npm run test:ui
```

**Generate coverage report:**
```bash
npm run test:coverage
```

**Test Coverage:**
- Component rendering tests
- User interaction tests
- Utility function tests
- Local storage operations tests

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Date Utilities**: date-fns 4.1.0
- **Lazy Loading**: react-intersection-observer 10.0.0
- **Testing**: Vitest 4.0.16 + React Testing Library
- **Containerization**: Docker + Nginx

## 🌐 API Information

This application uses the [TVMaze API](https://www.tvmaze.com/api) to fetch TV show data.

**Key Endpoints Used:**
- `GET /shows?page={page}` - Fetch paginated shows
- `GET /search/shows?q={query}` - Search shows by name
- `GET /shows/{id}` - Get show details
- `GET /shows/{id}/cast` - Get show cast
- `GET /shows/{id}/episodes` - Get show episodes
- `GET /schedule?date={date}` - Get schedule for specific date

## 🎨 Design Highlights

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Grid**: Adapts to different screen sizes automatically
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Performance**: Code splitting, lazy loading, optimized images
- **Error Handling**: User-friendly error messages with retry options
- **Loading States**: Clear loading indicators for better UX

## 📝 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency checks
- **Comments**: Clear documentation in code
- **Component Structure**: Single responsibility principle
- **Reusability**: DRY (Don't Repeat Yourself) principles
- **Error Boundaries**: Graceful error handling

## 🚢 Production Build

1. **Build the application:**
```bash
npm run build
```

2. **Preview the build:**
```bash
npm run preview
```

The optimized production build will be in the `dist/` directory.

## 🐛 Error Handling

The application includes comprehensive error handling:
- API request failures show user-friendly error messages
- Retry functionality for failed requests
- Fallback images for missing show images
- Graceful degradation for missing data
- Console logging for debugging

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a demonstration project. For improvements or bug fixes:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and the TVMaze API

---

**Happy Exploring! 📺✨**