import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error as user types
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("trying to log in ")
    console.log(form);

    try {
      const res = await axios.post("http://localhost:5002/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.name);
      console.log("Response from HTTP login post--->", res.data);
      navigate('/'); // SPA-safe navigation
    }



    // console.log('Login attempt:', { email, password });
    catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    finally {
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">Printo</span>
          </div>
          <p className="text-gray-600 text-sm">
            Welcome back! Please login to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email / Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-neutral-700 rounded pl-10
"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 bg-neutral-700 rounded pl-10
"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white
    ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}
  `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
