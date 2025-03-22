import React, { useState } from 'react';
import { Search, Filter, Users, Plus, Check, X, Star, Heart, Calendar, Code, BookOpen, Music, Film, Briefcase } from 'lucide-react';

const ClubsPage = () => {
  // Sample club data
  const initialClubs = [
    {
      id: 1,
      name: "AWS cloud Club",
      description: "Weekly tech meetings and learning sessions for all skill levels.",
      members: 24,
      category: "academic",
      icon: <BookOpen />
    },
    {
      id: 2,
      name: "gdg",
      description: "Competitive basketball team with regular practice sessions.",
      members: 15,
      category: "sports",
      icon: <Star />
    },
    {
      id: 3,
      name: "ACM Club",
      description: "Express yourself through various art forms and techniques.",
      members: 32,
      category: "arts",
      icon: <Heart />
    },
    {
      id: 4,
      name: "Coding Club",
      description: "Learn programming and work on exciting tech projects.",
      members: 28,
      category: "technology",
      icon: <Code />
    },
    {
      id: 5,
      name: "Students technical and innovation club",
      description: "Sharpen your public speaking and argumentation skills.",
      members: 18,
      category: "academic",
      icon: <BookOpen />
    },
    {
      id: 6,
      name: "Photography Club",
      description: "Capture beautiful moments and learn photography techniques.",
      members: 22,
      category: "arts",
      icon: <Film />
    },
    {
      id: 7,
      name: "Soccer Club",
      description: "Casual soccer games and skill development sessions.",
      members: 20,
      category: "sports",
      icon: <Star />
    },
    {
      id: 8,
      name: "Book Club",
      description: "Read and discuss interesting books with fellow book lovers.",
      members: 15,
      category: "social",
      icon: <Calendar />
    },
    {
      id: 9,
      name: "Robotics Team",
      description: "Build and program robots for competitions and exhibitions.",
      members: 12,
      category: "technology",
      icon: <Code />
    }
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [myClubs, setMyClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Function to join a club
  const joinClub = (club) => {
    if (!myClubs.some(myClub => myClub.id === club.id)) {
      // Add to my clubs
      setMyClubs([...myClubs, club]);
      
      // Update member count
      const updatedClubs = clubs.map(c => 
        c.id === club.id ? { ...c, members: c.members + 1 } : c
      );
      setClubs(updatedClubs);
    }
  };

  // Function to leave a club
  const leaveClub = (clubId) => {
    // Remove from my clubs
    setMyClubs(myClubs.filter(club => club.id !== clubId));
    
    // Update member count
    const updatedClubs = clubs.map(c => 
      c.id === clubId ? { ...c, members: c.members - 1 } : c
    );
    setClubs(updatedClubs);
  };

  // Filter clubs based on search term and category
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || club.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Get category badge color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'sports': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'arts': return 'bg-purple-100 text-purple-800';
      case 'technology': return 'bg-indigo-100 text-indigo-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-white">Club Directory</h1>
        <p className="text-blue-100 mt-2">Find and join clubs that match your interests</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('all')}
          >
            <Filter className="h-4 w-4 mr-1" />
            All Clubs
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'sports' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('sports')}
          >
            <Star className="h-4 w-4 mr-1" />
            Sports
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'academic' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('academic')}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Academic
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'arts' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('arts')}
          >
            <Music className="h-4 w-4 mr-1" />
            Arts
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'technology' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('technology')}
          >
            <Code className="h-4 w-4 mr-1" />
            Technology
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'social' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter('social')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Social
          </button>
        </div>
      </div>

      {/* All Clubs Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Clubs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredClubs.map(club => {
          const isJoined = myClubs.some(myClub => myClub.id === club.id);
          
          return (
            <div key={club.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:shadow-lg hover:translate-y-1">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-50 mr-3">
                    {club.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{club.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(club.category)}`}>
                    {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{club.members} members</span>
                  </div>
                </div>
                
                {isJoined ? (
                  <button 
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => leaveClub(club.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Leave Club
                  </button>
                ) : (
                  <button 
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => joinClub(club)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Join Club
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* My Clubs Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Clubs</h2>
      {myClubs.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500">You haven't joined any clubs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myClubs.map(club => (
            <div key={club.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:shadow-lg hover:translate-y-1">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    {club.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{club.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(club.category)}`}>
                    {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{club.members} members</span>
                  </div>
                </div>
                
                <button 
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => leaveClub(club.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Leave Club
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubsPage;