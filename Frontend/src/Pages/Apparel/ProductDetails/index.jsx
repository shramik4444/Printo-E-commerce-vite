// ==================== components/ProductDetails/ProductDetails.jsx ====================

// const ProductDetails = ({ product }) => {

//   const [ProductDescription, setProductDescription] = React.useState([]);



//   return (
//     <div className="product-details">
//       {/* Product Title */}
//       <h1 className="product-title">{product.name}</h1>

//       {/* Product Tagline/Description */}
//       <p className="product-tagline">{product.tagline}</p>

//       {/* Product Features List */}
//       <div className="product-features-list">
//         {product.features.map((feature, index) => (
//           <div key={index} className="feature-item">
//             <span className="feature-icon">{feature.label}: </span>
//             <span className="feature-label">{feature.value}</span>
//           </div>
//         ))}
//       </div>

//       {/* Key Feature Highlight */}
//       {product.keyFeature && (
//         <div className="key-feature">
//           <span className="key-feature-label">Key Feature:</span> {product.keyFeature}
//         </div>
//       )}

//       {/* Delivery Information */}
//       {product.delivery && (
//         <div className="delivery-info">
//           <span className="delivery-icon">🚚</span>
//           <span className="delivery-text">{product.delivery}</span>
//         </div>
//       )}

//       {/* Additional Product Info */}
//       {product.additionalInfo && (
//         <div className="additional-product-info">
//           {product.additionalInfo.map((info, index) => (
//             <div key={index} className="info-badge">
//               <span className="info-icon">{info.icon}</span>
//               <span className="info-text">{info.text}</span>
//             </div>
//           ))}
//         </div>
//       )}
//       <ApparelProductOptions />
//     </div>
//   );
// };

// export default ProductDetails;






import React from 'react';
import './index.css';
import ApparelProductOptions from '../ApparelProductOptions';



const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>

      {product.tagline && (
        <p className="product-tagline">{product.tagline}</p>
      )}

      {Array.isArray(product.features) && (
        <div className="product-features-list">
          {product.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-icon">{feature.label}: </span>
              <span className="feature-label">{feature.value}</span>
            </div>
          ))}
        </div>
      )}

      {product.keyFeature && (
        <div className="key-feature">
          <strong>Key Feature:</strong> {product.keyFeature}
        </div>
      )}

      {product.delivery && (
        <div className="delivery-info">🚚 {product.delivery}</div>
      )}

      {Array.isArray(product.additionalInfo) && (
        <div className="additional-product-info">
          {product.additionalInfo.map((info, index) => (
            <div key={index} className="info-badge">
              {info.icon} {info.text}
            </div>
          ))}
        </div>
      )}

      <ApparelProductOptions />
    </div>
  );
};
export default ProductDetails;  