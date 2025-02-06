# PsyCare Website

A modern, responsive website for PsyCare - Behavioral Health Technology & Staffing Solutions.

## Features

- Responsive design optimized for all devices
- Progressive Web App (PWA) capabilities
- SEO optimized
- Performance optimized with modern build tools
- Accessibility compliant
- Security hardened

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/psycare/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```
Edit `.env` with your configuration values.

## Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:1234`

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` directory to your hosting provider.

## Project Structure

```
├── src/
│   ├── assets/         # Static assets
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── *.html         # HTML pages
├── dist/              # Production build
├── tests/             # Test files
├── .env.example       # Environment variables example
├── package.json       # Project dependencies
└── README.md         # This file
```

## Performance Optimization

- Images are optimized and served in WebP format
- CSS/JS minification and bundling
- Critical CSS inlined
- Lazy loading for images and components
- Service Worker for offline support
- Browser caching configured

## Security Features

- Content Security Policy (CSP) implemented
- HTTPS enforced
- XSS protection
- CSRF protection
- Security headers configured
- Rate limiting implemented

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this project, via any medium, is strictly prohibited.

## Support

For support, email support@psycaremn.com or open an issue in the repository. 