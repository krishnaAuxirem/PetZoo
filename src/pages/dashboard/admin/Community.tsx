import { useState } from "react";
import { Search, MessageSquare, Eye, Trash2, Flag, CheckCircle, XCircle, Heart, Share2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockPosts = [
  { id: "c1", author: "Sarah M.", authorAvatar: "https://i.pravatar.cc/40?img=1", content: "Max just graduated from his obedience training. So proud of my boy!", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200", likes: 247, comments: 32, reports: 0, createdAt: "2024-12-18", status: "active", type: "post" },
  { id: "c2", author: "David K.", authorAvatar: "https://i.pravatar.cc/40?img=2", content: "Luna's first vet visit went so well! Dr. Davis said she's perfectly healthy.", likes: 189, comments: 24, reports: 0, createdAt: "2024-12-17", status: "active", type: "post" },
  { id: "c3", author: "Flagged User", authorAvatar: "https://i.pravatar.cc/40?img=3", content: "SPAM CONTENT - Buy cheap pet meds here! bit.ly/fake-meds", likes: 0, comments: 0, reports: 12, createdAt: "2024-12-16", status: "flagged", type: "post" },
  { id: "c4", author: "Emma R.", authorAvatar: "https://i.pravatar.cc/40?img=4", content: "Just adopted Buddy from Happy Tails Shelter and he has already settled in!", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=200", likes: 412, comments: 67, reports: 0, createdAt: "2024-12-16", status: "active", type: "post" },
  { id: "c5", author: "Alex T.", authorAvatar: "https://i.pravatar.cc/40?img=5", content: "Reminder: December temperatures are dropping. Keep outdoor pets warm.", likes: 534, comments: 45, reports: 0, createdAt: "2024-12-15", status: "active", type: "post" },
  { id: "c6", author: "Spam Bot", authorAvatar: "https://i.pravatar.cc/40?img=6", content: "Make $5000 daily with this pet trick! Click here...", likes: 0, comments: 0, reports: 8, createdAt: "2024-12-14", status: "removed", type: "post" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  active: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  flagged: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
  removed: { color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-white/5" },
};

export default function AdminCommunity() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockPosts.filter(p => {
    const matchSearch = p.author.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout title="Community Moderation">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Posts", value: "14,821", color: "from-sky-500 to-sky-600" },
          { label: "Active Today", value: "847", color: "from-emerald-500 to-emerald-600" },
          { label: "Flagged Posts", value: "23", color: "from-red-500 to-red-600" },
          { label: "Members", value: "48,291", color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Community Posts ({filtered.length})</h3>
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Posts</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="removed">Removed</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(post => {
            const sc = statusConfig[post.status];
            return (
              <div key={post.id} className={cn("p-5 hover:bg-slate-50 dark:hover:bg-white/1.5 transition-colors", post.status === "flagged" && "bg-red-50/30 dark:bg-red-500/5")}>
                <div className="flex items-start gap-4">
                  <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{post.author}</p>
                        <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", sc.color, sc.bg)}>{post.status}</span>
                        {post.reports > 0 && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10">
                            <Flag className="w-3 h-3" /> {post.reports} reports
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{post.createdAt}</span>
                    </div>
                    <p className={cn("text-sm leading-relaxed mb-3", post.status === "flagged" ? "text-red-700 dark:text-red-400" : "text-slate-600 dark:text-slate-300")}>{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="" className="w-32 h-20 object-cover rounded-xl mb-3" />
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{post.comments}</span>
                      <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" />Share</span>
                      <div className="ml-auto flex items-center gap-1.5">
                        {post.status === "flagged" && (
                          <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 text-xs font-semibold hover:bg-emerald-100 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}
                        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 text-xs font-semibold hover:bg-red-100 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
