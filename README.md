# Interactive Vertical Arrow Navigation (VibeCoded)


A React-based interactive website featuring a bow and arrow navigation system. Users can drag the arrow to aim at different sections and release to navigate.

## Features

- Interactive bow and arrow navigation
- Smooth animations and transitions
- Responsive design
- Touch and mouse support
- Visual feedback with guidelines and release zones

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thegeekyb0y/archer
cd dhanushbaan
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
dhanushbaan/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BowAndArrow.jsx
│   │   ├── Guideline.jsx
│   │   ├── NavigationTargets.jsx
│   │   ├── PageSections.jsx
│   │   └── ReleaseZone.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## How to Use

1. **Aiming**: Click and drag the arrow nock (bottom part of the arrow) to aim
2. **Targeting**: Drag towards one of the navigation boxes (Projects, Resume, About Me)
3. **Releasing**: Release the mouse/touch in the red release zone at the bottom
4. **Navigation**: The arrow will animate to the target and open the corresponding page
5. **Returning**: Click the "← Back" button to return to the main view

## Customization

### Adding New Sections

1. Add a new navigation box in `NavigationTargets.jsx`
2. Add a corresponding page section in `PageSections.jsx`
3. Update the CSS classes as needed

### Styling

All styles are in `src/index.css`. The project uses Tailwind CSS for utility classes and custom CSS for the interactive elements.

## Deployment

This project can be easily deployed to:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `gh-pages` package
- **Any static hosting service**

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
