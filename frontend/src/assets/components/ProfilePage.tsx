import type React from "react"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Pencil } from "lucide-react"
import { DevIdeasPage } from "./DevIdeasPage";

// Mock data for showcases
const showcases = [
  {
    title: "AI-Powered Recipe Generator",
    description: "A web app that suggests recipes based on ingredients you have at home, using a custom-trained GPT model.",
    tags: ["React", "Node.js", "AI/ML"],
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=Recipe+App",
    stats: {
      likes: 120,
      comments: 45,
      views: "2.5k"
    }
  },
  {
    title: "Personal Finance Tracker",
    description: "Track your expenses and manage your budget with intuitive charts and insights. Connects with Plaid API.",
    tags: ["Vue.js", "Firebase", "D3.js"],
    image: "https://placehold.co/600x400/10b981/ffffff?text=Finance+Tracker",
    stats: {
      likes: 250,
      comments: 80,
      views: "5.1k"
    }
  }
];

// Placeholder component for the project detail page



const ProfilePage: React.FC = () => {
  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the profile data
  const [profileData, setProfileData] = useState({
    name: "Sophia Bennett",
    username: "@sophia_b",
    bio: "Software Engineer | Open Source Enthusiast",
  });

  // A temporary state to hold edits without affecting the main profile data until saved
  const [editableProfileData, setEditableProfileData] = useState(profileData);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler to enter edit mode
  const handleEdit = () => {
    setEditableProfileData(profileData); // Reset temporary data to current profile data
    setIsEditing(true);
  };

  // Handler to save changes
  const handleSave = () => {
    setProfileData(editableProfileData); // Commit changes
    setIsEditing(false);
  };

  // Handler to cancel editing
  const handleCancel = () => {
    setIsEditing(false); // Discard changes
  };


  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-12 shadow-xl animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30 flex-shrink-0">
              <span className="text-5xl font-bold">SB</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  // EDITING VIEW
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={editableProfileData.name}
                      onChange={handleInputChange}
                      className="w-full text-4xl font-bold bg-white/10 rounded-lg p-2 border border-white/20 focus:ring-2 focus:ring-white/50 outline-none transition"
                    />
                    <input
                      type="text"
                      name="username"
                      value={editableProfileData.username}
                      onChange={handleInputChange}
                      className="w-full text-lg text-blue-200 bg-white/10 rounded-lg p-2 border border-white/20 focus:ring-2 focus:ring-white/50 outline-none transition"
                    />
                    <textarea
                      name="bio"
                      value={editableProfileData.bio}
                      onChange={handleInputChange}
                      className="w-full text-blue-100 bg-white/10 rounded-lg p-2 border border-white/20 focus:ring-2 focus:ring-white/50 outline-none transition resize-none"
                      rows={2}
                    />
                  </div>
                ) : (
                  // DISPLAY VIEW
                  <div>
                    <h1 className="text-4xl font-bold mb-1 text-left">{profileData.name}</h1>
                    <p className="text-blue-200 text-lg mb-2 text-left">{profileData.username}</p>
                    <p className="text-blue-100 text-left">{profileData.bio}</p>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-1 flex-shrink-0">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 m-5">
                        Save Changes
                      </button>
                      <button onClick={handleCancel} className="bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleEdit} className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-100 transition-colors duration-200">
                        <Pencil className="w-4 h-4"/>
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Showcases */}
        <div className="grid grid-cols-12 gap-8">
            {/* Left Sidebar - Stats */}
            <div className="col-span-3 space-y-8 animate-in fade-in slide-in-from-left duration-700 delay-200">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistics</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-600">Points</span>
                            <span className="font-bold text-blue-600 text-xl">250</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "75%"}}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-600">Projects</span>
                            <span className="font-bold text-green-600 text-xl">12</span>
                        </div>
                         <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{width: "40%"}}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-600">Collaborations</span>
                            <span className="font-bold text-purple-600 text-xl">8</span>
                        </div>
                         <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "60%"}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content - Showcases */}
            <div className="col-span-9">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
                My Showcases
              </h2>

              <div className="space-y-8">
                {showcases.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom" style={{animationDelay: `${500 + index * 100}ms`}}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-48 h-32 object-cover rounded-xl"/>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                        <div className="flex items-center justify-between">
                            <Link to={`/project/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 font-semibold group transition-all duration-200 flex items-center hover:text-blue-700 text-sm">
                              View Project
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                            <div className="flex items-center gap-4 text-slate-500">
                                <span className="flex items-center gap-1.5 text-sm"><Heart className="w-4 h-4"/> {item.stats.likes}</span>
                                <span className="flex items-center gap-1.5 text-sm"><MessageCircle className="w-4 h-4"/> {item.stats.comments}</span>
                                
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </main>
    </div>
  )
}

// Main App component to handle routing
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/project/:title" element={<DevIdeasPage />} />
            </Routes>
        </Router>
    )
}

export default App;

