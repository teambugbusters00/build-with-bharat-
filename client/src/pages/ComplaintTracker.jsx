import { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const API_URL = "http://localhost:5000/api/report";

// Status pipeline
const STATUSES = ["Received", "Assigned", "In Progress", "Resolved", "Reopened"];

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

/* ------------------------- MAIN COMPONENT ------------------------- */
export default function ComplaintTracker() {
  const [openForm, setOpenForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [list, setList] = useState([]);

  const [trackId, setTrackId] = useState("");
  const [tracked, setTracked] = useState(null);

  /* -------------------- FORM STATE -------------------- */
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    issue: "",
    description: "",
    coords: { lat: null, lon: null },
  });

  /* -------------------- FETCH COMPLAINTS -------------------- */
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_URL}/all`);
      const data = await res.json();
      if (data.success) setList(data.reports.reverse());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  /* ------------------------ SUBMIT ------------------------ */
  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Complaint submitted. Save your Report ID:\n" + data.report.reportId);
        fetchReports();

        // Reset form
        setForm({
          name: "",
          phone: "",
          location: "",
          issue: "",
          description: "",
          coords: { lat: null, lon: null },
        });
        setOpenForm(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Server error.");
    }

    setIsSubmitting(false);
  };

  /* --------------------- STATUS UPDATE --------------------- */
  const advanceStatus = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/advance/${id}`, { method: "PATCH" });
    fetchReports();
  };

  const reopen = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/reopen/${id}`, { method: "PATCH" });
    fetchReports();
  };

  /* --------------------- SEARCH + FILTER --------------------- */
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return list.filter((c) => {
      const matchesQ =
        !q ||
        c.reportId.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.issue.toLowerCase().includes(q);

      const matchesStatus = !filterStatus || c.status === filterStatus;
      return matchesQ && matchesStatus;
    });
  }, [query, filterStatus, list]);

  /* ------------------------ TRACKING ------------------------ */
  const findTicket = () => {
    const c = list.find((x) => x.reportId === trackId.trim());
    setTracked(c || { id: trackId, notFound: true });
  };

  /* --------------------------- UI --------------------------- */
  return (
    <>
      <div className="w-full max-w-4xl mx-auto my-4 px-3 sm:px-5 py-5 rounded-2xl shadow-lg border border-text">

        <h2 className="text-xl sm:text-2xl font-bold text-text text-center">
          Civic Complaints & Tracking
        </h2>

        <p className="text-xs text-text/80 text-center mt-1">
          Live map, heatmap & transparent issue tracking.
        </p>

        {/* ------------------ MAP + HEATMAP ------------------ */}
        <h3 className="text-lg font-bold mt-6 mb-2 text-text">Issue Heatmap</h3>

        <div className="w-full h-72 sm:h-96 mb-6 rounded-xl overflow-hidden border border-text shadow">
          <MapView complaints={list} />
        </div>

        {/* --------------------- TRACK COMPLAINT --------------------- */}
        <div className="mt-6 bg-bg border rounded-xl p-4">
          <p className="text-sm font-semibold text-text">Track complaint by Report ID</p>

          <div className="flex gap-2 mt-2 flex-col sm:flex-row">
            <input
              placeholder="Enter Report ID"
              className="flex-1 p-3 border rounded-lg bg-text/90 text-bg"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />

            <button
              onClick={findTicket}
              className="bg-blue-600 text-text px-4 py-3 rounded-lg hover:bg-blue-700"
            >
              Track
            </button>
          </div>

          {tracked && (
            <div className="mt-3 p-3 border rounded-lg bg-text-50">
              {tracked.notFound ? (
                <p className="text-sm text-red-600">
                  No complaint found for ID: {tracked.id}
                </p>
              ) : (
                <>
                  <p className="text-sm">
                    <span className="font-semibold">ID:</span> {tracked.reportId}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`px-2 py-0.5 border rounded ${statusColor(tracked.status)}`}>
                      {tracked.status}
                    </span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* --------------------- SEARCH + FILTER --------------------- */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            placeholder="Search by ID / name / phone / location / issue"
            className="flex-1 p-3 border rounded-lg bg-text/90 text-bg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="p-3 border rounded-lg text-text bg-bg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* --------------------- COMPLAINT LIST --------------------- */}
        <h3 className="text-lg font-bold mt-5 mb-2 text-text">
          Recent Complaints
        </h3>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No complaints yet.</p>
          ) : (
            filtered.map((c) => (
              <div
                key={c._id}
                className="p-4 bg-bg rounded-xl border border-text shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-2">

                  <div>
                    <p className="text-sm text-text/60">ID: {c.reportId}</p>
                    <p className="text-base font-semibold text-text">{c.issue}</p>
                    <p className="text-sm text-text/60">📍 {c.location}</p>
                    <p className="text-xs text-text/60">
                      Reported by {c.name} {c.phone && `• ${c.phone}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 border rounded text-sm ${statusColor(c.status)}`}
                    >
                      {c.status}
                    </span>
                    <button
                      onClick={() => reopen(c.reportId)}
                      className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Reopen
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
