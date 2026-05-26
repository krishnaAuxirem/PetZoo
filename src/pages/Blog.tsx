import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, Eye, Heart, Tag } from "lucide-react";
import { mockBlogPosts } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

const categories = ["All", "Health", "Nutrition", "Training", "Adoption", "Grooming", "Behavior"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = mockBlogPosts.filter(p =>
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase())) &&
    (cat === "All" || p.category === cat)
  );

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/20 text-orange-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">📝 PetZoo Blog</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Expert Pet Care Advice & Insights</h1>
          <p className="text-white/70 mb-8">Guides, tips and stories from veterinarians, trainers and pet experts.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/40" />
          </div>
        </div>
      </section>

      <div className="bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${cat === c ? "bg-brand-orange text-white" : "bg-light-hover dark:bg-dark-hover text-light-muted dark:text-dark-muted hover:text-brand-orange"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        {filtered[0] && (
          <Link to={`/blog/${filtered[0].id}`} className="block card-base overflow-hidden mb-10 hover:shadow-card-hover transition-all group">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={filtered[0].image} alt={filtered[0].title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold px-3 py-1 rounded-full mb-3">{filtered[0].category}</span>
                <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-3 group-hover:text-brand-orange transition-colors">{filtered[0].title}</h2>
                <p className="text-light-muted dark:text-dark-muted text-sm mb-4 line-clamp-3">{filtered[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted">
                  <div className="flex items-center gap-2">
                    <img src={filtered[0].authorAvatar} alt={filtered[0].author} className="w-6 h-6 rounded-full object-cover" />
                    <span>{filtered[0].author}</span>
                  </div>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{filtered[0].readTime} min read</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{filtered[0].views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">{post.category}</span>
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">{post.title}</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted">
                  <div className="flex items-center gap-2">
                    <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full object-cover" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}m</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
