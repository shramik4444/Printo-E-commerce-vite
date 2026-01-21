import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5002/apparel/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-neutral-400">Loading products...</p>;
    }

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white" >
                <h1 className="text-3xl font-bold text-white">All Products</h1>

                <div className="grid md:grid-cols-2 gap-6" >
                    {products.map((product) => {
                        const data =
                            typeof product.data === "string"
                                ? JSON.parse(product.data)
                                : product.data;

                        return (
                            <div
                                key={product.id}
                                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-3"
                                onClick={() => navigate(`/apparel/products/${product.id}`)}
                            >
                                <h2 className="text-xl font-semibold text-orange-400">
                                    {product.name}
                                </h2>

                                <p className="text-sm text-neutral-400">
                                    Product ID: #{product.id}
                                </p>

                                <Info label="Base Price" value={`₹${data.basePrice}`} />
                                <Info label="Quantity" value={`${data.minQty} – ${data.maxQty}`} />
                                <Info label="Styles" value={data.styles?.join(", ")} />
                                <Info label="Materials" value={data.materials?.join(", ")} />
                                <Info label="Colors" value={data.colors?.join(", ")} />
                                <Info label="Print Sizes" value={data.printSizes?.join(", ")} />
                                <Info label="Print Types" value={data.printTypes?.join(", ")} />
                                <Info
                                    label="Print Locations"
                                    value={data.printLocations?.join(", ")}
                                />

                                <p className="text-xs text-neutral-500 pt-2">
                                    Created at: {new Date(product.created_at).toLocaleString()}
                                </p>
                            </div>
                        );
                    })}

                    {products.length === 0 && (
                        <p className="text-neutral-500">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

const Info = ({ label, value }) => (
    <p className="text-sm text-neutral-300">
        <span className="text-neutral-500">{label}:</span>{" "}
        {value || "-"}
    </p>
);
