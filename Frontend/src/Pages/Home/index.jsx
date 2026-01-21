//import './index.css';
const Home = () => {
    return (
        <div className="min-h-screen w-screen bg-neutral-900 flex items-center justify-center">
            <div className=" text-center space-y-6 px-4">
                <h1 className="text-4xl font-bold text-white">
                    Welcome to the Home Page
                </h1>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg" onClick={() => window.location.href = '/apparel/products'}>
                    Go to Apparel
                </button>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg" onClick={() => window.location.href = '/corporate-gifts'}>
                    Go to Corporate Gifts
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg" onClick={() => window.location.href = '/admin/login'}>
                    Admin Login
                </button>
            </div>
        </div>
    );
}

export default Home;








