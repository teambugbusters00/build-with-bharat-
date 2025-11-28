import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Bell, Calendar, MapPin, Clock, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

const AddForm = ({ type, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    category: '',
    priority: 'low',
    date: '',
    time: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint = '';
      let data = {};

      switch (type) {
        case 'notices':
          endpoint = '/notices';
          data = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            priority: formData.priority
          };
          break;
        case 'schedules':
          endpoint = '/schedules';
          data = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            status: 'scheduled'
          };
          break;
        case 'events':
          endpoint = '/events';
          data = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            status: 'upcoming'
          };
          break;
      }

      console.log('📤 Submitting data to:', `${import.meta.env.VITE_API_URL}${endpoint}`);
      console.log('📋 Data being sent:', data);

      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 API response:', result);

      if (result.success) {
        console.log('✅ Item added successfully');
        onSuccess();
      } else {
        console.error('❌ API returned error:', result.error);
        throw new Error(result.error || 'Failed to add item');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);

      // Provide specific error messages
      if (error.message.includes('fetch')) {
        alert('Network error: Server might not be running. Please start the backend server.');
      } else if (error.message.includes('HTTP error')) {
        alert(`Server error (${error.message}). Please check the API endpoints.`);
      } else {
        alert(`Error adding item: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Enter title"
        />
      </div>

      {type === 'notices' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter notice content"
          />
        </div>
      )}

      {(type === 'schedules' || type === 'events') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter description"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Category</option>
            {type === 'notices' && (
              <>
                <option value="general">General</option>
                <option value="emergency">Emergency</option>
                <option value="announcement">Announcement</option>
                <option value="update">Update</option>
              </>
            )}
            {type === 'schedules' && (
              <>
                <option value="meeting">Meeting</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Event</option>
                <option value="training">Training</option>
              </>
            )}
            {type === 'events' && (
              <>
                <option value="cultural">Cultural</option>
                <option value="educational">Educational</option>
                <option value="sports">Sports</option>
                <option value="health">Health</option>
                <option value="community">Community</option>
              </>
            )}
          </select>
        </div>

        {type === 'notices' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        )}
      </div>

      {(type === 'schedules' || type === 'events') && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter location"
            />
          </div>
        </>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : `Add ${type.slice(0, -1)}`}
        </button>
      </div>
    </form>
  );
};

const CommunityUpdates = () => {
  const [activeTab, setActiveTab] = useState('notices');
  const [notices, setNotices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [debugMode, setDebugMode] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  // Check API connectivity on mount
  useEffect(() => {
    checkApiConnectivity();
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const checkApiConnectivity = async () => {
    try {
      console.log('🔗 Checking API connectivity...');
      const response = await fetch(`${API_BASE}/notices`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('✅ API is online');
        setApiStatus('online');
      } else {
        console.log('⚠️ API responded but with error status:', response.status);
        setApiStatus('offline');
      }
    } catch (error) {
      console.log('❌ API is offline:', error.message);
      setApiStatus('offline');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      let setter = null;

      switch (activeTab) {
        case 'notices':
          endpoint = '/notices';
          setter = setNotices;
          break;
        case 'schedules':
          endpoint = '/schedules/weekly/current';
          setter = setSchedules;
          break;
        case 'events':
          endpoint = '/events?upcoming=true';
          setter = setEvents;
          break;
      }

      console.log('🔍 Fetching data from:', `${API_BASE}${endpoint}`);

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Received data:', data);

      if (data.success) {
        const items = data[activeTab.slice(0, -1) + 's'] || [];
        console.log(`✅ Successfully loaded ${items.length} ${activeTab}`);
        setter(items);
        setApiStatus('online');
        showToast(`Loaded ${items.length} ${activeTab}`, 'success');
      } else {
        console.warn('⚠️ API returned success=false:', data);
        setApiStatus('offline');
        throw new Error(data.error || 'API returned unsuccessful response');
      }
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setApiStatus('offline');

      // Check if it's a network error (server not running)
      if (error.message.includes('fetch')) {
        console.error('🌐 Network error - Server might not be running');
        showToast('Server not running - using demo data', 'error');
      } else if (error.message.includes('HTTP error')) {
        console.error('🔗 HTTP error - Wrong endpoint or server issue');
        showToast('API endpoint error - using demo data', 'error');
      } else {
        console.error('💥 Unknown error:', error);
        showToast('Data loading error - using demo data', 'error');
      }

      // Use mock data when API is not available
      const mockSetter = activeTab === 'notices' ? setNotices :
                        activeTab === 'schedules' ? setSchedules : setEvents;
      const mockData = getMockData(activeTab);
      console.log(`🎭 Using mock data: ${mockData.length} ${activeTab}`);
      mockSetter(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development when API is not available
  const getMockData = (tab) => {
    if (tab === 'notices') {
      return [
        {
          _id: '1',
          title: 'Water Supply Maintenance',
          content: 'Water supply will be interrupted in Sector A from 10 AM to 2 PM tomorrow for maintenance work.',
          priority: 'medium',
          category: 'maintenance',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Community Meeting',
          content: 'Monthly community meeting scheduled for next Saturday at the village hall.',
          priority: 'low',
          category: 'meeting',
          createdAt: new Date().toISOString()
        }
      ];
    } else if (tab === 'schedules') {
      return [
        {
          _id: '1',
          title: 'Garbage Collection',
          description: 'Regular garbage collection schedule',
          date: new Date().toISOString().split('T')[0],
          time: '08:00',
          location: 'Main Street',
          category: 'maintenance',
          status: 'scheduled',
          createdAt: new Date().toISOString()
        }
      ];
    } else if (tab === 'events') {
      return [
        {
          _id: '1',
          title: 'Village Festival',
          description: 'Annual village festival with cultural programs and food stalls',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          time: '18:00',
          location: 'Village Ground',
          category: 'cultural',
          status: 'upcoming',
          createdAt: new Date().toISOString()
        }
      ];
    }
    return [];
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };


  const filteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'notices': data = notices; break;
      case 'schedules': data = schedules; break;
      case 'events': data = events; break;
    }

    return data.filter(item => {
      const matchesSearch = !searchTerm ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !categoryFilter || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  };

  const renderItem = (item, type) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'high': case 'emergency': return 'text-red-600 bg-red-100';
        case 'medium': case 'upcoming': return 'text-orange-600 bg-orange-100';
        case 'low': case 'completed': return 'text-green-600 bg-green-100';
        case 'cancelled': return 'text-gray-600 bg-gray-100';
        default: return 'text-blue-600 bg-blue-100';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed': return <CheckCircle className="w-4 h-4" />;
        case 'cancelled': return <XCircle className="w-4 h-4" />;
        case 'high': case 'emergency': return <AlertTriangle className="w-4 h-4" />;
        default: return <Clock className="w-4 h-4" />;
      }
    };

    return (
      <div
        key={item._id}
        className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none border dark:border-purple-400/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-text">{item.title}</h3>
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.priority || item.status)}`}>
            {getStatusIcon(item.priority || item.status)}
            <span className="ml-1 capitalize">{item.priority || item.status}</span>
          </div>
        </div>

        {type === 'notices' && (
          <p className="text-text/70 mb-3 line-clamp-3">{item.content}</p>
        )}

        {type === 'schedules' && (
          <>
            <p className="text-text/70 mb-2">{item.description}</p>
            <div className="flex items-center text-sm text-text/60 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(item.date).toLocaleDateString()} at {item.time}
            </div>
            {item.location && (
              <div className="flex items-center text-sm text-text/60">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </div>
            )}
          </>
        )}

        {type === 'events' && (
          <>
            <p className="text-text/70 mb-2">{item.description}</p>
            <div className="flex items-center text-sm text-text/60 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(item.date).toLocaleDateString()} at {item.time}
            </div>
            <div className="flex items-center text-sm text-text/60">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
          </>
        )}

        <div className="flex justify-between items-center mt-4 pt-3 border-t dark:border-gray-700">
          <span className="text-xs text-text/50">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-text/50 capitalize">
            {item.category}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Community Updates
            </h1>
            <p className="text-lg text-gray-700">
              Stay informed with notices, schedules, and community events
            </p>
          </div>
          <button
            onClick={() => setDebugMode(!debugMode)}
            className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            🔧 Debug
          </button>
        </div>

        {debugMode && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🔍 Debug Info</h3>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <p><strong>API Base:</strong> {API_BASE}</p>
              <p><strong>API Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  apiStatus === 'online' ? 'bg-green-100 text-green-800' :
                  apiStatus === 'offline' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {apiStatus === 'online' ? '🟢 Online' :
                   apiStatus === 'offline' ? '🔴 Offline' :
                   '🟡 Checking...'}
                </span>
              </p>
              <p><strong>Current Tab:</strong> {activeTab}</p>
              <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
              <p><strong>Data Count:</strong> {
                activeTab === 'notices' ? notices.length :
                activeTab === 'schedules' ? schedules.length :
                events.length
              }</p>
              <p><strong>Data Source:</strong> {
                (activeTab === 'notices' && notices.length > 0 && notices[0]._id && notices[0]._id.length > 10) ? 'Real API' :
                (activeTab === 'schedules' && schedules.length > 0 && schedules[0]._id && schedules[0]._id.length > 10) ? 'Real API' :
                (activeTab === 'events' && events.length > 0 && events[0]._id && events[0]._id.length > 10) ? 'Real API' :
                'Mock Data'
              }</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text placeholder-text/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters and Add Button */}
          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {activeTab === 'notices' && (
                <>
                  <option value="general">General</option>
                  <option value="emergency">Emergency</option>
                  <option value="announcement">Announcement</option>
                  <option value="update">Update</option>
                </>
              )}
              {activeTab === 'schedules' && (
                <>
                  <option value="meeting">Meeting</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="event">Event</option>
                  <option value="training">Training</option>
                </>
              )}
              {activeTab === 'events' && (
                <>
                  <option value="cultural">Cultural</option>
                  <option value="educational">Educational</option>
                  <option value="sports">Sports</option>
                  <option value="health">Health</option>
                  <option value="community">Community</option>
                </>
              )}
            </select>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl">
          {[
            { id: 'notices', label: 'Notices', icon: Bell },
            { id: 'schedules', label: 'Weekly Schedule', icon: Calendar },
            { id: 'events', label: 'Events', icon: MapPin }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-text shadow-md'
                  : 'text-text/70 hover:text-text'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData().map(item => renderItem(item, activeTab))}
            {filteredData().length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-text mb-2">No {activeTab} found</h3>
                <p className="text-text/70">Check back later or add a new {activeTab.slice(0, -1)}.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg ${
            toast.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New {activeTab.slice(0, -1)}</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <AddForm
              type={activeTab}
              onClose={() => setShowAddForm(false)}
              onSuccess={() => {
                setShowAddForm(false);
                fetchData(); // Refresh data after adding
                showToast(`${activeTab.slice(0, -1)} added successfully!`, 'success');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityUpdates;