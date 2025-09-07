import type React from "react"
import { ArrowRight,  Heart, MessageCircle, UserPlus, Pencil } from "lucide-react"

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


const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Navigation Header */}
  

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-12 shadow-xl animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30 flex-shrink-0">
              <span className="text-5xl font-bold">SB</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-bold mb-1 text-left">Sophia Bennett</h1>
                    <p className="text-blue-200 text-lg mb-2 text-left">@sophia_b</p>
                    <p className="text-blue-100 text-left">Software Engineer | Open Source Enthusiast</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                      <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30 transition-colors duration-200">
                        <UserPlus className="w-4 h-4"/>
                        Follow
                      </button>
                      <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-100 transition-colors duration-200">
                        <Pencil className="w-4 h-4"/>
                        Edit Profile
                      </button>
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
                  <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all  hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700" style={{animationDelay: `${500 + index * 100}ms`}}>
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
                            <button className="text-blue-600 font-semibold group transition-all duration-200 flex items-center hover:text-blue-700 text-sm">
                              View Project
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
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

export default ProfilePage

