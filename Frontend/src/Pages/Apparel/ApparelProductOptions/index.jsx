// import React, { useState } from 'react';
// import './index.css';

// const ApparelProductOptions = () => {

//   const [formData, setFormData] = useState({
//     style: 'Unisex Collar',
//     material: '100% Cotton 200gsm',
//     fabricColor: 'White - 200gsm',
//     printType: 'Full Colour Print ( Print n Cut )',
//     printLocation: ['Front'],
//     frontPrintSize: '3 x 3 in',
//     quantity: ''
//   });

//   const handleSelectChange = (field, value) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });
//   };

//   const handleQuantityChange = (e) => {
//     setFormData({
//       ...formData,
//       quantity: e.target.value
//     });
//   };

//   const removePrintLocation = (location) => {
//     setFormData({
//       ...formData,
//       printLocation: formData.printLocation.filter(loc => loc !== location)
//     });
//   };

//   const styles = ['Unisex Collar', 'V-Neck', 'Round Neck', 'Polo'];
//   const materials = ['100% Cotton 200gsm', 'Cotton Blend 260gsm', 'Recycled Cotton 240gsm'];
//   const fabricColors = ['White - 200gsm', 'Black - 200gsm', 'Navy Blue - 200gsm', 'Grey Melange - 200gsm'];
//   const printTypes = ['Full Colour Print ( Print n Cut )', 'Embroidery', 'Screen Print', 'Vinyl Print'];
//   const printSizes = ['3 x 3 in', '4 x 4 in', '5 x 5 in', '6 x 6 in'];

//   return (
//     <div className="product-customization-form">
//       {/* Style */}
//       <div className="form-row">
//         <label className="form-label">Style</label>
//         <div className="form-input">
//           <select
//             className="form-select"
//             value={formData.style}
//             onChange={(e) => handleSelectChange('style', e.target.value)}
//           >
//             {styles.map((style, index) => (
//               <option key={index} value={style}>{style}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Material / Fabric */}
//       <div className="form-row">
//         <label className="form-label">Material / Fabric</label>
//         <div className="form-input">
//           <select
//             className="form-select"
//             value={formData.material}
//             onChange={(e) => handleSelectChange('material', e.target.value)}
//           >
//             {materials.map((material, index) => (
//               <option key={index} value={material}>{material}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Fabric Colour */}
//       <div className="form-row">
//         <label className="form-label">Fabric Colour</label>
//         <div className="form-input">
//           <select
//             className="form-select"
//             value={formData.fabricColor}
//             onChange={(e) => handleSelectChange('fabricColor', e.target.value)}
//           >
//             {fabricColors.map((color, index) => (
//               <option key={index} value={color}>{color}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Print Type */}
//       <div className="form-row">
//         <label className="form-label">Print Type</label>
//         <div className="form-input">
//           <select
//             className="form-select"
//             value={formData.printType}
//             onChange={(e) => handleSelectChange('printType', e.target.value)}
//           >
//             {printTypes.map((type, index) => (
//               <option key={index} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Print Location */}
//       <div className="form-row">
//         <label className="form-label">Print Location</label>
//         <div className="form-input">
//           <div className="print-location-tags">
//             {formData.printLocation.map((location, index) => (
//               <div key={index} className="location-tag">
//                 <span>{location}</span>
//                 <button
//                   className="remove-tag-btn"
//                   onClick={() => removePrintLocation(location)}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Front Print Size */}
//       <div className="form-row">
//         <label className="form-label">Front Print Size</label>
//         <div className="form-input">
//           <select
//             className="form-select"
//             value={formData.frontPrintSize}
//             onChange={(e) => handleSelectChange('frontPrintSize', e.target.value)}
//           >
//             {printSizes.map((size, index) => (
//               <option key={index} value={size}>{size}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Quantity */}
//       <div className="form-row">
//         <label className="form-label">Quantity</label>
//         <div className="form-input">
//           <input
//             type="number"
//             className="form-text-input"
//             placeholder="Enter Quantity"
//             value={formData.quantity}
//             onChange={handleQuantityChange}
//             min="1"
//           />
//           <div className="quantity-note">
//             Minimum quantity for your chosen customisation is <strong>1 pieces</strong>.
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// }
// export default ApparelProductOptions;








import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const OptionRow = ({ label, children }) => (
  <div className="grid grid-cols-12 items-start gap-4">
    <label className="col-span-4 text-sm font-medium text-gray-800 pt-3">
      {label}
    </label>
    <div className="col-span-8">{children}</div>
  </div>
);

const SelectBox = ({ value, onChange, options = [] }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full h-[46px] border border-gray-300 rounded-md px-4 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
  >
    {options.map(opt => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const ApparelProductOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [displayImage, setdisplayImage] = useState();
  const [selected, setSelected] = useState({
    style: "",
    material: "",
    color: "",
    printType: "",
    printLocation: [],
    printSize: "",
    quantity: 1
  });


  const handleSubmitOrder = async () => {

    if (!localStorage.getItem("token")) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    const payload = {

      product_id: product.id,
      product_name: product.name,

      style: selected.style,
      material: selected.material,

      color: selected.color,
      print_type: selected.printType,

      print_locations: Array.isArray(selected.printLocation) ? selected.printLocation : [selected.printLocation],
      print_size: selected.printSize,

      quantity: selected.quantity,
      price: 1000,
      image: displayImage
    };


    await axios.post("http://localhost:5002/cart", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    navigate("/cart");
  };



  useEffect(() => {
    axios
      .get(`http://localhost:5002/apparel/products/${id}`)
      .then(res => {
        const row = res.data;
        const data =
          typeof row.data === "string"
            ? JSON.parse(row.data)
            : row.data;

        setProduct({ ...row, data });
        setdisplayImage(res.data.images[0]);

        setSelected({
          style: data.styles?.[0],
          material: data.materials?.[0],
          color: data.colors?.[0],
          printType: data.printTypes?.[0],
          printLocation: data.printLocations || ["Front"],
          printSize: data.printSizes?.[0],
          quantity: data.minQty || 1
        });
      });
  }, [id]);




  console.log("display image --------> ", displayImage);
  if (!product) return null;

  const d = product.data;

  console.log("this is the product ------> ", product);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-14">
      {/* LEFT */}
      <div>
        {/* <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl border"
        /> */}
      </div>

      {/* RIGHT */}
      <div className="space-y-6 text-black">
        <h1 className="text-xl font-semibold">{product.name}</h1>

        <div className="space-y-5">
          <OptionRow label="Style">
            <SelectBox
              value={selected.style}
              onChange={v => setSelected({ ...selected, style: v })}
              options={d.styles}
            />
          </OptionRow>

          <OptionRow label="Material / Fabric">
            <SelectBox
              value={selected.material}
              onChange={v => setSelected({ ...selected, material: v })}
              options={d.materials}
            />
          </OptionRow>

          <OptionRow label="Fabric Colour">
            <SelectBox
              value={selected.color}
              onChange={v => setSelected({ ...selected, color: v })}
              options={d.colors}
            />
          </OptionRow>

          <OptionRow label="Print Type">
            <SelectBox
              value={selected.printType}
              onChange={v => setSelected({ ...selected, printType: v })}
              options={d.printTypes}
            />
          </OptionRow>

          <OptionRow label="Print Location">
            <div className="border rounded-md p-3 min-h-[46px] flex gap-2">
              {selected.printLocation.map(loc => (
                <span
                  key={loc}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {loc}
                  <span className="font-bold cursor-pointer">×</span>
                </span>
              ))}
            </div>
          </OptionRow>

          <OptionRow label="Front Print Size">
            <SelectBox
              value={selected.printSize}
              onChange={v => setSelected({ ...selected, printSize: v })}
              options={d.printSizes}
            />
          </OptionRow>

          <OptionRow label="Quantity">
            <div>
              <input
                type="number"
                min={d.minQty}
                max={d.maxQty}
                value={selected.quantity}
                onChange={e =>
                  setSelected({ ...selected, quantity: e.target.value })
                }
                className="w-full h-[46px] border border-gray-300 rounded-md px-4"
              />
              <p className="text-xs text-gray-500 mt-1">
                Choose a quantity between {d.minQty} – {d.maxQty}
              </p>
            </div>
          </OptionRow>
        </div>

        {/* PRICE */}
        <div className="pt-4">
          <p className="text-2xl font-semibold text-orange-500">
            ₹807.45 <span className="text-sm text-gray-600">inclusive of all taxes</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            for 1 Qty (₹807.45 / piece)
          </p>
          <p className="text-purple-600 text-sm mt-2 cursor-pointer">
            Interested in Bulk Discounts? Enquire Now
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 bg-purple-700 hover:bg-purple-800 text-white h-[48px] rounded-md font-medium flex items-center justify-center gap-2">
            ⬆ Upload your Files
          </button>

          <button className="flex-1 border border-gray-300 h-[48px] rounded-md font-medium flex items-center justify-center gap-2">
            ✏️ Create your Design
          </button>

          <button className="flex-1 border border-gray-300 h-[48px] rounded-md font-medium flex items-center justify-center gap-2" onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApparelProductOptions;
