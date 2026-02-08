# Portal to Connect Virtually 💕

A beautiful React-based single-page application (SPA) for sharing memories and celebrating special moments.

## 🚀 Features

- 🎉 **New Year Letter** - A heartfelt letter with reveal animation
- 💕 **Valentine Week 2026** - Interactive roadmap of Valentine's week
- 🌹 **Rose Day** - Special page with comment system and image uploads
- 📱 **Fully Responsive** - Works seamlessly on all devices and screen sizes
- 🎨 **Beautiful Animations** - Floating hearts, petals, and smooth transitions
- 💾 **Local Storage** - Comments persist across sessions
- 🖼️ **Image Uploads** - Share images in comments

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)

## 🛠️ Installation

1. **Clone the repository** (if not already done):
```bash
git clone https://github.com/manojnathyogi/puttu.git
cd puttu
```

2. **Install dependencies**:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Production Build

Build the application for production:
```bash
npm run build
```

The optimized production files will be in the `dist` folder.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
puttu/
├── public/                 # Static assets
│   ├── rose-day.png       # Rose bouquet image
│   ├── rose-person.JPEG   # Person photo
│   └── vite.svg           # Favicon
├── src/
│   ├── pages/             # Route-level React pages
│   │   ├── Portal.jsx     # Landing page component
│   │   ├── Portal.css     # Portal styles
│   │   ├── NewYear.jsx    # New Year letter component
│   │   ├── NewYear.css    # New Year styles
│   │   ├── Valentine.jsx  # Valentine roadmap component
│   │   ├── Valentine.css  # Valentine styles
│   │   ├── RoseDay.jsx    # Rose Day page component
│   │   └── RoseDay.css    # Rose Day styles
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── .eslintrc.cjs          # ESLint configuration
├── .gitignore             # Git ignore rules
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🗺️ Routes

- `/` - Portal/Home page with navigation links
- `/newyear` - New Year Letter page
- `/valentine` - Valentine Week roadmap
- `/rose-day` - Rose Day page with comments and animations

## 🛠️ Technologies Used

- **React 18.3** - UI library
- **React Router DOM 6.30** - Client-side routing
- **Vite 5.4** - Build tool and dev server
- **CSS3** - Styling with animations and responsive design
- **ESLint** - Code linting

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features Explained

### Portal Page
- Central landing page with side navigation
- Floating heart animations
- Image placeholders for personal photos

### New Year Letter
- Animated letter reveal
- Smooth scroll animations
- Responsive typography

### Valentine Roadmap
- Interactive roadmap showing Valentine Week 2026
- Only active days are clickable (currently Rose Day)
- Blurred inactive days with road visuals

### Rose Day Page
- Animated rose bouquet rising from bottom
- Person's photo appearing slowly
- Comment system with localStorage persistence
- Image upload functionality
- Floating hearts and petals animations

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React plugin. Configuration can be modified in `vite.config.js`.

### ESLint Configuration
Code quality is enforced via ESLint. Configuration is in `.eslintrc.cjs`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal project, but feel free to fork and modify for your own use!

## 📄 License

Personal project - feel free to use and modify!

---

Made with ❤️ for someone special
