import React, { useState } from 'react';

import './index.css'


const ProductGallery = ({ images }) => {
  console.log("type of images -------> ", typeof images);

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-gallery">
      {/* Main Large Image Display */}

      <div className="gallery-main">
        <img
          src={images[selectedImage]}
          alt={`Product ${selectedImage + 1}`}
          className="main-image"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
