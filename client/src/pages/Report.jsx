import { useState, useEffect } from 'react'

const Report = () => {

    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState({ lat: null, lon: null });

    useEffect(() => {
        getLocationOnLoad();
    }, []);

    const getLocationOnLoad = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                setCoords({ lat, lon });

                const address = await reverseGeocode(lat, lon);
                setLocation(address);
            },
            (err) => {
                console.error("GPS Fetch Error:", err);
                setLocation("Location unavailable");
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            }
        );
    };

    const reverseGeocode = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await res.json();
            return data.display_name || `${lat}, ${lon}`;
        } catch (e) {
            console.error("Reverse geocode error:", e);
            return `${lat}, ${lon}`;
        }
    };

    const [name, setName] = useState("")
    const [issue, setIssue] = useState("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            alert("Report submitted successfully!")
            setName("")
            setLocation("")
            setIssue("")
            setDescription("")
            setIsSubmitting(false)
        }, 2000)
    }

    return (
        <div className="max-w-md mx-auto my-6 p-5 bg-white rounded-2xl shadow-lg border border-gray-300">

            {/* Header */}
            <h2 className="text-xl font-bold text-gray-800 text-center">
                Report an Urgent Issue
            </h2>
            <p className="text-xs text-gray-500 text-center mt-1">
                Help your community. Your report reaches nearby volunteers & authorities.
            </p>

            <form onSubmit={submitHandler} className="space-y-4 mt-5">

                {/* Name */}
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location of the Issue
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Area / Landmark (e.g. Near Post Office)"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Contact Number (Optional)
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                </div>

                {/* Issue Type */}
                <div>
                    <label htmlFor="issue" className="text-sm font-medium text-gray-700">
                        Select Issue Type
                    </label>
                    <select
                        id="issue"
                        name="issue"
                        required
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    >
                        <option value="">Choose an option</option>
                        <option value="accident">🚑 Accident</option>
                        <option value="fire">🔥 Fire</option>
                        <option value="staryDogAttack">🐕 Stray Dog Attack</option>
                        <option value="medicalEmergency">🏥 Medical Emergency</option>
                        <option value="unsafeRoad">🛣️ Unsafe Road Condition</option>
                        <option value="darkRoad">🌑 Dark Road</option>
                        <option value="other">⚠️ Other</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Describe the Situation
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Explain what happened... (e.g. bike accident on main road)"
                        rows="4"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    ></textarea>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'} bg-blue-500 text-white p-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition`}
                >
                    {isSubmitting ? (<div className="mx-auto rounded-full animate-spin h-5 w-5 border-b-3 border-white-900" />) : "Submit Report"}
                </button>

                {/* Footer safety note */}
                <p className="text-[11px] text-gray-500 text-center mt-2">
                    Your location is used only to send help faster.
                </p>
            </form>
        </div>
    )
}

export default Report
