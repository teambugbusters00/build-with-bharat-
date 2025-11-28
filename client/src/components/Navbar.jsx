import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { X, Menu, Home} from "lucide-react";

const Navbar = () => {
    const { t } = useTranslation();
    const { userLoggedIn } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-xl shadow-lg border-b border-gray-200/30" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

                {/* LEFT (logo + name) */}
                <div className="flex items-center gap-2">
                    <img src="/GaoConnect.png" alt="Gaon Connect Logo" className="h-12 md:h-16 lg:h-20 w-auto" />
                </div>

                {/* RIGHT (mobile): language + menu */}
                <div className="flex items-center gap-3 md:hidden">
                    <LanguageSwitcher />
                    <button
                        className="text-gray-800 text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex gap-8 text-gray-800 font-medium">
                    <Link to="/" className="hover:text-blue-800 transition-all duration-200 hover:underline underline-offset-4 flex items-center"><Home className="w-8 h-8 mr-2" />{t("navbar.home")}</Link>
                    <Link to="/report" className="hover:text-blue-800 transition-all duration-200 hover:underline underline-offset-4">{t("navbar.ReportIssue")}</Link>
                    <Link to="/service-provider" className="hover:text-blue-800 transition-all duration-200 hover:underline underline-offset-4">{t("navbar.ServiceProviders")}</Link>
                    <Link to="/complaint-tracker" className="hover:text-blue-800 transition-all duration-200 hover:underline underline-offset-4">{t("navbar.ComplaintTracker")}</Link>
                    <Link to="/community-updates" className="hover:text-blue-800 transition-all duration-200 hover:underline underline-offset-4">{t("navbar.communityUpdates")}</Link>

                    {userLoggedIn && (
                        <Link to="/profile" className="hover:text-blue-800 transition">
                            {t("navbar.profile")}
                        </Link>
                    )}
                </div>

                {/* RIGHT (desktop): language, auth */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />

                    {userLoggedIn ? (
                        <button
                            onClick={async () => {
                                await doSignOut();
                                navigate("/", { replace: true });
                            }}
                            className="px-5 py-2.5 rounded-xl bg-white/20 text-gray-800 hover:bg-white/30 transition-all duration-200 font-medium min-h-[44px] border border-white/30"
                        >
                            {t("navbar.logout")}
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-xl border border-white/30 text-gray-800 hover:bg-white/20 transition-all duration-200 font-medium min-h-[44px]"
                            >
                                {t("navbar.Login")}
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2.5 rounded-xl bg-white/20 text-gray-800 hover:bg-white/30 transition-all duration-200 font-medium min-h-[44px] border border-white/30"
                            >
                                {t("navbar.SignUp")}
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-white/30 px-4 py-3 space-y-3 shadow-md">

                    <Link to="/" onClick={() => setOpen(false)} className="block py-1 text-gray-800 font-medium hover:text-blue-800 flex items-center">
                        <Home className="w-8 h-8 mr-2" />{t("navbar.home")}
                    </Link>

                    <Link to="/report" onClick={() => setOpen(false)} className="block py-1 text-gray-800 font-medium hover:text-blue-800">
                        {t("navbar.ReportIssue")}
                    </Link>

                    <Link to="/service-provider" onClick={() => setOpen(false)} className="block py-1 text-gray-800 font-medium hover:text-blue-800">
                        {t("navbar.ServiceProviders")}
                    </Link>

                    <Link to="/complaint-tracker" onClick={() => setOpen(false)} className="block py-1 text-gray-800 font-medium hover:text-blue-800">
                        {t("navbar.ComplaintTracker")}
                    </Link>

                    <Link to="/community-updates" onClick={() => setOpen(false)} className="block py-1 text-gray-800 font-medium hover:text-blue-800">
                        {t("navbar.communityUpdates")}
                    </Link>

                    {/* AUTH buttons */}
                    <div className="flex flex-col text-center gap-3 pt-2">

                        {userLoggedIn ? (
                            <button
                                onClick={async () => {
                                    await doSignOut();
                                    setOpen(false);
                                    navigate("/", { replace: true });
                                }}
                                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-medium min-h-[44px]"
                            >
                                {t("navbar.logout")}
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium min-h-[44px] block text-center"
                                >
                                    {t("navbar.Login")}
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-medium min-h-[44px] block text-center"
                                >
                                    {t("navbar.SignUp")}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
