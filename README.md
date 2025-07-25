# NilKamalFurniture

A modern, responsive furniture e-commerce website built with React, Tailwind CSS, and Vite. This project showcases a professional furniture store with advanced navigation, product displays, and user authentication features.

## 🏠 **Project Overview**

NilKamalFurniture is a premium furniture store website that offers a seamless shopping experience with modern design, interactive navigation, and comprehensive product management.

## ✨ **Key Features**

### **🎨 Modern Design**
- **Professional UI/UX**: Clean, modern design inspired by premium furniture websites
- **Responsive Layout**: Fully responsive design that works on all devices
- **Tailwind CSS**: Advanced styling with custom design system
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### **🧭 Advanced Navigation**
- **Mega Dropdown Menus**: Large, interactive dropdown navigation
- **Shop Collections**: Featured furniture categories with images and descriptions
- **Featured Deals**: Special offers and promotions
- **Room Ideas**: Interior design inspiration
- **Customer Stories**: Reviews and testimonials
- **Delivery Info**: Shipping and service information

### **🛍️ Product Management**
- **Featured Products**: Curated product showcase with ratings and badges
- **Category Grid**: Organized furniture collections
- **Product Cards**: Interactive product displays with hover effects
- **Stock Management**: Real-time stock indicators
- **Price Formatting**: Indian Rupee (₹) currency display

### **🔐 User Authentication**
- **Sign In/Sign Up**: Complete authentication system
- **Demo Login**: Test accounts for demonstration
- **User Profiles**: Account management features
- **Session Management**: Secure user sessions

### **🎯 Interactive Elements**
- **Shopping Cart**: Add to cart functionality
- **Search Autocomplete**: Advanced search with suggestions
- **Language Support**: English and Hindi localization
- **Recent Activity**: Live user activity notifications
- **Newsletter Signup**: Email subscription system

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

### **Styling & Design**
- **Custom Design System**: Professional color palette and typography
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Animations**: CSS transitions and keyframe animations
- **Icons**: Custom icon system with SVG components

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization
- **Hot Reload**: Fast development with live updates

## 📁 **Project Structure**

```
myfurniture_store/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── NavigationDropdown.jsx
│   │   │   └── ...
│   │   └── AppIcon.jsx         # Icon system
│   ├── pages/
│   │   ├── auth/               # Authentication pages
│   │   ├── collections/        # Product collections
│   │   ├── deals/              # Special offers
│   │   └── landing-page/       # Main landing page
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── hooks/
│   │   └── useDeviceDetection.js
│   ├── styles/
│   │   └── tailwind.css        # Custom CSS
│   └── utils/
│       └── authService.js      # Authentication service
├── public/
│   └── assets/                 # Static assets
└── supabase/                   # Database migrations
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishwa-247/NilkamalFurniture.git
   cd NilkamalFurniture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:4028
   ```

### **Available Scripts**

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 **Design Features**

### **Color Palette**
- **Primary**: Professional blue tones
- **Accent**: Warm orange and gold
- **Neutral**: Clean grays and whites
- **Success/Error**: Green and red indicators

### **Typography**
- **Headings**: Playfair Display (elegant serif)
- **Body**: System fonts for readability
- **Hierarchy**: Clear typographic scale

### **Components**
- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Navigation**: Sticky header with backdrop blur
- **Dropdowns**: Large, interactive mega menus

## 📱 **Responsive Design**

- **Desktop**: Full navigation with mega dropdowns
- **Tablet**: Optimized layouts and touch interactions
- **Mobile**: Collapsible navigation and mobile-first design

## 🔧 **Customization**

### **Branding**
- Update logo and brand name in `Header.jsx`
- Modify color scheme in `tailwind.config.js`
- Customize typography in CSS variables

### **Content**
- Add new products in `FeaturedProducts.jsx`
- Update navigation menus in `Header.jsx`
- Modify authentication in `AuthContext.jsx`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 **Author**

**Vishwa Teja Thouti**
- GitHub: [@Vishwa-247](https://github.com/Vishwa-247)
- Project: [NilKamalFurniture](https://github.com/Vishwa-247/NilkamalFurniture)

## 🙏 **Acknowledgments**

- **Design Inspiration**: Premium furniture websites
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS framework
- **Icons**: Custom SVG icon system

---

**Built with ❤️ using React, Tailwind CSS, and Vite**
