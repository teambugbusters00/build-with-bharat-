import { useState } from "react";
import Navbar from "../components/Navbar";

const ServiceProvider = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        location: "",
        serviceType: "",
        experience: ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            alert("Service provider registered!");
            setForm({
                name: "",
                phone: "",
                location: "",
                serviceType: "",
                experience: ""
            });
            setIsOpen(false);
            setIsSubmitting(false);
        }, 2000);
    };

    const providers = [
        {
            id: 1,
            name: "Ramesh Das",
            service: "Electrician",
            location: "Sodepur, Kolkata",
            phone: "9876543210",
            rating: 4.7,
            verified: true,
            history: "8 years experience. Completed over 200 household jobs.",
            photo: "https://i.pravatar.cc/100?img=12",
        },
        {
            id: 2,
            name: "Manoj Pradhan",
            service: "Plumber",
            location: "Burdwan",
            phone: "9123456780",
            rating: 4.3,
            verified: false,
            history: "3 years experience in residential plumbing.",
            photo: "https://i.pravatar.cc/100?img=8",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="w-full max-w-4xl mx-auto my-4 px-3 sm:px-5 py-5 bg-white rounded-2xl shadow-lg border border-gray-300">
                {/* Header */}
                <h2 className="text-xl font-bold text-gray-800 text-center">
                    Local Service Providers
                </h2>
                <p className="text-xs text-gray-500 text-center mt-1">
                    Find trusted workers near you — electricians, plumbers, carpenters & more.
                </p>

                {/* Accordion */}
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

                                {/* Submit button with spinner */}
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

                {/* Providers List */}
                <h3 className="text-lg font-bold mt-6 mb-3 text-gray-800">
                    Available Professionals
                </h3>

                <div className="space-y-4">
                    {providers.map((p) => (
                        <div
                            key={p.id}
                            className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={p.photo}
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

                                <p className="text-sm text-gray-600">{p.service}</p>
                                <p className="text-sm text-gray-600">📍 {p.location}</p>
                                <a href={`tel:${p.phone}`} className="text-sm text-gray-700 block">
                                    📞 {p.phone}
                                </a>

                                <p className="mt-1 text-sm flex justify-center sm:justify-start items-center gap-1">
                                    ⭐ <span className="font-medium">{p.rating}</span>
                                </p>

                                <p className="text-xs text-gray-500 mt-1">{p.history}</p>

                                <button className="mt-3 text-blue-600 font-medium text-sm hover:underline">
                                    View Profile →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ServiceProvider;
