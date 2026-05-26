import { useState } from "react";
import { Heart, MessageSquare, Share2, Plus, Image, Send, PawPrint, ThumbsUp, Bookmark } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const communityPosts = [
  { id: "c1", author: "Sarah M.", authorAvatar: "https://i.pravatar.cc/40?img=1", content: "Max just graduated from his obedience training! So proud of my boy — he can now sit, stay, shake and even roll over on command! 🐕", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600", likes: 247, comments: 32, createdAt: "2 hours ago", tags: ["dogtraining", "goldenretriever"], liked: false },
  { id: "c2", author: "David K.", authorAvatar: "https://i.pravatar.cc/40?img=2", content: "Luna's first vet visit went so well! Dr. Davis said she's perfectly healthy. Pro tip: bring your cat's favorite treat to make the visit less stressful.", likes: 189, comments: 24, createdAt: "5 hours ago", tags: ["catcare", "vettips"], liked: true },
  { id: "c3", author: "Emma R.", authorAvatar: "https://i.pravatar.cc/40?img=3", content: "Just adopted Buddy from Happy Tails Shelter and he has already settled in like he's been here forever. Adoption is the best decision we ever made! 🐾", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=600", likes: 412, comments: 67, createdAt: "Yesterday", tags: ["adopt", "rescuedog"], liked: false },
  { id: "c4", author: "Alex T.", authorAvatar: "https://i.pravatar.cc/40?img=4", content: "Reminder to all pet owners: December temperatures are dropping! Make sure your outdoor pets have warm shelter, fresh water (check for freezing) and enough food. Stay safe out there! ❤️", likes: 534, comments: 45, createdAt: "2 days ago", tags: ["petcare", "winter", "reminder"], liked: false },
];

const trendingTopics = ["#goldenpups", "#catlife", "#adoptdontshop", "#vetday", "#petlovers", "#dogtraining"];

export default function OwnerCommunity() {
  const [posts, setPosts] = useState(communityPosts);
  const [newPost, setNewPost] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: `new-${Date.now()}`, author: "You", authorAvatar: "https://i.pravatar.cc/40?img=15",
      content: newPost, likes: 0, comments: 0, createdAt: "Just now", tags: [], liked: false,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost("");
  };

  return (
    <DashboardLayout title="Community">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Create Post */}
          <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start gap-3 mb-3">
              <img src="https://i.pravatar.cc/40?img=15" alt="You" className="w-10 h-10 rounded-xl" />
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share something about your pet..."
                className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/40 resize-none transition-colors"
                rows={2} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Image className="w-4 h-4" /> Photo
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <PawPrint className="w-4 h-4" /> Tag Pet
                </button>
              </div>
              <button onClick={handlePost} disabled={!newPost.trim()} className={cn("flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all", newPost.trim() ? "bg-brand-orange text-white hover:bg-orange-600" : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed")} style={newPost.trim() ? { boxShadow: "0 4px 12px rgba(249,115,22,0.3)" } : {}}>
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 p-4 pb-0">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-xl" />
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{post.author}</p>
                  <p className="text-xs text-slate-400">{post.createdAt}</p>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{post.content}</p>
                {post.tags.length > 0 && (
                  <p className="text-xs text-sky-500 mt-1">{post.tags.map(t => `#${t}`).join(" ")}</p>
                )}
              </div>
              {(post as any).image && (
                <img src={(post as any).image} alt="" className="w-full object-cover max-h-64" />
              )}
              <div className="flex items-center gap-1 p-3 border-t border-slate-100 dark:border-white/5">
                <button onClick={() => toggleLike(post.id)} className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all", liked[post.id] ? "text-red-500 bg-red-50 dark:bg-red-500/10" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5")}>
                  <Heart className={cn("w-4 h-4", liked[post.id] && "fill-red-500")} />
                  <span className="text-xs">{post.likes + (liked[post.id] ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all ml-auto">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-3">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map(tag => (
                <button key={tag} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sky-600 dark:text-sky-400 text-xs font-semibold hover:bg-brand-orange/10 hover:text-brand-orange transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-3">Community Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Members", value: "48,291" },
                { label: "Posts Today", value: "847" },
                { label: "Active Right Now", value: "1,247" },
                { label: "Pet Stories Shared", value: "124,821" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{s.label}</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
