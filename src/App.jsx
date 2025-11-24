import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Image assets from Figma
const imgFrame5518 = "https://www.figma.com/api/mcp/asset/5034dbbb-1e7a-45f1-933a-971fa4c14a55";
const img5 = "https://www.figma.com/api/mcp/asset/2f46b82d-f3b4-48df-9e5f-92d8b1004f82";
const img6 = "https://www.figma.com/api/mcp/asset/0927498f-e82a-4f51-a2e1-b72747787b99";
const img7 = "https://www.figma.com/api/mcp/asset/dc17fcda-bc5f-4a0e-af3a-e184513e9b6a";
const img8 = "https://www.figma.com/api/mcp/asset/e43e502c-cabf-439b-a451-552b2e00f8c4";
const img9 = "https://www.figma.com/api/mcp/asset/2f1e7612-567f-4912-bdea-40f097269ef8";
const img10 = "https://www.figma.com/api/mcp/asset/c6082217-d77b-48e2-a6d6-0e4bf5fee62c";
const img11 = "https://www.figma.com/api/mcp/asset/9a368012-0a37-42c8-a98f-8658c15bc6ae";
const img12 = "https://www.figma.com/api/mcp/asset/459601b1-0dc5-41e0-a349-8df270b06c6a";
const img13 = "https://www.figma.com/api/mcp/asset/3cb2e060-f0bc-4c98-a6c0-ec04ee564052";
const img14 = "https://www.figma.com/api/mcp/asset/cacc8b3b-027f-404a-8a1b-aa8dec5926c6";
const img15 = "https://www.figma.com/api/mcp/asset/cb481723-c4fa-407e-b208-bf8927177850";
const img16 = "https://www.figma.com/api/mcp/asset/26ce7660-6e28-41f4-8135-22d738df1fa0";
const img17 = "https://www.figma.com/api/mcp/asset/b218818e-c2fd-415c-b2f0-5aee475d2ea7";

// Contact avatar images
const contactAvatar1 = "https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218";
const contactAvatar2 = "https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19";
const contactAvatar3 = "https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f";

// Icon Components
const IconSearch = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconDashboard = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconNote = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconTasks = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const IconEmail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconChartLine = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconBuilding = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconCog = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconFilter = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const IconChevronLeft = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const IconChevronRight = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
  </svg>
);

const IconExport = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const IconSort = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

// Table Icons
const IconEnvelope = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconPhone2 = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconGenderMale = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="10" cy="14" r="5" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 5l-5.5 5.5M19 5h-5M19 5v5" />
  </svg>
);

const IconGenderFemale = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="9" r="5" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7M9 18h6" />
  </svg>
);

const IconDotsThree = () => (
  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

const IconSortUpDown = () => (
  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8l5-5 5 5M7 16l5 5 5-5" />
  </svg>
);

// People data for dashboard
const initialPeopleData = [
  { id: 1, name: 'Robert Fox', email: 'robertfox@example.com', phone: '(671) 555-0110', category: 'Employee', location: 'Austin', gender: 'Male', avatar: contactAvatar1 },
  { id: 2, name: 'Cody Fisher', email: 'codyfisher@example.com', phone: '(505) 555-0125', category: 'Customers', location: 'Orange', gender: 'Male', avatar: contactAvatar2 },
  { id: 3, name: 'Albert Flores', email: 'albertflores@example.com', phone: '(704) 555-0127', category: 'Customers', location: 'Pembroke Pines', gender: 'Female', avatar: contactAvatar3 },
  { id: 4, name: 'Floyd Miles', email: 'floydmiles@example.com', phone: '(405) 555-0128', category: 'Employee', location: 'Fairfield', gender: 'Male', avatar: contactAvatar1 },
  { id: 5, name: 'Arlene McCoy', email: 'arlenemccoy@example.com', phone: '(219) 555-0114', category: 'Partners', location: 'Toledo', gender: 'Female', avatar: contactAvatar2 },
  { id: 6, name: 'Sarah Johnson', email: 'sarahjohnson@example.com', phone: '(312) 555-0199', category: 'Employee', location: 'Chicago', gender: 'Female', avatar: contactAvatar3 },
  { id: 7, name: 'Michael Chen', email: 'michaelchen@example.com', phone: '(415) 555-0177', category: 'Customers', location: 'San Francisco', gender: 'Male', avatar: contactAvatar1 },
  { id: 8, name: 'Emily Davis', email: 'emilydavis@example.com', phone: '(206) 555-0133', category: 'Partners', location: 'Seattle', gender: 'Female', avatar: contactAvatar2 },
];

// Get category badge styling
const getCategoryBadge = (category) => {
  const styles = {
    Employee: 'bg-purple-50 text-purple-600',
    Customers: 'bg-blue-50 text-blue-600',
    Partners: 'bg-orange-50 text-orange-600'
  };
  return styles[category] || 'bg-gray-50 text-gray-600';
};

// People Table Component (used in Dashboard)
const PeopleTable = () => {
  const [people, setPeople] = useState(initialPeopleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Filter people
  const filteredPeople = people.filter(person => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || person.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort people
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = () => {
    if (selectedPeople.length === sortedPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(sortedPeople.map(p => p.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedPeople(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">People</h2>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2.5 w-[360px]">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">⌘</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-medium">F</span>
            </div>
          </div>
          {/* Sort */}
          <button
            onClick={() => handleSort('name')}
            className="flex items-center gap-2 px-3 py-2 border border-black rounded text-sm font-medium hover:bg-gray-50"
          >
            <IconFilter />
            Sort By
          </button>
          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-3 py-2 border border-black rounded text-sm font-medium hover:bg-gray-50"
            >
              <IconFilter />
              Filter
              {categoryFilter !== 'all' && (
                <span className="bg-black text-white text-xs px-1.5 rounded-full">1</span>
              )}
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                <div className="p-2">
                  <p className="text-xs text-gray-500 font-medium px-2 py-1">Category</p>
                  {['all', 'Employee', 'Customers', 'Partners'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); setShowFilterMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 ${categoryFilter === cat ? 'bg-gray-100 font-medium' : ''}`}
                    >
                      {cat === 'all' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-3">
        {/* Header Row */}
        <div className="bg-gray-50 border border-gray-200 rounded flex items-center">
          {columns.map((col) => (
            <div
              key={col.key}
              className={`flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 ${
                col.key === 'name' ? 'w-[200px]' :
                col.key === 'email' ? 'w-[260px]' :
                col.key === 'phone' ? 'w-[160px]' :
                col.key === 'category' ? 'w-[140px]' :
                col.key === 'location' ? 'w-[132px]' :
                'w-[120px]'
              }`}
              onClick={() => handleSort(col.key)}
            >
              <span className="text-sm text-gray-400 uppercase">{col.label}</span>
              <IconSortUpDown />
            </div>
          ))}
          <div className="flex-1 px-3 py-3">
            <span className="text-sm text-gray-500">Action</span>
          </div>
        </div>

        {/* Data Rows */}
        {sortedPeople.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No people found matching your criteria.</div>
        ) : (
          sortedPeople.map((person) => (
            <div key={person.id} className="bg-white border border-gray-200 rounded flex items-center hover:shadow-sm transition-shadow">
              {/* Name */}
              <div className="w-[200px] px-3 py-2.5 flex items-center gap-3">
                <img src={person.avatar} alt={person.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm">{person.name}</span>
              </div>
              {/* Email */}
              <div className="w-[260px] px-3 py-2.5 flex items-center gap-2">
                <IconEnvelope />
                <a href={`mailto:${person.email}`} className="text-sm font-medium underline">{person.email}</a>
              </div>
              {/* Phone */}
              <div className="w-[160px] px-3 py-2.5 flex items-center gap-2">
                <IconPhone2 />
                <span className="text-sm text-gray-600">{person.phone}</span>
              </div>
              {/* Category */}
              <div className="w-[140px] px-3 py-2.5">
                <span className={`inline-block px-1.5 py-1 rounded text-xs font-medium ${getCategoryBadge(person.category)}`}>
                  {person.category}
                </span>
              </div>
              {/* Location */}
              <div className="w-[132px] px-3 py-2.5 flex items-center gap-2">
                <IconMapPin />
                <span className="text-sm text-gray-600 truncate">{person.location}</span>
              </div>
              {/* Gender */}
              <div className="w-[120px] px-3 py-2.5 flex items-center gap-2">
                {person.gender === 'Male' ? <IconGenderMale /> : <IconGenderFemale />}
                <span className="text-sm text-gray-600">{person.gender}</span>
              </div>
              {/* Actions */}
              <div className="flex-1 px-3 py-2.5 flex items-center gap-3">
                <button
                  onClick={() => window.location.href = `tel:${person.phone}`}
                  className="flex items-center gap-1 px-3 py-2 border border-black rounded text-xs font-medium hover:bg-gray-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${person.email}`}
                  className="flex items-center gap-1 px-3 py-2 border border-black rounded text-xs font-medium hover:bg-gray-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Mail
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <IconDotsThree />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ children, variant = 'blue' }) => {
  const variants = {
    yellow: 'bg-yellow-50 text-yellow-700',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <span className={`px-1.5 py-1 text-xs font-medium rounded ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Note Card Component
const NoteCard = ({ note }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow cursor-pointer h-[230px] flex flex-col"
    >
      <div className="p-6 flex-1 overflow-hidden">
        <div className="flex gap-3 mb-3">
          {note.badges.map((badge, idx) => (
            <Badge key={idx} variant={badge.variant}>{badge.text}</Badge>
          ))}
        </div>

        <h3 className="text-base font-medium mb-3">{note.title}</h3>

        {note.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.description}</p>
        )}

        {note.list && (
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            {note.list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {note.image && (
          <img src={note.image} alt="" className="w-full h-[148px] object-cover rounded mt-3" />
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={note.avatar} alt={note.author} className="w-5 h-5 rounded-full" />
          <span className="text-sm font-medium">{note.author}</span>
        </div>
        <span className="text-sm text-gray-500">{note.timestamp}</span>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const mainMenuItems = [
    { name: 'Dashboard', icon: IconDashboard, path: '/' },
    { name: 'Notifications', icon: IconBell, path: '/notifications' },
    { name: 'Notes', icon: IconNote, path: '/notes' },
    { name: 'Tasks', icon: IconTasks, path: '/tasks' },
    { name: 'Emails', icon: IconEmail, hasDropdown: true, path: '/emails' },
    { name: 'Calendars', icon: IconCalendar, path: '/calendars' }
  ];

  const databaseMenuItems = [
    { name: 'Analytics', icon: IconChartLine, path: '/analytics' },
    { name: 'Contacts', icon: IconUsers, path: '/contacts' },
    { name: 'Companies', icon: IconBuilding, path: '/companies' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[248px] bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="h-[72px] border-b border-gray-200 px-7 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-6 bg-black rounded"></div>
          <span className="text-xl font-medium">Venture</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-5">
        <div className="px-4 space-y-1">
          {mainMenuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm font-medium transition-colors ${
                currentPath === item.path
                  ? 'bg-gray-200 text-black'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon />
              <span>{item.name}</span>
              {item.hasDropdown && <IconChevronDown className="ml-auto" />}
            </button>
          ))}
        </div>

        <div className="my-5 border-t border-gray-200"></div>

        <div className="px-4">
          <div className="px-2 py-1 mb-2">
            <span className="text-xs font-medium text-gray-500">DATABASE</span>
          </div>
          <div className="space-y-1">
            {databaseMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? 'bg-gray-200 text-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-4">
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm font-medium transition-colors ${
            currentPath === '/settings'
              ? 'bg-gray-200 text-black'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <IconCog />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-[72px] bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2.5 w-[360px]">
        <IconSearch />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">⌘</span>
          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-medium">F</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 transition-colors">
          <span className="text-sm font-medium text-gray-600">Help Center</span>
        </button>

        <div className="flex items-center gap-3">
          <img src={imgFrame5518} alt="User" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium">Brian F.</span>
          <IconChevronDown />
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => {
  const statsCards = [
    { icon: IconEmail, label: 'Email Sent', value: '1,251 Mail', bgColor: 'bg-gray-100' },
    { icon: IconBuilding, label: 'Active Company', value: '43 Company', bgColor: 'bg-gray-100' },
    { icon: IconUsers, label: 'Total Contact', value: '162 Contact', bgColor: 'bg-gray-100' },
    { icon: IconTasks, label: 'Ongoing Task', value: '5 Task', bgColor: 'bg-gray-100' }
  ];

  const agendaItems = [
    { time: '11:00 - 12:00 Feb 2, 2019', title: 'Meeting with Client', desc: 'This monthly progress agenda', color: 'orange' },
    { time: '11:00 - 12:00 Feb 2, 2019', title: 'Meeting with Client', desc: 'This monthly progress agenda', color: 'blue' },
    { time: '11:00 - 12:00 Feb 2, 2019', title: 'Meeting with Client', desc: 'This monthly progress agenda', color: 'purple' },
    { time: '11:00 - 12:00 Feb 2, 2019', title: 'Meeting with Client', desc: 'This monthly progress agenda', color: 'red' }
  ];

  const chartData = [
    { month: 'Jan', height: 215 },
    { month: 'Feb', height: 131 },
    { month: 'Mar', height: 239 },
    { month: 'Apr', height: 171 },
    { month: 'May', height: 205 },
    { month: 'Jun', height: 118 },
    { month: 'Jul', height: 178, active: true },
    { month: 'Aug', height: 140 },
    { month: 'Sep', height: 197 },
    { month: 'Oct', height: 152 },
    { month: 'Nov', height: 226 },
    { month: 'Dec', height: 178 }
  ];

  const getBadgeColor = (color) => {
    const colors = {
      orange: 'bg-orange-50 text-orange-600',
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      red: 'bg-red-50 text-red-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <div className="bg-white border-b border-gray-200 px-8 py-0 h-[69px] flex items-center justify-between">
        <h1 className="text-2xl font-medium">Dashboard</h1>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {statsCards.map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} p-1 rounded`}>
                  <stat.icon className="w-6 h-6 text-gray-600" />
                </div>
                <IconChevronDown className="w-3 h-3 rotate-[-90deg]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-medium">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[264px_1fr] gap-6 mb-8">
          {/* Upcoming Agenda */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h2 className="text-xl font-medium mb-4">Upcoming Agenda</h2>
            <div className="space-y-4">
              {agendaItems.map((item, idx) => (
                <div key={idx} className="py-1">
                  <div className={`inline-block px-1.5 py-1 rounded text-xs font-medium mb-2 ${getBadgeColor(item.color)}`}>
                    {item.time}
                  </div>
                  <p className="text-sm font-medium mb-1">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Email Open Rate Chart */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h2 className="text-xl font-medium mb-4">Average Email Open Rate</h2>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-medium">64,23%</span>
                  <span className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">↑ 12%</span>
                </div>
                <p className="text-sm text-gray-600">Average Open Rate</p>
              </div>
              <div className="flex gap-4">
                <button className="px-3 py-2 border border-black rounded text-sm font-medium">
                  January, 2023 - December, 2023 ▼
                </button>
                <button className="px-3 py-2 border border-black rounded text-sm font-medium">
                  Month ▼
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-sm text-gray-600">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-12 right-0 top-0 bottom-6 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Bars */}
              <div className="absolute left-12 right-0 top-0 bottom-6 flex items-end justify-between px-4">
                {chartData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 flex-1">
                    <div
                      className={`w-8 rounded ${data.active ? 'bg-black' : 'bg-gray-300'}`}
                      style={{ height: `${(data.height / 280) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

{/* People Table */}
        <PeopleTable />
      </div>
    </div>
  );
};

// Coming Soon Page
const ComingSoonPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <div className="bg-white border-b border-gray-200 px-8 py-0 h-[69px] flex items-center justify-between">
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <IconCog className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            This page is currently under development. Check back soon for updates!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Notes Dashboard
const NotesPage = () => {
  const notes = [
    {
      badges: [{ text: 'Weekly', variant: 'yellow' }, { text: 'Product', variant: 'blue' }],
      title: 'Product Team Meeting',
      description: 'This monthly progress agenda is following this items:',
      list: ['Introduction to Newest Product Plan', 'Monthly Revenue updates for each'],
      avatar: img5,
      author: 'Floyd Miles',
      timestamp: 'Mar 5 04:25'
    },
    {
      badges: [{ text: 'Monthly', variant: 'green' }, { text: 'Business', variant: 'purple' }],
      title: 'Product Team Meeting',
      description: 'This monthly progress agenda is following this items:',
      list: ['Introduction to Newest Product Plan', 'Monthly Revenue updates for each'],
      image: img6,
      avatar: img7,
      author: 'Dianne Russell',
      timestamp: 'Apr 11 18:30'
    },
    {
      badges: [{ text: 'Personal', variant: 'orange' }, { text: 'Business', variant: 'purple' }],
      title: 'HR Interview',
      description: 'This monthly progress agenda is following this items:',
      list: ['Introduction to Newest Product Plan', 'Monthly Revenue updates for each'],
      image: img8,
      avatar: img9,
      author: 'Annette Black',
      timestamp: 'Jun 23 14:31'
    },
    {
      badges: [{ text: 'Monthly', variant: 'green' }, { text: 'Product', variant: 'blue' }],
      title: 'Monthly Team Progress',
      description: 'This monthly progress agenda is following this items:',
      list: ['Introduction to Newest Product Plan', 'Monthly Revenue updates for each'],
      avatar: img10,
      author: 'Robert Fox',
      timestamp: 'Jan 31 09:53'
    },
    {
      badges: [{ text: 'Monthly', variant: 'green' }, { text: 'Business', variant: 'purple' }],
      title: 'Product Team Meeting',
      description: 'Some Summaries of this weeks meeting with some conclusion we get :',
      list: ['Some of our product uploaded improved', 'Reuplpoad our old product'],
      avatar: img11,
      author: 'Brooklyn Simmons',
      timestamp: 'Aug 15 10:29'
    },
    {
      badges: [{ text: 'Personal', variant: 'orange' }],
      title: 'Document Images',
      description: 'Report Document of Weekly Meetings',
      image: img12,
      avatar: img13,
      author: 'Cameron Williamson',
      timestamp: 'Dec 30 21:28'
    },
    {
      badges: [{ text: 'Badge', variant: 'yellow' }, { text: 'Product', variant: 'blue' }],
      title: 'Weekly Team Progress',
      description: 'This weekly progress agenda is following this items:',
      list: ['Introduction to Newest Product Plan', 'Monthly Revenue updates for each'],
      avatar: img7,
      author: 'Dianne Russell',
      timestamp: 'Feb 4 19:08'
    },
    {
      badges: [{ text: 'Business', variant: 'purple' }],
      title: 'Revenue Progress',
      image: img14,
      avatar: img15,
      author: 'Ronald Richards',
      timestamp: 'May 22 04:43'
    },
    {
      badges: [{ text: 'Product', variant: 'blue' }],
      title: 'Monthly Products',
      description: 'Report Document of Weekly Meetings',
      image: img16,
      avatar: img17,
      author: 'Albert Flores',
      timestamp: 'Oct 4 15:49'
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <div className="bg-white border-b border-gray-200 px-8 py-0 h-[69px] flex items-center justify-between">
        <h1 className="text-2xl font-medium">Notes</h1>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 border border-black rounded text-sm font-medium hover:bg-gray-50 transition-colors">
            <IconFilter />
            Sort By
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-black rounded text-sm font-medium hover:bg-gray-50 transition-colors">
            <IconFilter />
            Filter
          </button>
          <div className="w-px h-8 bg-gray-200"></div>
          <button className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors">
            <IconPlus />
            Add Notes
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, idx) => (
            <NoteCard key={idx} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Initial employee data
const initialEmployees = [
  { id: '1001', name: 'Ricky Antony', role: 'Web Designer', email: 'ricky.antony@gmail.com', phone: '+91 123 456 7890', gender: 'Male', location: 'Delhi', status: 'active', avatar: contactAvatar1 },
  { id: '1002', name: 'Sarah Johnson', role: 'Product Manager', email: 'sarah.johnson@gmail.com', phone: '+91 234 567 8901', gender: 'Female', location: 'Mumbai', status: 'active', avatar: contactAvatar2 },
  { id: '1003', name: 'Michael Chen', role: 'Software Engineer', email: 'michael.chen@gmail.com', phone: '+91 345 678 9012', gender: 'Male', location: 'Bangalore', status: 'pending', avatar: contactAvatar3 },
  { id: '1004', name: 'Emily Davis', role: 'UX Designer', email: 'emily.davis@gmail.com', phone: '+91 456 789 0123', gender: 'Female', location: 'Chennai', status: 'active', avatar: contactAvatar1 },
  { id: '1005', name: 'James Wilson', role: 'Data Analyst', email: 'james.wilson@gmail.com', phone: '+91 567 890 1234', gender: 'Male', location: 'Hyderabad', status: 'pending', avatar: contactAvatar2 },
  { id: '1006', name: 'Priya Sharma', role: 'HR Manager', email: 'priya.sharma@gmail.com', phone: '+91 678 901 2345', gender: 'Female', location: 'Delhi', status: 'active', avatar: contactAvatar3 },
  { id: '1007', name: 'David Brown', role: 'DevOps Engineer', email: 'david.brown@gmail.com', phone: '+91 789 012 3456', gender: 'Male', location: 'Pune', status: 'active', avatar: contactAvatar1 },
  { id: '1008', name: 'Anjali Patel', role: 'Marketing Lead', email: 'anjali.patel@gmail.com', phone: '+91 890 123 4567', gender: 'Female', location: 'Mumbai', status: 'pending', avatar: contactAvatar2 },
  { id: '1009', name: 'Robert Taylor', role: 'Backend Developer', email: 'robert.taylor@gmail.com', phone: '+91 901 234 5678', gender: 'Male', location: 'Bangalore', status: 'active', avatar: contactAvatar3 },
  { id: '1010', name: 'Neha Gupta', role: 'QA Engineer', email: 'neha.gupta@gmail.com', phone: '+91 012 345 6789', gender: 'Female', location: 'Kolkata', status: 'active', avatar: contactAvatar1 },
  { id: '1011', name: 'Chris Anderson', role: 'Frontend Developer', email: 'chris.anderson@gmail.com', phone: '+91 111 222 3333', gender: 'Male', location: 'Chennai', status: 'pending', avatar: contactAvatar2 },
  { id: '1012', name: 'Kavita Singh', role: 'Project Manager', email: 'kavita.singh@gmail.com', phone: '+91 222 333 4444', gender: 'Female', location: 'Delhi', status: 'active', avatar: contactAvatar3 },
];

// Add Employee Modal Component
const AddEmployeeModal = ({ isOpen, onClose, onAdd, editEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    gender: 'Male',
    location: '',
    status: 'pending'
  });

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        name: editEmployee.name,
        role: editEmployee.role,
        email: editEmployee.email,
        phone: editEmployee.phone,
        gender: editEmployee.gender,
        location: editEmployee.location,
        status: editEmployee.status
      });
    } else {
      setFormData({
        name: '',
        role: '',
        email: '',
        phone: '',
        gender: 'Male',
        location: '',
        status: 'pending'
      });
    }
  }, [editEmployee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-gray-900 text-lg font-medium">
            {editEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter role"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter phone number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter location"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 text-sm font-medium px-4 py-2.5 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors"
            >
              {editEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-lg w-[400px] p-5 shadow-xl">
        <h3 className="text-gray-900 text-lg font-medium mb-4">Delete Employee</h3>
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete <span className="text-gray-900 font-medium">{employeeName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white text-gray-700 text-sm font-medium px-4 py-2.5 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Contacts Page (Employees Table)
const ContactsPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const itemsPerPage = 5;

  const columns = [
    { key: 'id', label: 'Employee ID', sortable: true },
    { key: 'name', label: 'Employee Name', sortable: true },
    { key: 'email', label: 'Email Address', sortable: true },
    { key: 'phone', label: 'Contact Number', sortable: false },
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    const matchesGender = genderFilter === 'all' || emp.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate employees
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Handle sort
  const handleSort = (key) => {
    const column = columns.find(c => c.key === key);
    if (!column?.sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle add employee
  const handleAddEmployee = (formData) => {
    if (editEmployee) {
      setEmployees(prev => prev.map(emp =>
        emp.id === editEmployee.id
          ? { ...emp, ...formData }
          : emp
      ));
      setEditEmployee(null);
    } else {
      const newId = String(Math.max(...employees.map(e => parseInt(e.id))) + 1);
      const avatars = [contactAvatar1, contactAvatar2, contactAvatar3];
      const newEmployee = {
        ...formData,
        id: newId,
        avatar: avatars[Math.floor(Math.random() * avatars.length)]
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
  };

  // Handle edit employee
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle delete employee
  const handleDeleteEmployee = () => {
    if (deleteEmployee) {
      setEmployees(prev => prev.filter(emp => emp.id !== deleteEmployee.id));
      setDeleteEmployee(null);
      // Reset to page 1 if current page becomes empty
      if (paginatedEmployees.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Handle status toggle
  const handleStatusToggle = (employeeId) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === employeeId
        ? { ...emp, status: emp.status === 'active' ? 'pending' : 'active' }
        : emp
    ));
  };

  // Export to CSV
  const handleExport = () => {
    const headers = ['Employee ID', 'Name', 'Role', 'Email', 'Phone', 'Gender', 'Location', 'Status'];
    const csvData = sortedEmployees.map(emp =>
      [emp.id, emp.name, emp.role, emp.email, emp.phone, emp.gender, emp.location, emp.status].join(',')
    );
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setGenderFilter('all');
    setCurrentPage(1);
  };

  // Get sort icon
  const getSortIcon = (key) => {
    const column = columns.find(c => c.key === key);
    if (!column?.sortable) return null;

    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14l5-5 5 5H7z" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      );
    }
    return <IconSort />;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <div className="bg-white border-b border-gray-200 px-8 py-0 h-[69px] flex items-center justify-between">
        <h1 className="text-2xl font-medium">Contacts</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            <IconExport />
            Export
          </button>
          <button
            onClick={() => { setEditEmployee(null); setIsModalOpen(true); }}
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            + Add Contact
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">People</h2>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2.5 w-[360px]">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="flex-1 outline-none text-sm"
                />
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">⌘</span>
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-medium">F</span>
                </div>
              </div>
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="border border-black rounded px-3 py-2 text-sm font-medium"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
              {/* Gender Filter */}
              <select
                value={genderFilter}
                onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
                className="border border-black rounded px-3 py-2 text-sm font-medium"
              >
                <option value="all">All Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {(searchQuery || statusFilter !== 'all' || genderFilter !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="text-sm font-medium text-gray-600 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="space-y-3">
            {/* Header Row */}
            <div className="bg-gray-50 border border-gray-200 rounded flex items-center">
              <div className="w-[80px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id')}>
                <span className="text-sm text-gray-400 uppercase">ID</span>
                <IconSortUpDown />
              </div>
              <div className="w-[200px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                <span className="text-sm text-gray-400 uppercase">Name</span>
                <IconSortUpDown />
              </div>
              <div className="w-[240px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('email')}>
                <span className="text-sm text-gray-400 uppercase">Email</span>
                <IconSortUpDown />
              </div>
              <div className="w-[140px] px-3 py-3">
                <span className="text-sm text-gray-400 uppercase">Phone</span>
              </div>
              <div className="w-[100px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('gender')}>
                <span className="text-sm text-gray-400 uppercase">Gender</span>
                <IconSortUpDown />
              </div>
              <div className="w-[120px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('location')}>
                <span className="text-sm text-gray-400 uppercase">Location</span>
                <IconSortUpDown />
              </div>
              <div className="w-[100px] px-3 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('status')}>
                <span className="text-sm text-gray-400 uppercase">Status</span>
                <IconSortUpDown />
              </div>
              <div className="flex-1 px-3 py-3">
                <span className="text-sm text-gray-400 uppercase">Actions</span>
              </div>
            </div>

            {/* Data Rows */}
            {paginatedEmployees.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No contacts found matching your criteria.</div>
            ) : (
              paginatedEmployees.map((employee) => (
                <div key={employee.id} className="bg-white border border-gray-200 rounded flex items-center hover:shadow-sm transition-shadow">
                  {/* ID */}
                  <div className="w-[80px] px-3 py-2.5 text-sm text-gray-600">
                    {employee.id}
                  </div>
                  {/* Name */}
                  <div className="w-[200px] px-3 py-2.5 flex items-center gap-3">
                    <img src={employee.avatar} alt={employee.name} className="w-6 h-6 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{employee.name}</span>
                      <span className="text-xs text-gray-500">{employee.role}</span>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="w-[240px] px-3 py-2.5 flex items-center gap-2">
                    <IconEnvelope />
                    <a href={`mailto:${employee.email}`} className="text-sm font-medium underline truncate">{employee.email}</a>
                  </div>
                  {/* Phone */}
                  <div className="w-[140px] px-3 py-2.5 flex items-center gap-2">
                    <IconPhone2 />
                    <span className="text-sm text-gray-600">{employee.phone}</span>
                  </div>
                  {/* Gender */}
                  <div className="w-[100px] px-3 py-2.5 flex items-center gap-2">
                    {employee.gender === 'Male' ? <IconGenderMale /> : <IconGenderFemale />}
                    <span className="text-sm text-gray-600">{employee.gender}</span>
                  </div>
                  {/* Location */}
                  <div className="w-[120px] px-3 py-2.5 flex items-center gap-2">
                    <IconMapPin />
                    <span className="text-sm text-gray-600 truncate">{employee.location}</span>
                  </div>
                  {/* Status */}
                  <div className="w-[100px] px-3 py-2.5">
                    <button onClick={() => handleStatusToggle(employee.id)} className="focus:outline-none">
                      {employee.status === 'active' ? (
                        <span className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded">Active</span>
                      ) : (
                        <span className="bg-orange-50 text-orange-600 text-xs font-medium px-2 py-1 rounded">Pending</span>
                      )}
                    </button>
                  </div>
                  {/* Actions */}
                  <div className="flex-1 px-3 py-2.5 flex items-center gap-2">
                    <button
                      onClick={() => window.location.href = `tel:${employee.phone}`}
                      className="flex items-center gap-1 px-3 py-1.5 border border-black rounded text-xs font-medium hover:bg-gray-50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call
                    </button>
                    <button
                      onClick={() => window.location.href = `mailto:${employee.email}`}
                      className="flex items-center gap-1 px-3 py-1.5 border border-black rounded text-xs font-medium hover:bg-gray-50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Mail
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteEmployee(employee)}
                      className="p-1.5 hover:bg-red-50 rounded text-red-500"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-500 text-sm">
              Showing {sortedEmployees.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedEmployees.length)} of {sortedEmployees.length} entries
              {filteredEmployees.length !== employees.length && (
                <span className="text-gray-400"> (filtered from {employees.length} total)</span>
              )}
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`text-gray-600 hover:text-black transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <IconChevronLeft />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`text-sm font-medium w-7 h-7 rounded flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`text-gray-600 hover:text-black transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <IconChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditEmployee(null); }}
        onAdd={handleAddEmployee}
        editEmployee={editEmployee}
      />
      <DeleteConfirmModal
        isOpen={!!deleteEmployee}
        onClose={() => setDeleteEmployee(null)}
        onConfirm={handleDeleteEmployee}
        employeeName={deleteEmployee?.name}
      />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-white">
        <Sidebar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notifications" element={<ComingSoonPage title="Notifications" />} />
          <Route path="/tasks" element={<ComingSoonPage title="Tasks" />} />
          <Route path="/emails" element={<ComingSoonPage title="Emails" />} />
          <Route path="/calendars" element={<ComingSoonPage title="Calendars" />} />
          <Route path="/analytics" element={<ComingSoonPage title="Analytics" />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/companies" element={<ComingSoonPage title="Companies" />} />
          <Route path="/settings" element={<ComingSoonPage title="Settings" />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
