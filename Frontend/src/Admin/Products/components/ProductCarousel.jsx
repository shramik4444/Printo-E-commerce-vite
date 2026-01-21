import { useEffect, useState } from "react";
//import axios from "../../../../../Backend/Utils"; // adjust if needed
import api from "../../../Common/axios";
import axios from "axios";

const emptyCard = {
    carousel_type: "primary",
    card_order: 1,
    image_url: "",
    card_name: "",
    card_description: ""
};

export default function ProductCarousel({ productId }) {
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("im inside the productcarousel jsx file");

    useEffect(() => {
        fetchCarousels();
    }, [productId]);

    const fetchCarousels = async () => {
        try {
            const res = await api.get(`admin/products/${productId}/carousels`);
            setCarousels(res.data);
            console.log("carousels from productcarousels ----->", res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load carousels");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        const updated = [...carousels];
        updated[index][field] = value;
        setCarousels(updated);
    };

    const addCarousel = (type) => {
        setCarousels([
            ...carousels,
            { ...emptyCard, carousel_type: type, product_id: productId }
        ]);
    };

    const removeCarousel = async (id, index) => {
        if (!window.confirm("Delete this card?")) return;

        if (id) {
            await axios.delete(`/admin/products/carousels/${id}`);
        }

        setCarousels(carousels.filter((_, i) => i !== index));
    };

    const saveCarousels = async () => {
        try {
            await axios.put(`/admin/products/${productId}/carousels`, {
                carousels
            });
            alert("Carousels saved");
        } catch (err) {
            console.error(err);
            alert("Save failed");
        }
    };

    if (loading) return <p>Loading carousels...</p>;

    const renderSection = (type) => (
        <>
            <h3 style={{ marginTop: 20 }}>
                {type === "primary" ? "Primary Carousel" : "Secondary Carousel"}
            </h3>

            {carousels
                .filter(c => c.carousel_type === type)
                .map((c, index) => (
                    <div key={index} className="card-box">
                        <input
                            placeholder="Image URL"
                            value={c.image_url || ""}
                            onChange={(e) =>
                                handleChange(index, "image_url", e.target.value)
                            }
                        />

                        <input
                            placeholder="Card Name"
                            value={c.card_name || ""}
                            onChange={(e) =>
                                handleChange(index, "card_name", e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Card Description"
                            value={c.card_description || ""}
                            onChange={(e) =>
                                handleChange(index, "card_description", e.target.value)
                            }
                        />

                        <input
                            type="number"
                            placeholder="Order"
                            value={c.card_order || 0}
                            onChange={(e) =>
                                handleChange(index, "card_order", e.target.value)
                            }
                        />

                        <button
                            className="danger"
                            onClick={() => removeCarousel(c.id, index)}
                        >
                            Delete
                        </button>
                    </div>
                ))}

            <button onClick={() => addCarousel(type)}>
                + Add {type} card
            </button>
        </>
    );

    return (
        <div>
            <h2>Product Carousels</h2>

            {renderSection("primary")}
            {renderSection("secondary")}

            <hr />

            <button className="primary" onClick={saveCarousels}>
                Save Carousels
            </button>
        </div>
    );
}
