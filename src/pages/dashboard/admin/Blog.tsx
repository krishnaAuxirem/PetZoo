import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, BookOpen, TrendingUp, Heart, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockPosts = [
  { id: "b1", title: "10 Signs Your Dog Needs to See a Vet Immediately", author: "Dr. Sarah Johnson", authorAvatar: "https://i.pravatar.cc/40?img=1", category: "Health", status: "published", publishedAt: "2024-12-15", views: 12480, likes: 847, comments: 124, readTime: 8, image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80" },
  { id: "b2", title: "Complete Guide to Cat Nutrition in 2024", author: "Dr. Emily Davis", authorAvatar: "https://i.pravatar.cc/40?img=2", category: "Nutrition", status: "published", publishedAt: "2024-12-10", views: 9234, likes: 612, comments: 89, readTime: 12, image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=80" },
  { id: "b3", title: "How to Train Your Dog: Positive Reinforcement", author: "Jake Miller", authorAvatar: "https://i.pravatar.cc/40?img=3", category: "Training", status: "published", publishedAt: "2024-12-08", views: 7891, likes: 534, comments: 67, readTime: 10, image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=80" },
  { id: "b4", title: "Pet Adoption: What to Expect in the First 30 Days", author: "Rachel Green", authorAvatar: "https://i.pravatar.cc/40?img=4", category: "Adoption", status: "draft", publishedAt: "2024-12-05", views: 6745, likes: 421, comments: 58, readTime: 7, image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=80" },
  { id: "b5", title: "5 Best Grooming Tips for Long-Haired Cats", author: "Maria Santos", authorAvatar: "https://i.pravatar.cc/40?img=5", category: "Grooming", status: "published", publishedAt: "2024-12-01", views: 5234, likes: 367, comments: 42, readTime: 6, image: "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=80" },
  { id: "b6", title: "Understanding Bird Body Language", author: "Dr. Michael Chen", authorAvatar: "https://i.pravatar.cc/40?img=6", category: "Behavior", status: "review", publishedAt: "2024-11-28", views: 4123, likes: 289, comments: 31, readTime: 9, image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=80" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  published: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  draft: { color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-white/5" },
  review: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
};

const categoryColors: Record<string, string> = {
  Health: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  Nutrition: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Training: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Adoption: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Grooming: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Behavior: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export default function AdminBlog() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockPosts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalViews = mockPosts.reduce((s, p) => s + p.views, 0);
  const totalLikes = mockPosts.reduce((s, p) => s + p.likes, 0);

  return (
    <DashboardLayout title="Blog Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Posts", value: "284", color: "from-violet-500 to-violet-600" },
          { label: "Total Views", value: `${(totalViews / 1000).toFixed(1)}K`, color: "from-sky-500 to-sky-600" },
          { label: "Total Likes", value: totalLikes.toLocaleString(), color: "from-pink-500 to-pink-600" },
          { label: "Pending Review", value: "12", color: "from-amber-500 to-amber-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Blog Posts ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Post", "Author", "Category", "Views", "Likes", "Status", "Published", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const sc = statusConfig[p.status];
                const cc = categoryColors[p.category] || "bg-slate-100 text-slate-600";
                return (
                  <tr key={p.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 max-w-xs">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">{p.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <img src={p.authorAvatar} alt={p.author} className="w-7 h-7 rounded-lg" />
                        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{p.author}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", cc)}>{p.category}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300">{p.views.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{p.likes.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold capitalize", sc.color, sc.bg)}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{p.publishedAt}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Create New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input placeholder="Post title..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Author</label>
                  <input placeholder="Author name" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                    {Object.keys(categoryColors).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt</label>
                <textarea rows={3} placeholder="Brief description..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Publish Post</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
