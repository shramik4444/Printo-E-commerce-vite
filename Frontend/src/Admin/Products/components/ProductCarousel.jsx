
import { useEffect, useState } from "react";
import api from "../../../Common/axios";

const createEmptyCard = (type, order) => ({
    id: null, // important: null = new card
    carousel_type: type,
    card_order: order,
    image_url: "",
    card_name: "",
    card_description: ""
});

export default function ProductCarousel({ productId }) {
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCarousels();
    }, [productId]);

    const fetchCarousels = async () => {
        try {
            const res = await api.get(`/admin/products/${productId}/carousels`);
            setCarousels(res.data || []);
        } catch (err) {
            console.error(err);
            alert("Failed to load carousels");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        setCarousels(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addCarousel = (type) => {
        setCarousels(prev => {
            const order =
                prev.filter(c => c.carousel_type === type).length + 1;

            return [...prev, createEmptyCard(type, order)];
        });
    };

    const removeCarousel = async (card, index) => {
        if (!window.confirm("Delete this carousel card?")) return;

        try {
            if (card.id) {
                await api.delete(`/admin/products/carousels/${card.id}`);
            }

            setCarousels(prev => prev.filter((_, i) => i !== index));
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };



    const saveCarousels = async () => {
        setSaving(true);

        try {
            const normalized = ["primary", "secondary"].flatMap(type => {
                return carousels
                    .filter(c =>
                        c.carousel_type === type &&
                        c.image_url?.trim() !== "" &&
                        c.card_name?.trim() !== ""
                    )
                    .sort((a, b) => a.card_order - b.card_order)
                    .map((c, index) => ({
                        product_id: productId,
                        carousel_type: c.carousel_type,
                        card_order: index + 1,
                        image_url: c.image_url.trim(),
                        card_name: c.card_name.trim(),
                        card_description: c.card_description || ""
                    }));
            });

            if (!normalized.length) {
                alert("Add at least one valid carousel card");
                return;
            }

            await api.put(`/admin/products/${productId}/carousels`, {
                carousels: normalized
            });

            alert("Carousels saved successfully");
            fetchCarousels();

        } catch (err) {
            console.error("Save failed:", err.response?.data || err);
            alert("Save failed");
        } finally {
            setSaving(false);
        }
    };




    if (loading) {
        return <p className="text-gray-400">Loading carousels...</p>;
    }

    const renderSection = (type, title) => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>

                {/* 🔴 IMPORTANT: type="button" */}
                <button
                    type="button"
                    onClick={() => addCarousel(type)}
                    className="px-4 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 rounded"
                >
                    + Add Card
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carousels
                    .map((c, index) => ({ ...c, _index: index }))
                    .filter(c => c.carousel_type === type)
                    .map(c => (
                        <div
                            key={c.id ?? `new-${c._index}`}
                            className="bg-zinc-900 rounded-xl p-4 flex gap-4"
                        >
                            <img
                                src={c.image_url || "/placeholder.png"}
                                className="w-28 h-28 object-cover rounded-lg"
                                alt=""
                            />

                            <div className="flex-1 space-y-2">
                                <input
                                    className="w-full bg-zinc-800 p-2 rounded"
                                    placeholder="Image URL"
                                    value={c.image_url}
                                    onChange={(e) =>
                                        handleChange(c._index, "image_url", e.target.value)
                                    }
                                />

                                <input
                                    className="w-full bg-zinc-800 p-2 rounded"
                                    placeholder="Card name"
                                    value={c.card_name}
                                    onChange={(e) =>
                                        handleChange(c._index, "card_name", e.target.value)
                                    }
                                />

                                <textarea
                                    className="w-full bg-zinc-800 p-2 rounded"
                                    placeholder="Card description"
                                    value={c.card_description}
                                    onChange={(e) =>
                                        handleChange(
                                            c._index,
                                            "card_description",
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    className="w-full bg-zinc-800 p-2 rounded"
                                    value={c.card_order}
                                    onChange={(e) =>
                                        handleChange(
                                            c._index,
                                            "card_order",
                                            Number(e.target.value)
                                        )
                                    }
                                />

                                {/* 🔴 IMPORTANT: type="button" */}
                                <button
                                    type="button"
                                    onClick={() => removeCarousel(c, c._index)}
                                    className="text-red-400 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            {renderSection("primary", "Primary Carousel")}
            {renderSection("secondary", "Secondary Carousel")}

            <div className="pt-6 border-t border-zinc-800 flex justify-end">
                {/* 🔴 IMPORTANT: type="button" */}
                <button
                    type="button"
                    disabled={saving}
                    onClick={saveCarousels}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Carousels"}
                </button>
            </div>
        </div>
    );
}
