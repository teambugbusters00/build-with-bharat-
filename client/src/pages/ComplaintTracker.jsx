import { useEffect, useState } from "react";
import { Search, MapPin, Clock, CheckCircle, AlertTriangle, Calendar, User, Phone, Loader } from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const ComplaintTracker = () => {
  const [trackId, setTrackId] = useState("");
  const [trackedComplaint, setTrackedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nearbyComplaints, setNearbyComplaints] = useState([]);

  // Mock data for demonstration
  const mockComplaints = [
    {
      id: "REP-001",
      issue: "Street Light Not Working",
      location: "Main Road, Sector 5",
      status: "In Progress",
      reportedBy: "Rajesh Kumar",
      phone: "+91-9876543210",
      date: "2024-11-25",
      estimatedResolution: "2-3 days",
      description: "The street light at the intersection has been out for 3 days",
      coords: { lat: 22.57, lon: 88.36 }
    },
    {
      id: "REP-002",
      issue: "Water Pipeline Leak",
      location: "Block A, Sector 3",
      status: "Assigned",
      reportedBy: "Priya Sharma",
      phone: "+91-9876543211",
      date: "2024-11-24",
      estimatedResolution: "1-2 days",
      description: "Water leaking from main pipeline causing flooding",
      coords: { lat: 22.58, lon: 88.37 }
    },
    {
      id: "REP-003",
      issue: "Garbage Not Collected",
      location: "Market Area",
      status: "Resolved",
      reportedBy: "Amit Patel",
      phone: "+91-9876543212",
      date: "2024-11-23",
      estimatedResolution: "Completed",
      description: "Garbage bins overflowing for 2 days",
      coords: { lat: 22.56, lon: 88.35 }
    }
  ];

  useEffect(() => {
    // Simulate loading nearby complaints
    setNearbyComplaints(mockComplaints.slice(0, 3));
  }, []);

  const handleTrackComplaint = async () => {
    if (!trackId.trim()) return;

    setLoading(true);
    setTrackedComplaint(null);

    // Simulate API call
    setTimeout(() => {
      const complaint = mockComplaints.find(c => c.id === trackId.trim());
      setTrackedComplaint(complaint || { notFound: true, id: trackId });
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Assigned": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  // Badge colors
  const statusColor = (s) =>
  ({
    Received: "bg-gray-100 text-gray-700 border-gray-300",
    Assigned: "bg-amber-100 text-amber-800 border-amber-300",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-300",
    Resolved: "bg-green-100 text-green-800 border-green-300",
    Reopened: "bg-red-100 text-red-700 border-red-300",
  }[s] || "bg-gray-100 text-gray-700 border-gray-300");

  // Marker color by category
  const markerColor = (cat) => {
    switch (cat) {
      case "Pothole":
        return "red";
      case "Water Leakage":
        return "blue";
      case "Stray Dog":
        return "orange";
      case "Garbage Not Collected":
        return "green";
      default:
        return "gray";
    }
  };

  /* ------------------------- HEATMAP LAYER ------------------------- */
  function HeatmapLayer({ points }) {
    const map = useMap();

    useEffect(() => {
      if (!points || points.length === 0) return;

      const heat = window.L.heatLayer(points, {
        radius: 25,
        blur: 20,
        maxZoom: 17,
      }).addTo(map);

      return () => map.removeLayer(heat);
    }, [points]);

    return null;
  }

  /* ---------------------------- MAP VIEW ---------------------------- */
  function MapView({ complaints }) {
    const heatData = complaints
      .filter((c) => c.coords?.lat)
      .map((c) => [c.coords.lat, c.coords.lon, 0.8]); // intensity

    return (
      <MapContainer
        center={[22.57, 88.36]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <HeatmapLayer points={heatData} />

        {complaints.map(
          (c, idx) =>
            c.coords && (
              <CircleMarker
                key={idx}
                center={[c.coords.lat, c.coords.lon]}
                radius={8}
                color={markerColor(c.issue)}
                fillColor={markerColor(c.issue)}
                fillOpacity={0.7}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{c.issue}</p>
                    <p>{c.location}</p>
                    <p className="text-xs text-gray-600">Status: {c.status}</p>
                  </div>
                </Popup>
              </CircleMarker>
            )
        )}
      </MapContainer>
    );
  }

  const ProgressTimeline = ({ complaint }) => {
    const steps = [
      { label: "Report Received", status: "Received", icon: AlertTriangle, completed: true },
      { label: "Assigned to Team", status: "Assigned", icon: User, completed: complaint.status !== "Received" },
      { label: "Work in Progress", status: "In Progress", icon: Clock, completed: ["In Progress", "Resolved"].includes(complaint.status) },
      { label: "Issue Resolved", status: "Resolved", icon: CheckCircle, completed: complaint.status === "Resolved" },
      { label: "Verification Complete", status: "Verified", icon: CheckCircle, completed: false }
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              step.completed
                ? 'bg-green-100 border-green-300 text-green-600'
                : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}>
              <step.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className={`font-medium ${step.completed ? 'text-text' : 'text-text/60'}`}>
                {step.label}
              </p>
              {step.completed && (
                <p className="text-sm text-green-600 font-medium">✓ Completed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Complaint <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tracker</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Track your community issues in real-time with detailed progress updates and interactive maps.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-xl dark:shadow-none border dark:border-purple-400/30 overflow-hidden">
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Community Issue Map</h2>
            <p className="text-lg text-gray-700">Interactive heatmap showing reported issues in your area</p>
          </div>
          <div className="h-96 md:h-[500px]">
            <MapView complaints={nearbyComplaints} />
          </div>
        </div>
      </div>

      {/* Track Complaint Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-xl dark:shadow-none border dark:border-purple-400/30 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Track Your Complaint</h2>
            <p className="text-lg text-gray-700">Enter your Report ID to check status and progress</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-text/50 w-6 h-6" />
              <input
                type="text"
                placeholder="Enter Report ID (e.g., REP-001)"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                className="w-full pl-16 pr-6 py-5 text-lg rounded-2xl border-3 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text placeholder-text/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-lg"
              />
            </div>
          </div>

          {/* Track Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleTrackComplaint}
              disabled={loading || !trackId.trim()}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader className="w-6 h-6 animate-spin" />
                  Tracking...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6" />
                  Track Complaint
                </div>
              )}
            </button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-text">Searching for your complaint...</p>
              </div>
            </div>
          )}

          {/* Tracked Complaint Result */}
          {trackedComplaint && !loading && (
            <div className="max-w-3xl mx-auto">
              {trackedComplaint.notFound ? (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 text-center">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                    Complaint Not Found
                  </h3>
                  <p className="text-lg text-red-700 dark:text-red-300 mb-2">
                    No complaint found with ID: <span className="font-mono font-bold">{trackedComplaint.id}</span>
                  </p>
                  <p className="text-red-600 dark:text-red-400">
                    Please check your Report ID and try again.
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-xl dark:shadow-none border dark:border-purple-400/30 overflow-hidden">
                  {/* Header */}
                  <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold text-text mb-2">{trackedComplaint.issue}</h3>
                        <p className="text-lg text-text/70 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          {trackedComplaint.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-3">
                        <div className={`px-6 py-3 rounded-full text-lg font-bold border-2 ${getStatusColor(trackedComplaint.status)}`}>
                          {trackedComplaint.status}
                        </div>
                        <div className="text-sm text-text/70">
                          Est. Resolution: <span className="font-medium text-text">{trackedComplaint.estimatedResolution}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-text/70 mb-1">Report ID</p>
                        <p className="font-mono font-bold text-lg text-text">{trackedComplaint.id}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-text/70 mb-1">Reported By</p>
                        <p className="font-bold text-lg text-text">{trackedComplaint.reportedBy}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-text/70 mb-1">Contact</p>
                        <p className="font-bold text-lg text-text">{trackedComplaint.phone}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-text/70 mb-2">Description</p>
                      <p className="text-text leading-relaxed">{trackedComplaint.description}</p>
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-text mb-6">Progress Timeline</h4>
                    <ProgressTimeline complaint={trackedComplaint} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Nearby Complaints */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Nearby Complaints</h2>
          <p className="text-lg text-gray-700">See what issues others in your area are reporting</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyComplaints.map((complaint, index) => (
            <div
              key={complaint.id}
              className="bg-white dark:bg-gray-800/50 rounded-3xl p-6 shadow-xl dark:shadow-none border dark:border-purple-400/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-text/60 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {complaint.id}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{complaint.issue}</h3>
                  <p className="text-text/70 mb-3">{complaint.description}</p>
                  <div className="space-y-2 text-sm text-text/70">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {complaint.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {complaint.date}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTrackId(complaint.id)}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintTracker;
