import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:5002/auth/admin/login",
                form
            );

            // 🔐 Save token securely
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            navigate("/admin/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-neutral-800 p-8 rounded-lg space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">
                    Admin Login
                </h2>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-neutral-700 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-neutral-700 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 py-3 rounded font-semibold"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
