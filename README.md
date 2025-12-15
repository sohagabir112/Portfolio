# Sohag's Portfolio Website

A modern, responsive portfolio website showcasing web development projects and skills. Built with clean HTML5, CSS3, and vanilla JavaScript with smooth animations and interactive features.

![Portfolio Preview](./assets/images/profile.jpg)

## 🚀 Features

### ✨ Core Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Smooth Animations** - Scroll-triggered animations and typing effects
- **Interactive Navigation** - Fixed navbar with active section highlighting
- **Projects Carousel** - Horizontal scrolling project showcase with navigation arrows
- **Contact Form** - Functional contact form with validation
- **Skills Visualization** - Animated progress bars for technical skills

### 🎨 Visual Features
- **Typing Animation** - Dynamic name typing effect on load
- **Hover Effects** - Interactive elements with smooth transitions
- **Modern UI** - Clean, professional design with gradients and shadows
- **Image Integration** - Project showcase with fallback placeholders
- **Font Awesome Icons** - Consistent iconography throughout
- **Glassmorphism** - Modern navbar with backdrop blur effects

### 📱 Responsive Features
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Flexible Grid** - Adaptive layouts for all screen sizes
- **Touch-Friendly** - Optimized for mobile interactions
- **Performance Optimized** - Fast loading and smooth scrolling

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation

### Libraries & Frameworks
- **Font Awesome** - Icon library for consistent iconography
- **Google Fonts** - Poppins font for modern typography

### Backend (Optional)
- **Express.js** - Web server framework
- **ExcelJS** - Excel file creation and manipulation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Visual Studio Code** - Primary development environment
- **Git** - Version control
- **Browser DevTools** - Debugging and testing

## 📁 Project Structure

```
portfolio/
├── index.html                    # Main HTML file
├── style.css                     # All styles and animations
├── scripts/
│   └── main.js                  # JavaScript functionality
├── assets/
│   └── images/                  # Project images and profile photo
│       ├── profile.jpg
│       ├── traffic-light.jpg
│       ├── bank-system.jpg
│       ├── bank-system.png
│       ├── super-shop-management.jpg
│       └── ...
├── styles/                       # Additional styles directory
├── server.js                     # Backend server (Node.js/Express)
├── package.json                  # Node.js dependencies
├── package-lock.json             # Dependency lock file
├── contact_submissions.xlsx      # Auto-generated Excel file
├── .gitignore                    # Git ignore rules
├── README.md                     # Main documentation
├── README_BACKEND.md             # Backend documentation
└── node_modules/                 # Dependencies (auto-generated)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git (optional, for version control)

### Installation

1. **Clone the repository** (if using Git):
   ```bash
   git clone https://github.com/sohagabir112
   cd portfolio
   ```

2. **Direct download**: Download all files and place them in your project directory

3. **File Structure**: Ensure the following structure is maintained:
   ```
   your-project/
   ├── index.html
   ├── style.css
   ├── scripts/main.js
   └── assets/images/
   ```

### Running the Project

1. **Open in Browser**: Simply open `index.html` in your web browser
2. **Live Server**: For development, use VS Code Live Server extension
3. **Local Server**: Use any local server (Apache, Nginx, or Python's http.server)

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .
```

### Running with Backend (Recommended)

For full functionality including contact form submissions:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the backend server**:
   ```bash
   npm run dev  # Development mode with auto-restart
   # or
   npm start    # Production mode
   ```

3. **Open your portfolio**:
   - The backend runs on `http://localhost:3001`
   - Contact form submissions will be saved to `contact_submissions.xlsx`

**Note**: Keep both the backend server and your portfolio running simultaneously.

## 🎯 Usage

### Navigation
- Use the top navigation bar to jump to different sections
- Mobile users can access the hamburger menu
- Smooth scrolling to sections with active highlighting

### Theme Toggle
- Click the moon/sun icon in the navbar to switch themes
- Theme preference is saved in localStorage

### Projects Carousel
- Click left/right arrows to navigate through projects
- Projects are displayed horizontally with smooth scrolling
- Hover effects on project cards for visual feedback

### Contact Form
- Fill out the contact form in the contact section
- Form includes validation for required fields
- Submissions are stored in Excel file via backend API
- Real-time feedback with success/error notifications

## 🎨 Customization

### Colors and Themes
Edit CSS custom properties in `:root` and `[data-theme="dark"]` selectors:

```css
:root {
    --bg-primary: #ffffff;
    --accent-color: #3498db;
    /* ... other variables */
}
```

### Adding Projects
1. Add project image to `assets/images/`
2. Update the projects carousel in `index.html`
3. Include project details and links

### Modifying Animations
- Typing animation speed: Edit `.hero-name` animation duration
- Scroll animations: Modify IntersectionObserver options
- Theme transitions: Adjust CSS transition properties

## 📱 Browser Support

- **Chrome** (recommended) - Full feature support
- **Firefox** - Full feature support
- **Safari** - Full feature support
- **Edge** - Full feature support
- **Mobile Browsers** - iOS Safari, Chrome Mobile

## 🔧 Development

### Code Quality
- Semantic HTML5 structure
- CSS custom properties for maintainability
- Modular JavaScript functions
- Responsive design principles

### Performance Features
- Optimized images and assets
- Smooth animations with CSS transforms
- Efficient JavaScript event handling
- Minimal external dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sohag Abir**
- Email: sohagabir112@gmail.com
- LinkedIn: [https://www.linkedin.com/in/sohag-abir-624489392/]
- GitHub: [https://github.com/sohagabir112]
- Facebook: [Your Facebook Profile]
- Instagram: [Your Instagram Profile]
- YouTube: [Your YouTube Channel]

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Google Fonts for typography
- Inspiration from modern web design trends
- Open source community for tools and resources

## 📞 Support

If you have any questions or need help with this project, feel free to:
- Open an issue on GitHub
- Contact me directly via email
- Check the documentation for common solutions

---

⭐ **Star this repo** if you found it helpful!
