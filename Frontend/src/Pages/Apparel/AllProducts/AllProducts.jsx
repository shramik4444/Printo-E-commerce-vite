// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../../../components/Header";

// export default function AllProducts() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get("http://localhost:5002/apparel/products")
//             .then((res) => setProducts(res.data))
//             .catch((err) => console.error("Fetch error:", err))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) {
//         return <p className="text-neutral-400">Loading products...</p>;
//     }

//     return (
//         <div>
//             <Header />
//             <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white" >
//                 <h1 className="text-3xl font-bold text-white">All Products</h1>

//                 <div className="grid md:grid-cols-2 gap-6" >
//                     {products.map((product) => {
//                         const data =
//                             typeof product.data === "string"
//                                 ? JSON.parse(product.data)
//                                 : product.data;

//                         return (
//                             <div
//                                 key={product.id}
//                                 className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3"
//                                 onClick={() => navigate(`/apparel/products/${product.id}`)}
//                             >
//                                 <h2 className="text-xl font-semibold text-orange-400">
//                                     {product.name}
//                                 </h2>

//                                 <p className="text-sm text-neutral-400">
//                                     Product ID: #{product.id}
//                                 </p>

//                                 <Info label="Base Price" value={`₹${data.basePrice}`} />
//                                 <Info label="Quantity" value={`${data.minQty} – ${data.maxQty}`} />
//                                 <Info label="Styles" value={data.styles?.join(", ")} />
//                                 <Info label="Materials" value={data.materials?.join(", ")} />
//                                 <Info label="Colors" value={data.colors?.join(", ")} />
//                                 <Info label="Print Sizes" value={data.printSizes?.join(", ")} />
//                                 <Info label="Print Types" value={data.printTypes?.join(", ")} />
//                                 <Info
//                                     label="Print Locations"
//                                     value={data.printLocations?.join(", ")}
//                                 />

//                                 <p className="text-xs text-neutral-500 pt-2">
//                                     Created at: {new Date(product.created_at).toLocaleString()}
//                                 </p>
//                             </div>
//                         );
//                     })}

//                     {products.length === 0 && (
//                         <p className="text-neutral-500">No products found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const Info = ({ label, value }) => (
//     <p className="text-sm text-neutral-300">
//         <span className="text-neutral-500">{label}:</span>{" "}
//         {value || "-"}
//     </p>
// );




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5002/apparel/products")
            .then((res) => setProducts(res.data || []))
            .catch((err) => console.error("Fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center py-20 text-neutral-500">Loading...</p>;
    }

    return (
        <>
            <Header />

            {/* CATEGORY HEADER */}
            <section className="bg-neutral-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-bold">Custom T-Shirts</h1>
                    <p className="mt-3 text-neutral-400 max-w-2xl">
                        High quality custom T-shirts for branding, events, uniforms and promotions.
                        Available in multiple fabrics, colours and print options.
                    </p>
                </div>
            </section>

            {/* PRODUCTS GRID */}
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => {
                        const data =
                            typeof product.data === "string"
                                ? JSON.parse(product.data)
                                : product.data;

                        const image =
                            Array.isArray(product.images) && product.images.length
                                ? product.images[0]
                                : "/placeholder.png";

                        return (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/apparel/products/${product.id}`)}
                                className="cursor-pointer group"
                            >
                                {/* IMAGE */}
                                <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
                                    <img
                                        src={image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="mt-4 space-y-1">
                                    <h3 className="font-semibold text-neutral-900 text-lg">
                                        {product.name}
                                    </h3>

                                    <p className="text-orange-600 font-semibold">
                                        From ₹{data?.basePrice || "--"}
                                    </p>

                                    <p className="text-sm text-neutral-500">
                                        {data?.materials?.[0] || "Premium Fabric"}
                                        {" • "}
                                        {data?.colors?.length || 0} colours
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {products.length === 0 && (
                        <p className="text-neutral-500 col-span-full">
                            No products available.
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
