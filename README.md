# Luccas Booth Portfolio Website

A professional portfolio website showcasing the artwork, designs, and professional services of Luccas Booth.
Checkout the live site here: www.luccasbooth.com
## 🎨 Features

- Responsive design for all devices
- Image gallery with Swiper carousel
- Smooth scroll animations with AOS
- Contact form functionality
- Professional artwork portfolio display
- Mobile-friendly navigation
- Social media integration

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll Library
- [Swiper](https://swiperjs.com/) - Modern Mobile Touch Slider
- [Google Fonts](https://fonts.google.com/) - Playfair Display & Roboto

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── styles/
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── home.css
│   │   └── styles.css
│   ├── js/
│   │   ├── components.js
│   │   └── script.js
│   └── pages/
│       ├── index.html
│       ├── about.html
│       ├── contact.html
│       ├── artwork.html
│       └── thanks.html
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Open the project in your preferred code editor

3. Serve the files locally using a development server of your choice:
   - Using Python: `python -m http.server`
   - Using Node.js: `npx serve src`
   - Using VS Code: Live Server extension

4. Open your browser and navigate to `localhost:port` (port number will depend on your server)

## 📦 Deployment

This website is automatically deployed via Cloudflare Pages:

1. Every push to the `main` branch triggers a new deployment
2. Cloudflare Pages automatically builds and serves the content
3. The site is served through Cloudflare's global CDN network

## 🔧 Configuration

### Cloudflare Pages Settings

- Build command: None (static site)
- Build output directory: `src`
- Root directory: `/`

## 🎨 Customization

### Colors
The website uses CSS variables for easy customization. Main colors can be modified in `src/styles/styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #ecf0f1;
    --accent-color: #e74c3c;
    --background-color: #ffffff;
    --text-color: #333333;
    --hover-color: #3498db;
}
```

### Typography
- Primary Font: Playfair Display (Headers)
- Secondary Font: Roboto (Body text)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS/Android)

## 🤝 Contributing

While this is a personal portfolio website, suggestions and feedback are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 📞 Contact

Luccas Booth - [Contact Form](luccasbooth.com/contact)

## 🙏 Acknowledgments

- [AOS Library](https://michalsnik.github.io/aos/)
- [Google Fonts](https://fonts.google.com/)
