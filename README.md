# Lamina

A simple React component for drawing text behind an uploaded image using a canvas.

## Component

`ImageTextCanvas.jsx` located in `src/` implements the canvas tool. Users can:

- Upload a PNG or JPEG image.
- Enter custom text to display behind the image.
- Adjust font size, color, and position.
- Download the final image from the canvas.

The component relies only on React 18 and built–in browser APIs.

## Usage

1. Create a React project (for example with `create-react-app` or Vite).
2. Copy `src/ImageTextCanvas.jsx` from this repository into your project's
   `src/` directory.
3. Import and render the component:

   ```jsx
   import ImageTextCanvas from './ImageTextCanvas';

   function App() {
     return <ImageTextCanvas />;
   }
   ```

4. Start the development server (`npm start` or `npm run dev`) and open
   `http://localhost:3000` in your browser.
