import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Header from "../components/Header";

export default function Cart() {
    const [cart, setCart] = useState([]);




    const deleteItem = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5002/cart/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Optimistic UI update (industry standard)
            setCart(prev => prev.filter(item => item.id !== orderId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };



    // const { id } = useParams();
    // const [image, setImage] = useState([]);


    // useEffect(() => {

    //     axios.get(`http://localhost:5002/apparel/products/${id}`)
    //         .then(res => {
    //             const row = res.data;
    //             const data = typeof row === "string" ? JSON.parse(row.data) : row.data;
    //             setImage(res.data.images);
    //         })
    // }, [id])

    // console.log("list of imagesssssssss", id);






    useEffect(() => {
        axios
            .get("http://localhost:5002/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setCart(res.data))
            .catch((err) => console.error(err));
    }, []);


    console.log("cart data ---------->", cart);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-semibold text-black">Shopping Cart</h2>

                        {cart.length === 0 && (
                            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
                                Your cart is empty
                            </div>
                        )}

                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow p-4 flex gap-4"
                            >
                                {/* Product Image (future-ready) */}
                                <div className="w-24 h-24 bg-gray-100 rounded-lg">
                                    <img src={item.image} />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{item.product_name}</h4>
                                    <p className="text-sm text-gray-500">
                                        Style: {item.style} • Material: {item.material}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Color: {item.color} • Print: {item.print_type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Print Size: {item.print_size}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <p className="text-sm text-gray-500">
                                            Locations: {
                                                Array.isArray(item.print_locations)
                                                    ? item.print_locations.join(", ")
                                                    : typeof item.print_locations === "string"
                                                        ? item.print_locations
                                                        : "N/A"
                                            }
                                        </p>

                                    </p>

                                    <div className="flex items-center justify-between mt-3">
                                        <span className="font-semibold">Qty: {item.quantity}</span>
                                        <span className="font-bold text-orange-600">₹{item.price}</span>
                                    </div>
                                </div>

                                {/* Remove */}
                                <button className="text-red-500 hover:text-red-700" onClick={() => {
                                    if (confirm("Remove item from cart?")) {
                                        deleteItem(item.id);
                                    }
                                }}
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow p-6 h-fit">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span>GST (18%)</span>
                            <span>₹{(subtotal * 0.18).toFixed(2)}</span>
                        </div>

                        <div className="border-t my-3" />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{(subtotal * 1.18).toFixed(2)}</span>
                        </div>

                        <button className="mt-6 w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
