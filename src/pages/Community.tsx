import { useState } from "react";
import { Heart, MessageSquare, Share2, Image, Send, Users, Hash } from "lucide-react";
import { mockCommunityPosts } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";
import toast from "react-hot-toast";

const groups = [
  { name: "Golden Retriever Parents", members: 8924 },
  { name: "Cat Lovers Unite", members: 12340 },
  { name: "Rescue & Adoption Stories", members: 5621 },
  { name: "Pet Health & Wellness", members: 7823 },
  { name: "Dog Training Tips", members: 4521 },
  { name: "Exotic Pets Club", members: 2134 },
];

const tags = ["dogmom", "catlife", "petzoo", "adopt", "vetadvice", "petfood", "puppylove", "rescuedog"];

export default function Community() {
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [postText, setPostText] = useState("");
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const submitPost = () => {
    if (!postText.trim()) { toast.error("Write something first"); return; }
    const newPost = {
      id: `c${Date.now()}`, author: "You", authorAvatar: "https://ui-avatars.com/api/?name=You&background=F97316&color=fff",
      content: postText, likes: 0, comments: 0, shares: 0,
      createdAt: new Date().toISOString(), tags: [],
    };
    setPosts(prev => [newPost, ...prev]);
    setPostText("");
    toast.success("Post published to community");
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-14 bg-gradient-to-br from-teal-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/community-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Community</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Join the PetZoo Community</h1>
          <p className="text-white/70">Share stories, get advice, join breed groups and connect with 48K+ pet lovers worldwide.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-5">
            {/* Post Composer */}
            <div className="card-base p-5">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">Y</div>
                <div className="flex-1">
                  <textarea value={postText} onChange={e => setPostText(e.target.value)} rows={3} placeholder="Share something about your pet..."
                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-sm text-light-text dark:text-dark-heading placeholder-light-muted dark:placeholder-dark-muted focus:outline-none focus:border-brand-orange resize-none" />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-3">
                      <button className="flex items-center gap-1.5 text-light-muted dark:text-dark-muted text-sm hover:text-brand-orange transition-colors"><Image className="w-4 h-4" /> Photo</button>
                    </div>
                    <button onClick={submitPost} className="flex items-center gap-2 px-5 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl transition-colors">
                      <Send className="w-4 h-4" /> Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="card-base p-5 hover:shadow-card transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{post.author}</p>
                      {post.petName && <span className="text-xs text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg">{post.petName}</span>}
                    </div>
                    <p className="text-light-muted dark:text-dark-muted text-xs">{formatRelativeTime(post.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-light-text dark:text-dark-body leading-relaxed mb-4">{post.content}</p>
                {post.image && <img src={post.image} alt="post" loading="lazy" className="w-full rounded-xl mb-4 max-h-80 object-cover" />}
                {post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {post.tags.map(t => <span key={t} className="text-xs text-brand-blue hover:text-brand-blue-dark cursor-pointer">#{t}</span>)}
                  </div>
                )}
                <div className="flex gap-4 pt-3 border-t border-light-border dark:border-dark-border">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-sm transition-colors ${liked.includes(post.id) ? "text-red-500" : "text-light-muted dark:text-dark-muted hover:text-red-500"}`}>
                    <Heart className={`w-4 h-4 ${liked.includes(post.id) ? "fill-red-500" : ""}`} />
                    {post.likes + (liked.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-light-muted dark:text-dark-muted hover:text-brand-orange transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button onClick={() => toast.success("Link copied")} className="flex items-center gap-1.5 text-sm text-light-muted dark:text-dark-muted hover:text-brand-blue transition-colors">
                    <Share2 className="w-4 h-4" /> {post.shares}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-base p-5">
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-brand-orange" /> Popular Groups</h3>
              <div className="space-y-3">
                {groups.map(g => (
                  <button key={g.name} onClick={() => toast.success(`Joined ${g.name}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors">{g.name}</p>
                        <p className="text-xs text-light-muted dark:text-dark-muted">{g.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    <span className="text-xs text-brand-orange font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Join</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-base p-5">
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4 flex items-center gap-2"><Hash className="w-4 h-4 text-brand-blue" /> Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <button key={t} onClick={() => toast.info("Filtering by #" + t)} className="text-sm text-brand-blue hover:text-brand-blue-dark bg-brand-blue/10 hover:bg-brand-blue/20 px-3 py-1 rounded-full transition-colors">#{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
