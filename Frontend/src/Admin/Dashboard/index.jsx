import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut
} from "lucide-react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="min-h-screen flex bg-neutral-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-orange-500">
                        Admin Panel
                    </h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Management Console
                    </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 flex-1">
                    <SidebarItem
                        label="Dashboard"
                        icon={<LayoutDashboard size={18} />}
                        active={isActive("/admin/dashboard")}
                        onClick={() => navigate("/admin/dashboard")}
                    />

                    <SidebarItem
                        label="Products"
                        icon={<Package size={18} />}
                        active={isActive("/admin/products")}
                        onClick={() => navigate("/admin/products")}
                    />

                    <SidebarItem
                        label="Orders"
                        icon={<ShoppingCart size={18} />}
                        active={isActive("/admin/orders")}
                        onClick={() => navigate("/admin/orders")}
                    />

                    <SidebarItem
                        label="Users"
                        icon={<Users size={18} />}
                        active={isActive("/admin/users")}
                        onClick={() => navigate("/admin/users")}
                    />
                </nav>

                {/* Footer / Logout */}
                <div className="pt-4 border-t border-neutral-800">
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/admin/login");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                       text-red-400 hover:bg-neutral-800"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

/* ---------------- Sidebar Item ---------------- */

function SidebarItem({ label, icon, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
        ${active
                    ? "bg-orange-500 text-black font-semibold"
                    : "text-neutral-300 hover:bg-neutral-800"
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}


















