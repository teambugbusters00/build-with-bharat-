import { useEffect, useState } from "react";
import { useLocationContext } from "../contexts/LocationContext";

const ServiceProvider = () => {
    const { location, coords } = useLocationContext();

    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [providers, setProviders] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        location: "",
        serviceType: "",
        experience: "",
        coords: { lat: null, lon: null },
    });

    // Auto-fill location + coords
    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            location: location || "",
            coords: coords || { lat: null, lon: null },
        }));
    }, [location, coords]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    /* ------------------ SUBMIT ------------------ */

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                photo: reader.result, // base64 string
            }));
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/providers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.success) throw new Error("Registration failed");

            alert("Service provider registered!");

            setForm({
                name: "",
                phone: "",
                location: "",
                serviceType: "",
                experience: "",
                photo: "",
            });

            setIsOpen(false);

        } catch (err) {
            console.error("Submit Error:", err);
            alert("Failed to register provider.");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ------------------ FETCH PROVIDERS ------------------ */
    const fetchProviders = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/providers`);
            const data = await res.json();
            if (data.success) setProviders(data.providers);
        } catch (err) {
            console.error("Fetch providers error:", err);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto my-4 px-3 sm:px-5 py-5 rounded-2xl shadow-lg border border-gray-300">

            <h2 className="text-xl font-bold text-gray-800 text-center">
                Local Service Providers
            </h2>
            <p className="text-xs text-gray-500 text-center mt-1">
                Find trusted workers near you — electricians, plumbers, carpenters & more.
            </p>

            {/* ----------------- ACCORDION ----------------- */}
            <div className="mt-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-4 font-semibold text-gray-800 text-sm sm:text-base"
                >
                    <span>Register as a Service Provider</span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                    <div className="p-4 border-t space-y-4">
                        <form onSubmit={submitHandler} className="space-y-4">

                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />

                            <input
                                type="tel"
                                name="phone"
                                required
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />

                            <input
                                type="text"
                                name="location"
                                required
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Your Area / Locality"
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />

                            <select
                                name="serviceType"
                                required
                                value={form.serviceType}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Select Service</option>
                                <option value="Plumber">🚰 Plumber</option>
                                <option value="Electrician">⚡ Electrician</option>
                                <option value="Carpenter">🪚 Carpenter</option>
                                <option value="Driver">🚗 Driver</option>
                                <option value="Painter">🎨 Painter</option>
                                <option value="Mechanic">🔧 Mechanic</option>
                            </select>

                            <input
                                type="text"
                                name="experience"
                                required
                                value={form.experience}
                                onChange={handleChange}
                                placeholder="Experience (e.g., 5 years)"
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={convertToBase64}
                                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                                    } bg-blue-600 text-white p-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition flex justify-center`}
                            >
                                {isSubmitting ? (
                                    <div className="mx-auto rounded-full animate-spin h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    "Submit Registration"
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* ----------------- PROVIDERS LIST ----------------- */}
            <h3 className="text-lg font-bold mt-6 mb-3 text-gray-800">
                Available Professionals
            </h3>

            <div className="space-y-4">
                {providers.length === 0 && (
                    <p className="text-sm text-gray-500">No providers yet.</p>
                )}

                {providers.map((p) => (
                    <div
                        key={p._id}
                        className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={p.photo || "https://placehold.co/100x100"}
                            alt="profile"
                            className="w-24 h-24 sm:w-20 sm:h-20 mx-auto sm:mx-0 rounded-xl object-cover"
                        />

                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex justify-center sm:justify-start items-center gap-2">
                                <p className="text-lg font-semibold">{p.name}</p>

                                {p.verified && (
                                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-lg">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-600">{p.serviceType}</p>
                            <p className="text-sm text-gray-600">📍 {p.location}</p>

                            <a href={`tel:${p.phone}`} className="text-sm text-gray-700 block">
                                📞 {p.phone}
                            </a>

                            <p className="text-xs text-gray-500 mt-1">{p.experience}</p>

                            <button className="mt-3 text-blue-600 font-medium text-sm hover:underline">
                                View Profile →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceProvider;
