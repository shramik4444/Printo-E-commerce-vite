import React, { useState } from 'react';
import './index.css';


const ProductFullSpecs = ({ specs }) => {

    const [activeTab, setActiveTab] = useState('overview');
    if (!specs) return null;
    const { overview, specifications, designguidelines, washcareinstructions } = specs;
    console.log("specssss- ----->", overview, specifications, designguidelines, washcareinstructions);
    return (
        <div className='product-tab w-full'>
            <div className='tab-header'>
                <button
                    type="button"
                    className={activeTab == 'overview' ? 'active' : ''}
                    onClick={() => setActiveTab('overview')}>
                    overview
                </button>

                <button
                    type="button"
                    className={activeTab == 'specifications' ? 'active' : ''}
                    onClick={() => setActiveTab('specifications')}>
                    specifications
                </button>

                <button
                    type="button"
                    className={activeTab == 'design guidelines' ? 'active' : ''}
                    onClick={() => setActiveTab('design guidelines')}>
                    Design Guidelines
                </button>

                <button
                    type="button"
                    className={activeTab == 'washcare instructions' ? 'active' : ''}
                    onClick={() => setActiveTab('washcare instructions')}>
                    Wash Care Instructions
                </button>
            </div>
            <div className='tab-content text-black'>
                {activeTab === 'overview' && <div>{overview}</div>}
                {activeTab === 'specifications' && <div>{specifications}</div>}
                {activeTab === 'design guidelines' && <div>{designguidelines}</div>}
                {activeTab === 'washcare instructions' && <div>{washcareinstructions}</div>}
            </div>
        </div>
    )
}
export default ProductFullSpecs;




// import React from 'react';
// import './index.css';
// import ApparelProductOptions from '../ApparelProductOptions';



// const ProductDetails = ({ product }) => {
//     if (!product) return null;

//     return (
//         <div className="product-details">
//             <h1 className="product-title">{product.name}</h1>

//             {product.tagline && (
//                 <p className="product-tagline">{product.tagline}</p>
//             )}

//             {Array.isArray(product.features) && (
//                 <div className="product-features-list">
//                     {product.features.map((feature, index) => (
//                         <div key={index} className="feature-item">
//                             <span className="feature-icon">{feature.label}: </span>
//                             <span className="feature-label">{feature.value}</span>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {product.keyFeature && (
//                 <div className="key-feature">
//                     <strong>Key Feature:</strong> {product.keyFeature}
//                 </div>
//             )}

//             {product.delivery && (
//                 <div className="delivery-info">🚚 {product.delivery}</div>
//             )}

//             {Array.isArray(product.additionalInfo) && (
//                 <div className="additional-product-info">
//                     {product.additionalInfo.map((info, index) => (
//                         <div key={index} className="info-badge">
//                             {info.icon} {info.text}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <ApparelProductOptions />
//         </div>
//     );
// };
// export default ProductDetails;  