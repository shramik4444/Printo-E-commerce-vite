// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../../../../Backend/Services/AdminApi";

// export default function ProductList() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     // useEffect(() => {
//     //     axios
//     //         .get("http://localhost:5002/admin/products")
//     //         .then((res) => {
//     //             setProducts(res.data);
//     //         })
//     //         .catch((err) => {
//     //             console.error("Error fetching products:", err);
//     //         })
//     //         .finally(() => setLoading(false));
//     // }, []);



//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await adminApi.get("/products");
//                 setProducts(res.data);
//             } catch (err) {
//                 console.error("Error fetching products:", err);

//                 if (err.response?.status === 401 || err.response?.status === 403) {
//                     navigate("/admin/login");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [navigate]);





//     if (loading) {
//         return <p className="text-neutral-400">Loading products...</p>;
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold">Products</h2>
//                 <button className="bg-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-600">
//                     + Add Product
//                 </button>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-lg border border-neutral-800">
//                 <table className="w-full text-sm">
//                     <thead className="bg-neutral-900 text-neutral-400">
//                         <tr>
//                             <th className="p-4 text-left">ID</th>
//                             <th className="p-4 text-left">Name</th>
//                             <th className="p-4 text-left">Base Price</th>
//                             <th className="p-4 text-left">Quantity</th>
//                             <th className="p-4 text-left">Colors</th>
//                             <th className="p-4 text-left">Materials</th>
//                             <th className="p-4 text-center">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {products.map((product) => {
//                             const data =
//                                 typeof product.data === "string"
//                                     ? JSON.parse(product.data)
//                                     : product.data;

//                             return (
//                                 <tr
//                                     key={product.id}
//                                     className="border-t border-neutral-800 hover:bg-neutral-800/40"
//                                 >
//                                     <td className="p-4 text-neutral-400">
//                                         #{product.id}
//                                     </td>

//                                     <td className="p-4 font-medium">
//                                         {product.name}
//                                     </td>

//                                     <td className="p-4">
//                                         ₹{data?.basePrice ?? "-"}
//                                     </td>

//                                     <td className="p-4">
//                                         {data?.minQty ?? "-"} – {data?.maxQty ?? "-"}
//                                     </td>

//                                     <td className="p-4 text-neutral-400">
//                                         {data?.colors?.join(", ") || "-"}
//                                     </td>

//                                     <td className="p-4 text-neutral-400">
//                                         {data?.materials?.join(", ") || "-"}
//                                     </td>

//                                     <td className="p-4 text-center">
//                                         <button
//                                             onClick={() =>
//                                                 navigate(`/admin/products/edit/${product.id}`)
//                                             }
//                                             className="text-blue-400 hover:underline"
//                                         >
//                                             Edit
//                                         </button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}

//                         {products.length === 0 && (
//                             <tr>
//                                 <td
//                                     colSpan="7"
//                                     className="p-6 text-center text-neutral-500"
//                                 >
//                                     No products found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }









import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../../../Backend/Services/AdminApi";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await adminApi.get("/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);

                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate("/admin/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);
    //   console.log("admin product details,----->", products);
    if (loading) {
        return <p className="text-neutral-400 p-6">Loading products...</p>;
    }

    return (
        <div className="p-8 space-y-6 bg-neutral-950 min-h-screen text-neutral-100">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold">Products</h2>
                    <p className="text-neutral-400 text-sm">
                        Manage all apparel products
                    </p>
                </div>

                <div className="flex gap-3">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition"
                    >
                        ← Back to Dashboard
                    </button>

                    {/* Add Product */}
                    <button
                        onClick={() => navigate("/admin/products/add")}
                        className="px-4 py-2 rounded bg-orange-500 font-semibold hover:bg-orange-600 transition"
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-800 text-neutral-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Base Price</th>
                            <th className="p-4 text-left">Quantity</th>
                            <th className="p-4 text-left">Colors</th>
                            <th className="p-4 text-left">Materials</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => {
                            const data =
                                typeof product.data === "string"
                                    ? JSON.parse(product.data)
                                    : product.data;

                            return (
                                <tr
                                    key={product.id}
                                    className="border-t border-neutral-800 hover:bg-neutral-800/40 transition"
                                >
                                    <td className="p-4 text-neutral-400">#{product.id}</td>

                                    <td className="p-4 font-medium">{product.name}</td>

                                    <td className="p-4">
                                        ₹{data?.basePrice ?? "-"}
                                    </td>

                                    <td className="p-4">
                                        {data?.minQty ?? "-"} – {data?.maxQty ?? "-"}
                                    </td>

                                    <td className="p-4 text-neutral-400">
                                        {data?.colors?.join(", ") || "-"}
                                    </td>

                                    <td className="p-4 text-neutral-400">
                                        {data?.materials?.join(", ") || "-"}
                                    </td>

                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(`/admin/products/edit/${product.id}`)
                                            }
                                            className="text-blue-400 hover:text-blue-300 hover:underline transition"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {products.length === 0 && (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-6 text-center text-neutral-500"
                                >
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
