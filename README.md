# Luccas Booth Portfolio Website

A professional portfolio website showcasing the artwork, designs, and professional services of Luccas Booth.
Visit the live site: [luccasbooth.com](https://luccasbooth.com)

## 🎨 Features

- Responsive design optimized for all devices
- Dynamic image gallery with lazy loading
- Smooth scroll animations with AOS library
- Contact form with FormSubmit integration
- Professional artwork portfolio with Supabase backend
- Mobile-friendly navigation with hamburger menu
- Social media integration
- SEO optimized with meta tags and structured data
- Performance optimized with image preloading and async loading

## 🛠 Tech Stack

- HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll Library
- [Supabase](https://supabase.com/) - Backend as a Service
- [FormSubmit](https://formsubmit.co/) - Form Backend Service
- [Google Fonts](https://fonts.google.com/) - Playfair Display & Roboto

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── favicon_io/
│   ├── styles/
│   │   ├── about.css
│   │   ├── collections.css
│   │   ├── contact.css
│   │   ├── home.css
│   │   └── styles.css
│   ├── js/
│   │   ├── components.js
│   │   ├── collections.js
│   │   ├── gallery.js
│   │   ├── supabase-client.js
│   │   └── script.js
│   └── pages/
│       ├── index.html
│       ├── about.html
│       ├── collections.html
│       ├── contact.html
│       └── thanks.html
```

## 🚀 Getting Started

### Prerequisites

- Web browser
- Basic understanding of HTML, CSS, and JavaScript
- Supabase account (for artwork database)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Set up environment variables:
   - Create a `supabase-client.js` file with your Supabase credentials
   - Configure FormSubmit endpoints in contact forms

3. Serve the files locally using a development server:
   - Using Python: `python -m http.server`
   - Using Node.js: `npx serve src`
   - Using VS Code: Live Server extension

4. Open your browser and navigate to `localhost:port`

## 📦 Deployment

The website is deployed via Cloudflare Pages:

- Automatic deployments from the `main` branch
- Global CDN distribution
- SSL/TLS encryption

### Cloudflare Pages Settings

- Build command: None (static site)
- Build output directory: `src`
- Root directory: `/`

## 🎨 Customization

### Colors
Main colors can be modified in `src/styles/styles.css`:

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

Luccas Booth - [Contact Form](https://luccasbooth.com/contact)

## 🙏 Acknowledgments

- [AOS Library](https://michalsnik.github.io/aos/)
- [Supabase](https://supabase.com/)
- [FormSubmit](https://formsubmit.co/)
- [Google Fonts](https://fonts.google.com/)