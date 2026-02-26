import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../../../Backend/Services/AdminApi";

export default function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [data, setData] = useState({
        basePrice: "",
        minQty: "",
        maxQty: "",
        colors: [],
        materials: [],
        styles: [],
        printSizes: [],
        printTypes: [],
        printLocations: []
    });

    const handleSubmit = async () => {
        try {
            const res = await adminApi.post("/products", {
                name,
                data
            });

            navigate(`/admin/products/edit/${res.data.productId}`);
        } catch (err) {
            alert("Failed to create product");
            console.error(err);
        }
    };

    return (
        <div className="p-8 bg-neutral-950 min-h-screen text-neutral-100 space-y-6">
            <h2 className="text-3xl font-bold">Add Product</h2>

            {/* Product Name */}
            <input
                className="w-full p-3 rounded bg-neutral-900 border border-neutral-800"
                placeholder="Product Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            {/* Base Price */}
            <input
                className="w-full p-3 rounded bg-neutral-900 border border-neutral-800"
                placeholder="Base Price"
                value={data.basePrice}
                onChange={e => setData({ ...data, basePrice: e.target.value })}
            />

            {/* Quantity */}
            <div className="flex gap-4">
                <input
                    className="w-full p-3 rounded bg-neutral-900"
                    placeholder="Min Qty"
                    value={data.minQty}
                    onChange={e => setData({ ...data, minQty: e.target.value })}
                />
                <input
                    className="w-full p-3 rounded bg-neutral-900"
                    placeholder="Max Qty"
                    value={data.maxQty}
                    onChange={e => setData({ ...data, maxQty: e.target.value })}
                />
            </div>

            {/* Colors */}
            <input
                className="w-full p-3 rounded bg-neutral-900"
                placeholder="Colors (comma separated)"
                onChange={e =>
                    setData({ ...data, colors: e.target.value.split(",") })
                }
            />

            {/* Materials */}
            <input
                className="w-full p-3 rounded bg-neutral-900"
                placeholder="Materials (comma separated)"
                onChange={e =>
                    setData({ ...data, materials: e.target.value.split(",") })
                }
            />

            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-orange-500 rounded font-semibold hover:bg-orange-600"
            >
                Create Product
            </button>
        </div>
    );
}






// --- a/file:///home/kanny/Desktop/printo/Backend/Routes/Admin/AdminProductRoutes.js
// +++ b/file:///home/kanny/Desktop/printo/Backend/Routes/Admin/AdminProductRoutes.js
// @@ -52,6 +52,7 @@
//          return res.status(404).json({ error: "Product not found" });
//      }

//      // 2️⃣ Merge existing data with new data
//      const existingData =
//          typeof existing.data === "string"
//              ? JSON.parse(existing.data)
//              : existing.data;

//      const mergedData = {
//          ...existingData,
//          ...data
//      };

//      // 3️⃣ Update DB
//      await db.promise().query(
//          "UPDATE apparel_products SET name = ?, data = ? WHERE id = ?",
//          [name.trim(), JSON.stringify(mergedData), productId]
//      );

//      return res.json({ message: "Product updated successfully" });          