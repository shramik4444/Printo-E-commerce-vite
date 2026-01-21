import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Common/axios";

import ProductDetails from "./components/ProductDetail";
import ProductSpecs from "./components/ProductSpecs";
import ProductCarousel from "./components/ProductCarousel";
import ProductPreview from "./components/ProductReview";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const TABS = ["basic", "details", "specs", "carousels", "preview"];
    const [activeTab, setActiveTab] = useState("basic");


    const [product, setProduct] = useState({
        name: "",
        basePrice: "",
        minQty: "",
        maxQty: "",
        colors: "",
        materials: "",
        styles: "",
        printSizes: "",
        printTypes: "",
        printLocations: "",
    });


    const [details, setDetails] = useState({
        tagline: "",
        features: [],
        keyFeature: "",
        delivery: "",
        additionalInfo: ""
    });


    const [specs, setSpecs] = useState({
        overview: "",
        specifications: "",
        designGuidelines: "",
        washCare: ""
    });

    const [carousels, setCarousels] = useState({
        primary: [],
        secondary: []
    });




    const handleDetailsChange = (e) => {
        const { name, value } = e.target;

        setDetails((prev) => ({
            ...prev,
            [name]:
                name === "features"
                    ? value.split("\n").filter(Boolean)
                    : value
        }));
    };



    useEffect(() => {
        api.get(`/admin/products/${id}`).then(res => {
            console.log("fetched product--------->", res.data);
            const p = res.data;
            const parsed = typeof p.data === "string" ? JSON.parse(p.data) : p.data;

            setProduct({
                name: p.name || "",
                basePrice: parsed.basePrice?.toString() || "",
                minQty: parsed.minQty?.toString() || "",
                maxQty: parsed.maxQty?.toString() || "",
                colors: (parsed.colors || []).join(", "),
                materials: (parsed.materials || []).join(", "),
                styles: (parsed.styles || []).join(", "),
                printSizes: (parsed.printSizes || []).join(", "),
                printTypes: (parsed.printTypes || []).join(", "),
                printLocations: (parsed.printLocations || []).join(", "),
            });

            setDetails({
                tagline: p.details?.tagline || "",
                features: Array.isArray(p.details?.features)
                    ? p.details.features.map(f =>
                        typeof f === "string" ? f : `${f.label}: ${f.value}`
                    )
                    : [],

                keyFeature: p.details?.keyFeature || "",
                delivery: p.details?.delivery || "",
                additionalInfo: p.details?.additionalInfo || ""
            });

            setSpecs({
                overview: p.specifications?.overview || "",
                specifications: p.specifications?.specifications || "",
                designGuidelines: p.specifications?.designGuidelines || "",
                washCare: p.specifications?.washCare || ""
            });



            setCarousels({
                primary: p.carousels?.primary || [],
                secondary: p.carousels?.secondary || []
            });



        });
    }, [id]);




    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const toArray = (value) =>
        value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const payload = { name: product.name?.trim() || undefined, data: {} };

        const payload = {
            name: product.name,
            data: {},
            details,
            specifications: specs
        };


        if (product.basePrice) payload.data.basePrice = Number(product.basePrice);
        if (product.minQty) payload.data.minQty = Number(product.minQty);
        if (product.maxQty) payload.data.maxQty = Number(product.maxQty);
        if (product.colors) payload.data.colors = toArray(product.colors);
        if (product.materials) payload.data.materials = toArray(product.materials);
        if (product.styles) payload.data.styles = toArray(product.styles);
        if (product.printSizes) payload.data.printSizes = toArray(product.printSizes);
        if (product.printTypes) payload.data.printTypes = toArray(product.printTypes);
        if (product.printLocations)
            payload.data.printLocations = toArray(product.printLocations);

        try {
            await api.put(`/admin/products/${id}`, payload);
            alert("Product updated successfully");
            navigate("/admin/products");
        } catch (err) {
            console.error("UPDATE ERROR:", err);
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 p-10 text-neutral-100">
            <div className="max-w-4xl mx-auto bg-neutral-900 rounded-xl shadow-lg border border-neutral-800">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-800">
                    <div>
                        <h2 className="text-2xl font-bold">Edit Product</h2>
                        <p className="text-sm text-neutral-400">
                            Update product configuration and pricing
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/products")}
                        className="text-sm px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 transition"
                    >
                        ← Back
                    </button>
                </div>
                <div className="flex gap-2 px-8 pt-6 border-b border-neutral-800">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-4 py-2 text-sm capitalize rounded-t
                ${activeTab === tab
                                    ? "bg-neutral-900 border border-b-0 border-neutral-800 text-orange-400"
                                    : "text-neutral-400 hover:text-neutral-200"}
            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Form */}


                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {activeTab === "basic" && (
                        <div className="grid grid-cols-2 gap-6">
                            <Input label="Product Name" name="name" value={product.name} onChange={handleChange} />
                            <Input label="Base Price" name="basePrice" value={product.basePrice} onChange={handleChange} />

                            <Input label="Min Quantity" name="minQty" value={product.minQty} onChange={handleChange} />
                            <Input label="Max Quantity" name="maxQty" value={product.maxQty} onChange={handleChange} />

                            <Textarea label="Colors (comma separated)" name="colors" value={product.colors} onChange={handleChange} />
                            <Textarea label="Materials" name="materials" value={product.materials} onChange={handleChange} />

                            <Textarea label="Styles" name="styles" value={product.styles} onChange={handleChange} />
                            <Textarea label="Print Sizes" name="printSizes" value={product.printSizes} onChange={handleChange} />

                            <Textarea label="Print Types" name="printTypes" value={product.printTypes} onChange={handleChange} />
                            <Textarea label="Print Locations" name="printLocations" value={product.printLocations} onChange={handleChange} />

                            <div className="col-span-2 flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="px-6 py-3 rounded bg-neutral-800 hover:bg-neutral-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 font-semibold"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "details" && (
                        <ProductDetails
                            details={details}
                            id={id}
                            onChange={handleDetailsChange}
                        />
                    )}

                    {activeTab === "specs" && (
                        <ProductSpecs
                            specs={specs}
                            id={id}
                            onChange={(e) =>
                                setSpecs({ ...specs, [e.target.name]: e.target.value })
                            }
                        />
                    )}

                    {activeTab === "carousels" && (
                        <ProductCarousel productId={id} />
                    )}

                    {/* Footer buttons always visible */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-neutral-800">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="px-6 py-3 rounded bg-neutral-800 hover:bg-neutral-700"
                        >
                            Cancel
                        </button>

                        {/* <button
                            type="submit"
                            className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 font-semibold"
                        >
                            Save Changes
                        </button> */}
                    </div>


                    {activeTab === "preview" && (
                        <ProductPreview
                            product={product}
                            details={details}
                            specs={specs}
                            carousels={[]} // later connect carousel state
                        />
                    )}


                </form>



            </div>
        </div>
    );
}

/* 🔹 Reusable Inputs */

function Input({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                {...props}
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-neutral-400">{label}</label>
            <textarea
                {...props}
                rows={3}
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}

































// useEffect(() => {
//     api.get(`/admin/products/${id}`)
//         .then((res) => {
//             const p = res.data;
//             const parsed = typeof p.data === "string" ? JSON.parse(p.data) : p.data;

//             setProduct({
//                 name: p.name || "",
//                 basePrice: parsed.basePrice?.toString() || "",
//                 minQty: parsed.minQty?.toString() || "",
//                 maxQty: parsed.maxQty?.toString() || "",
//                 colors: (parsed.colors || []).join(", "),
//                 materials: (parsed.materials || []).join(", "),
//                 styles: (parsed.styles || []).join(", "),
//                 printSizes: (parsed.printSizes || []).join(", "),
//                 printTypes: (parsed.printTypes || []).join(", "),
//                 printLocations: (parsed.printLocations || []).join(", "),
//             });
//         })
//         .catch((err) => console.error("FETCH ERROR:", err));
// }, [id]);











{/* <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 p-8"
                >
                    <Input label="Product Name" name="name" value={product.name} onChange={handleChange} />
                    <Input label="Base Price" name="basePrice" value={product.basePrice} onChange={handleChange} />

                    <Input label="Min Quantity" name="minQty" value={product.minQty} onChange={handleChange} />
                    <Input label="Max Quantity" name="maxQty" value={product.maxQty} onChange={handleChange} />

                    <Textarea label="Colors (comma separated)" name="colors" value={product.colors} onChange={handleChange} />
                    <Textarea label="Materials" name="materials" value={product.materials} onChange={handleChange} />

                    <Textarea label="Styles" name="styles" value={product.styles} onChange={handleChange} />
                    <Textarea label="Print Sizes" name="printSizes" value={product.printSizes} onChange={handleChange} />

                    <Textarea label="Print Types" name="printTypes" value={product.printTypes} onChange={handleChange} />
                    <Textarea label="Print Locations" name="printLocations" value={product.printLocations} onChange={handleChange} />

                    <div className="col-span-2 flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="px-6 py-3 rounded bg-neutral-800 hover:bg-neutral-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 font-semibold"
                        >
                            Save Changes
                        </button>
                    </div>
                </form> */}






// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import api from "../../Common/axios";

// export default function EditProduct() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     console.log("EditProduct rendered, id =", id);


//     const [product, setProduct] = useState({
//         name: "",
//         basePrice: "",
//         minQty: "",
//         maxQty: "",
//         colors: "",
//         materials: "",
//         styles: "",
//         printSizes: "",
//         printTypes: "",
//         printLocations: "",
//     });




//     useEffect(() => {
//         api.get(`/admin/products/${id}`).then((res) => {
//             console.log("FETCH SUCCESS");

//             const p = res.data;

//             const parsedData = typeof p.data === "string" ? JSON.parse(p.data) : p.data;

//             console.log("PARSED DATA:", parsedData);

//             setProduct({
//                 name: p.name || "",
//                 basePrice: parsedData.basePrice?.toString() || "",
//                 minQty: parsedData.minQty?.toString() || "",
//                 maxQty: parsedData.maxQty?.toString() || "",
//                 colors: (parsedData.colors || []).join(", "),
//                 materials: (parsedData.materials || []).join(", "),
//                 styles: (parsedData.styles || []).join(", "),
//                 printSizes: (parsedData.printSizes || []).join(", "),
//                 printTypes: (parsedData.printTypes || []).join(", "),
//                 printLocations: (parsedData.printLocations || []).join(", "),
//             });
//         })
//             .catch((err) => {
//                 console.error("FETCH ERROR:", err);
//             });
//     }, [id]);






//     // 2️⃣ Handle input change
//     const handleChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };


//     const toArray = (value) =>
//         value
//             ? value.split(",").map(v => v.trim()).filter(Boolean)
//             : [];



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("saving....")

//         const payload = {
//             name: product.name?.trim() || undefined,
//             data: {}
//         };

//         if (product.basePrice !== "")
//             payload.data.basePrice = Number(product.basePrice);

//         if (product.minQty !== "")
//             payload.data.minQty = Number(product.minQty);

//         if (product.maxQty !== "")
//             payload.data.maxQty = Number(product.maxQty);

//         if (product.colors.trim())
//             payload.data.colors = toArray(product.colors);

//         if (product.materials.trim())
//             payload.data.materials = toArray(product.materials);

//         if (product.styles.trim())
//             payload.data.styles = toArray(product.styles);

//         if (product.printSizes.trim())
//             payload.data.printSizes = toArray(product.printSizes);

//         if (product.printTypes.trim())
//             payload.data.printTypes = toArray(product.printTypes);

//         if (product.printLocations.trim())
//             payload.data.printLocations = toArray(product.printLocations);



//         try {
//             await api.put(`/admin/products/${id}`, payload);
//             alert("Product updated");
//             navigate("/admin/products");
//         } catch (err) {
//             console.error("UPDATE ERROR:", err);
//             alert(err.response?.data?.message || "Update failed");
//         }

//     };





//     return (
//         <div className="max-w-3xl space-y-6 m-20 mb-14">
//             <h2 className="text-2xl font-bold">Edit Product</h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//                 <Input label="Product Name" name="name" value={product.name} onChange={handleChange} />
//                 <Input label="Base Price" name="basePrice" value={product.basePrice} onChange={handleChange} />

//                 <Input label="Min Quantity" name="minQty" value={product.minQty} onChange={handleChange} />
//                 <Input label="Max Quantity" name="maxQty" value={product.maxQty} onChange={handleChange} />

//                 <Textarea label="Colors (comma separated)" name="colors" value={product.colors} onChange={handleChange} />
//                 <Textarea label="Materials" name="materials" value={product.materials} onChange={handleChange} />

//                 <Textarea label="Styles" name="styles" value={product.styles} onChange={handleChange} />
//                 <Textarea label="Print Sizes" name="printSizes" value={product.printSizes} onChange={handleChange} />

//                 <Textarea label="Print Types" name="printTypes" value={product.printTypes} onChange={handleChange} />
//                 <Textarea label="Print Locations" name="printLocations" value={product.printLocations} onChange={handleChange} />

//                 <button
//                     type="submit"
//                     className="col-span-2 bg-orange-500 py-3 rounded font-semibold"
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </div>
//     );
// }

// // 🔹 Reusable Inputs
// function Input({ label, ...props }) {
//     return (
//         <div>
//             <label className="text-sm text-neutral-400">{label}</label>
//             <input {...props} className="w-full p-3 bg-neutral-800 rounded mt-1" />
//         </div>
//     );
// }

// function Textarea({ label, ...props }) {
//     return (
//         <div>
//             <label className="text-sm text-neutral-400">{label}</label>
//             <textarea {...props} className="w-full p-3 bg-neutral-800 rounded mt-1" />
//         </div>
//     );
// }

