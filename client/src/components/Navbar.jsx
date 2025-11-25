import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

const Navbar = () => {
    const { userLoggedIn } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white shadow-md border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-md" />
                    <span className="font-bold text-lg text-gray-800">CityHelp</span>

                    <select className="md:hidden p-1 border rounded-md text-sm">
                        <option>EN</option>
                        <option>HI</option>
                        <option>BN</option>
                    </select>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden block text-gray-700 text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✖" : "☰"}
                </button>

                {/* CENTER NAV (DESKTOP) */}
                <div className="hidden md:flex gap-8 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/report" className="hover:text-blue-600 transition">Report Issue</Link>
                    <Link to="/service-provider" className="hover:text-blue-600 transition">Service Providers</Link>
                    <Link to="/complaint-tracker" className="hover:text-blue-600 transition">Complaint Tracker</Link>
                    {userLoggedIn && <Link to="/profile" className="hover:text-blue-600 transition">Profile</Link>}
                </div>

                {/* RIGHT SIDE (DESKTOP) */}
                <div className="hidden md:flex items-center gap-4">
                    <select className="p-1 border rounded-md text-sm">
                        <option>EN</option>
                        <option>HI</option>
                        <option>BN</option>
                    </select>

                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">🌓</button>

                    {userLoggedIn ? (
                        <button
                            onClick={async () => {
                                await doSignOut();
                                navigate("/", { replace: true });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition">Login</Link>
                            <Link to="/signup" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white border-t px-4 py-3 space-y-3 shadow-md">

                    <Link to="/" onClick={() => setOpen(false)} className="block py-1 text-gray-700 font-medium hover:text-blue-600">Home</Link>
                    <Link to="/report" onClick={() => setOpen(false)} className="block py-1 text-gray-700 font-medium hover:text-blue-600">Report Issue</Link>
                    <Link to="/service-provider" onClick={() => setOpen(false)} className="block py-1 text-gray-700 font-medium hover:text-blue-600">Service Providers</Link>
                    <Link to="/complaint-tracker" onClick={() => setOpen(false)} className="block py-1 text-gray-700 font-medium hover:text-blue-600">Complaint Tracker</Link>
                    
                    <div className="flex flex-col text-center gap-3 pt-2">

                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">🌓</button>

                        {userLoggedIn ? (
                            <button
                                onClick={async () => {
                                    await doSignOut();
                                    setOpen(false);
                                    navigate("/", { replace: true });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition">Login</Link>
                                <Link to="/signup" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;