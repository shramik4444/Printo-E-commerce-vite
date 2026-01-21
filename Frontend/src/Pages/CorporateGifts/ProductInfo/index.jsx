import React, { useState } from "react";
import './index.css';

const ProductInfo = () => {
  return (
    <div className="main-cont text-black">
      <h1 className="text-blue-900 text-[49px] font-bold">Dazzle Dark Grey Mug</h1>
      <p>A clever grip-pad design at the bottom of the sipper bottle ensures that no beverage is ever spilled again due to clumsy hands.</p>

      <ul className="list-disc ml-5 mt-5">
        <li>Get it personalized with your Company Logo or Name printed on it.
          <li>You can gift it to your loved ones with their name printed on it. BPA Free & Non-Toxic Double Layer Plastic PP.</li>
          <li>Choose from multicolour UV & screen printing options. Logo/text print size : 1.5 x 3 inches. Temperature Retention for up to 1 hour.</li>
          Capacity : 400 ML.</li>
      </ul>
      <div className="quantity-cont flex flex-row justify-around align-middle mt-6">
        <div><h1 className="font-bold text-[20px]">Quantity</h1></div>
        <div className="input-cont" >
          <input className="border border-black w-96 h-10 px-3 bg-white mr-10 outline-none "></input>
          <label className="mt-1 text-sm text-grey-500 line-clamp-1">Choose a quantity between 10 - 1000 for instant ordering.
            For higher quantities, you will be allowed to request quotations from Sales Team.</label>
        </div>
      </div>

      <div className="price-container">

        <div className="price-tag-cont">

          <div className="total-price">
            <span className="currency">₹</span>
            <span className="amount">44,444</span>
            <span className="tax-info">inclusive of all taxes</span>
          </div>
          <div className="quantity-info">
            for <strong> Qty</strong> (₹4444 / piece)
          </div>

          <div className="bulk-save">
            <span>Buy in bulk and save</span>
            <button className="info-icon" title="View bulk pricing">ⓘ</button>
          </div>

          <h1 className="font-bold mt-14 mb-2">Estimate Delivery</h1>
          <input placeholder="Pincode" className="border border-black bg-white outline-none h-10"></input>


        </div>

        <div>

          <div className="action-buttons-container">
            <button className="btn-upload">
              <span className="btn-icon">📤</span>
              Upload your Files
            </button>
            <button className="btn-create-design">
              <span className="btn-icon">✏️</span>
              Create your Design
            </button>
          </div>
        </div>



      </div>

    </div>


  )
}
export default ProductInfo;
