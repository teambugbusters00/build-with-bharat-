import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
import { useTheme } from "../contexts/ThemeContext";
import { doSignOut } from '../firebase/auth';
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();
    const { userLoggedIn } = useAuth();
    const [open, setOpen] = useState(false);
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-bg shadow-md border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-md" />
                    <span className="font-bold text-lg text-text">{t("navbar.Name")}</span>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden block text-text text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✖" : "☰"}
                </button>

                {/* CENTER NAV (DESKTOP) */}
                <div className="hidden md:flex gap-8 text-text font-medium">
                    <Link to="/" className="hover:text-blue-600 transition">{t("navbar.home")}</Link>
                    <Link to="/report" className="hover:text-blue-600 transition">{t("navbar.ReportIssue")}</Link>
                    <Link to="/service-provider" className="hover:text-blue-600 transition">{t("navbar.ServiceProviders")}</Link>
                    <Link to="/complaint-tracker" className="hover:text-blue-600 transition">{t("navbar.ComplaintTracker")}</Link>
                    {userLoggedIn && <Link to="/profile" className="hover:text-blue-600 transition">{t("navbar.profile")}</Link>}
                </div>

                {/* RIGHT SIDE (DESKTOP) */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />

                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition" onClick={() => { toggleTheme(); }}>🌓</button>
                    {userLoggedIn ? (
                        <button
                            onClick={async () => {
                                await doSignOut();
                                navigate("/", { replace: true });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-text hover:bg-blue-700 transition"
                        >
                            {t("navbar.logout")}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition">{t("navbar.Login")}</Link>
                            <Link to="/signup" className="px-3 py-1.5 rounded-lg bg-blue-600 text-text hover:bg-blue-700 transition">{t("navbar.SignUp")}</Link>
                        </>
                    )}
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white border-t px-4 py-3 space-y-3 shadow-md">

                    <Link to="/" onClick={() => setOpen(false)} className="block py-1 text-text font-medium hover:text-blue-600">Home</Link>
                    <Link to="/report" onClick={() => setOpen(false)} className="block py-1 text-text font-medium hover:text-blue-600">Report Issue</Link>
                    <Link to="/service-provider" onClick={() => setOpen(false)} className="block py-1 text-text font-medium hover:text-blue-600">Service Providers</Link>
                    <Link to="/complaint-tracker" onClick={() => setOpen(false)} className="block py-1 text-text font-medium hover:text-blue-600">Complaint Tracker</Link>

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