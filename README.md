# Great Chat - Frontend Application

A modern, responsive web application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive business management system with authentication, document management, approval workflows, and payment processing.

## 🚀 Features

### Authentication System
- **User Login** - Secure login with email/password
- **User Registration** - Multi-step signup process with form validation
- **Password Recovery** - Forgot password flow with email verification
- **Session Management** - Persistent authentication using localStorage
- **Protected Routes** - Route guards to secure authenticated pages

### Core Modules
- **Dashboard** - Overview of key metrics and recent activity
- **Registration** - Business registration and onboarding
- **Documents** - Document upload and management
- **Approval** - Workflow approval system
- **Contracts** - Contract management and tracking
- **Payments** - Payment processing and history
- **Activity** - Comprehensive activity log with search and filters
- **Admin** - Administrative dashboard and settings

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: React Router DOM v6
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner + Radix Toast

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout with sidebar navigation
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── StatusBadge.tsx  # Status indicator component
├── contexts/
│   └── AuthContext.tsx  # Authentication context provider
├── hooks/               # Custom React hooks
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Activity.tsx     # Activity log page
│   ├── Admin.tsx        # Admin dashboard
│   ├── Approval.tsx     # Approval workflow
│   ├── Contracts.tsx    # Contract management
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Documents.tsx    # Document management
│   ├── ForgotPassword.tsx # Password recovery
│   ├── Login.tsx        # Login page
│   ├── NotFound.tsx     # 404 error page
│   ├── Payments.tsx     # Payment processing
│   ├── Registration.tsx # Business registration
│   └── SignUp.tsx       # User registration
├── App.tsx              # Main application component
├── index.css            # Global styles and design tokens
└── main.tsx             # Application entry point
```

## 🔐 Authentication

This application uses a **frontend-only mock authentication** system. The authentication state is managed through React Context and persisted in localStorage.

### Mock Credentials
Currently, any email/password combination will work for demonstration purposes. In production, this should be replaced with a real authentication backend.

### Authentication Flow
1. User enters credentials on `/login`
2. AuthContext validates and creates mock user session
3. Session is stored in localStorage
4. User is redirected to dashboard
5. Protected routes check authentication status
6. Logout clears session and redirects to login

## 🎨 Design System

The application uses a comprehensive design system built with Tailwind CSS and custom CSS variables defined in `src/index.css`:

### Color Tokens
- `--background` - Main background color
- `--foreground` - Main text color
- `--primary` - Brand primary color
- `--secondary` - Secondary UI elements
- `--muted` - Muted backgrounds
- `--accent` - Accent highlights
- `--destructive` - Error/warning states

### Dark Mode
The application supports both light and dark modes with automatic system preference detection.

## 🧭 Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/login` | User login page | No |
| `/signup` | User registration | No |
| `/forgot-password` | Password recovery | No |
| `/` | Dashboard home | Yes |
| `/register` | Business registration | Yes |
| `/documents` | Document management | Yes |
| `/approval` | Approval workflows | Yes |
| `/contracts` | Contract management | Yes |
| `/payments` | Payment processing | Yes |
| `/activity` | Activity history | Yes |
| `/admin` | Admin dashboard | Yes |

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔌 Integration Options

This frontend is designed to work with various backend solutions:

- **Lovable Cloud** - Integrated Supabase backend
- **Custom API** - REST or GraphQL endpoints
- **Firebase** - Google's backend platform
- **Custom Backend** - Any Node.js, Python, or other backend

To integrate a backend, replace the mock authentication in `src/contexts/AuthContext.tsx` with real API calls.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Deploy with Lovable
1. Open your [Lovable Project](https://lovable.dev/projects/846a2807-aec9-4722-86fc-662e92315096)
2. Click "Publish" in the top right
3. Your app will be deployed to a Lovable subdomain

### Deploy to Other Platforms
This is a standard Vite React application that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions:
- Open an issue in the repository
- Contact the development team
- Check the [Lovable Documentation](https://docs.lovable.dev/)

## 🔗 Links

- **Lovable Project**: https://lovable.dev/projects/846a2807-aec9-4722-86fc-662e92315096
- **Documentation**: https://docs.lovable.dev/
- **Component Library**: https://ui.shadcn.com/

---

Built with ❤️ using [Lovable](https://lovable.dev)
