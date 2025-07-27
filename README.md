# 🎯 Serenamente Conference Website

A modern, responsive Single Page Application (SPA) built with React and Material-UI to promote the Serenamente conference focused on mental wellness and personal development.

## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Spanish Language**: Full Spanish language interface for Latin American audience
- **Smooth Scrolling**: Seamless navigation between sections
- **Modern UI**: Clean, professional design with Material-UI components
- **Interactive Elements**: Hover effects, animations, and transitions
- **Contact Integration**: WhatsApp and email integration for easy communication
- **Comprehensive Testing**: Full Jest unit test coverage for all components

## 🗂 Project Structure

```
/src
  /components
    Navbar.tsx          # Navigation bar (Spanish)
    Hero.tsx            # Hero section with CTA
    About.tsx           # Conference information
    Mission.tsx         # Mission and values
    Tickets.tsx         # Pricing and ticket options
    Contact.tsx         # Contact form and information
    Footer.tsx          # Footer with social links
    *.test.tsx          # Jest unit tests for each component
  /theme
    theme.ts            # MUI theme configuration
  App.tsx               # Main application component
  App.test.tsx          # Main app unit tests
  index.tsx             # Application entry point
  setupTests.ts         # Jest configuration
```

## 🛠 Technologies Used

- **React** (^19.1.0) - Frontend framework
- **Material-UI** (^7.2.0) - UI component library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling
- **react-scroll** - Smooth scrolling navigation
- **TypeScript** - Type safety and better development experience
- **Jest** & **@testing-library/react** - Unit testing framework and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serenamente
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm start` - Runs the development server
- `pnpm build` - Creates production build
- `pnpm test` - Runs Jest test suite (64 unit tests)
- `pnpm test -- --coverage` - Runs tests with coverage report
- `pnpm eject` - Ejects from Create React App (not recommended)

## 📱 Sections Overview

### 1. Hero Section
- Eye-catching gradient background
- Main conference title and tagline
- Call-to-action buttons for tickets and information
- Smooth entrance animations

### 2. About Section
- Conference description and key features
- Interactive feature cards with hover effects
- Information about speakers, networking, and practical content

### 3. Mission Section
- Conference mission and values
- Three core pillars: Integral Wellbeing, Natural Connection, Personal Growth
- Elegant design with gradient background

### 4. Tickets Section
- Two pricing tiers: General Access and VIP Experience
- Feature comparison with checkmarks
- Urgency messaging and special offers
- Event information (date, location, duration)

### 5. Contact Section
- Contact form with email integration
- Multiple contact methods (WhatsApp, Email, Phone)
- Interactive contact cards
- Direct action buttons

### 6. Footer
- Social media links (Instagram, X, LinkedIn, Facebook)
- Quick navigation links
- Legal links and copyright information
- Contact information

## 🧪 Testing

The project includes comprehensive Jest unit testing with **64 test cases** covering:

- **Component Rendering**: All components render correctly
- **User Interactions**: Form submissions, button clicks, navigation
- **Content Validation**: Text content, images, and links
- **Responsive Behavior**: Mobile and desktop layouts
- **Integration Testing**: Component interactions and data flow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage report
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

### Test Structure

Each component has its own test file following the pattern `ComponentName.test.tsx`:
- `App.test.tsx` - Main application tests
- `Navbar.test.tsx` - Navigation tests  
- `Hero.test.tsx` - Hero section tests
- `About.test.tsx` - About section tests
- `Mission.test.tsx` - Mission section tests
- `Tickets.test.tsx` - Tickets section tests
- `Contact.test.tsx` - Contact form tests
- `Footer.test.tsx` - Footer tests

## 🎨 Design Features

- **Color Scheme**: Primary blue (#0066ff) and secondary pink (#ff4081)
- **Typography**: Inter font family for modern readability
- **Animations**: Fade-in effects and smooth transitions
- **Cards**: Elevated cards with hover effects
- **Buttons**: Rounded buttons with hover animations
- **Responsive Grid**: Adaptive layout for all screen sizes

## 📞 Contact Integration

- **WhatsApp**: Direct messaging with pre-filled text
- **Email**: Mailto links with subject lines
- **Phone**: Direct calling capability
- **Contact Form**: Email form with validation

## 🚢 Deployment

To deploy the application:

1. **Build for production**
   ```bash
   pnpm build
   ```

2. **Deploy the `build` folder** to your hosting service of choice:
   - Netlify
   - Vercel
   - AWS S3
   - GitHub Pages
   - Any static hosting service

## 🔧 Customization

### Theme Customization
Edit `src/theme/theme.ts` to customize colors, typography, and other design tokens.

### Content Updates
Update the Spanish content directly in each component to modify text, pricing, contact information, etc.

### Adding New Sections
1. Create a new component in the `components` folder
2. Create corresponding unit tests (`ComponentName.test.tsx`)
3. Import and add the component to `App.tsx`
4. Add navigation link in `Navbar.tsx`
5. Update tests to include the new section

## 📊 Recent Updates

### v2.0 (Latest)
- ❌ **Removed**: Bilingual support (English/Spanish toggle)
- ✅ **Added**: Comprehensive Jest unit testing (64 test cases)  
- ✅ **Improved**: Simplified Spanish-only interface
- ✅ **Enhanced**: Better code maintainability and testing coverage

### Breaking Changes
- Language toggle functionality has been removed
- All components now display Spanish content only
- Language-related props and interfaces have been eliminated

## 🐛 Known Issues

- Some TypeScript strict mode warnings with MUI v7 (does not affect functionality)
- Smooth scrolling may not work on older browsers

## 📝 License

This project is private and proprietary to Serenamente Conference.

## 🤝 Contributing

For contributions or questions, please contact the development team at info@serenamente.com.
