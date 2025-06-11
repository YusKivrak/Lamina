import React, { useState, useRef, useEffect } from 'react';

/**
 * ImageTextCanvas component allows users to upload an image and draw text
 * behind it using an HTML5 canvas. Users can customize the text, font size,
 * color, and position. The final image can be downloaded.
 */
function ImageTextCanvas() {
  // Uploaded image element
  const [image, setImage] = useState(null);
  // Text and styling state
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#000000');
  const [textX, setTextX] = useState(50);
  const [textY, setTextY] = useState(50);
  // Canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 150 });

  const canvasRef = useRef(null);

  // Handle image file upload
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Accept both jpg and jpeg MIME types along with png
    if (!/^image\/(png|jpe?g)$/.test(file.type)) {
      alert('Please upload a PNG or JPEG image.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Scale image to fit within max dimensions
      const maxWidth = 800;
      const maxHeight = 600;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      const width = img.width * scale;
      const height = img.height * scale;
      setCanvasSize({ width, height });
      // Default text position at center
      setTextX(width / 2);
      setTextY(height / 2);
      setImage(img);
    };
    img.onerror = () => alert('Failed to load image.');
    img.src = URL.createObjectURL(file);
  };

  // Redraw canvas whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text first so it appears behind the image
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = 'top';
    ctx.fillText(text, textX, textY);

    // Draw scaled image on top
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, [image, text, fontSize, fontColor, textX, textY, canvasSize]);

  // Download the canvas content as an image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'image_with_text.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <h2>Image Text Canvas</h2>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      {image && (
        <div style={{ marginTop: '1rem' }}>
          <div>
            <label>
              Text:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Font Size: {fontSize}px
              <input
                type="range"
                min="10"
                max="200"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              />
            </label>
          </div>

          <div>
            <label>
              Font Color:
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Text X: {textX}
              <input
                type="range"
                min="0"
                max={canvasSize.width}
                value={textX}
                onChange={(e) => setTextX(parseInt(e.target.value, 10))}
              />
            </label>
          </div>

          <div>
            <label>
              Text Y: {textY}
              <input
                type="range"
                min="0"
                max={canvasSize.height}
                value={textY}
                onChange={(e) => setTextY(parseInt(e.target.value, 10))}
              />
            </label>
          </div>

          <button onClick={handleDownload}>Download Image</button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', marginTop: '1rem' }}
      />
    </div>
  );
}

export default ImageTextCanvas;
