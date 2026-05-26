import { useState } from "react";
import { Search, Star, MessageSquare, ThumbsUp, Filter } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockReviews = [
  { id: "r1", reviewer: "Sarah Johnson", avatar: "https://i.pravatar.cc/40?img=1", petName: "Max", service: "Full Grooming Package", rating: 5, comment: "Absolutely incredible service! Maria did an amazing job with Max. He looks and smells amazing. Will definitely be back every month!", date: "2024-12-26", replied: false },
  { id: "r2", reviewer: "Emma Roberts", avatar: "https://i.pravatar.cc/40?img=2", petName: "Bella", service: "De-shedding Treatment", rating: 5, comment: "The de-shedding treatment was so effective. Bella's coat looks beautiful and there's much less hair around the house. Highly recommend!", date: "2024-12-24", replied: true },
  { id: "r3", reviewer: "David Kim", avatar: "https://i.pravatar.cc/40?img=3", petName: "Luna", service: "Cat Spa Treatment", rating: 4, comment: "Great service overall. Luna was a bit nervous at first but the groomer handled her so gently. Would have been 5 stars but we waited a bit long.", date: "2024-12-22", replied: false },
  { id: "r4", reviewer: "Alex Thompson", avatar: "https://i.pravatar.cc/40?img=4", petName: "Rex", service: "Full Grooming Package", rating: 5, comment: "Rex looks like a brand new dog! The team is so professional and clearly loves animals. Rex was relaxed the whole time. This is our permanent groomer now.", date: "2024-12-20", replied: true },
  { id: "r5", reviewer: "Amanda Foster", avatar: "https://i.pravatar.cc/40?img=5", petName: "Buddy", service: "Nail Trim & Filing", rating: 3, comment: "Quick and professional but Buddy seemed a bit stressed. Maybe they could work on creating a calmer environment for nervous dogs.", date: "2024-12-18", replied: false },
];

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} className={cn("w-3.5 h-3.5", s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600")} />
    ))}
  </div>
);

const avgRating = mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length;
const ratingDist = [5, 4, 3, 2, 1].map(r => ({ rating: r, count: mockReviews.filter(rev => rev.rating === r).length }));

export default function Reviews() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [showReplyFor, setShowReplyFor] = useState<string | null>(null);

  const filtered = mockReviews.filter(r => {
    const matchSearch = r.reviewer.toLowerCase().includes(search.toLowerCase()) || r.comment.toLowerCase().includes(search.toLowerCase());
    const matchRating = ratingFilter === "all" || r.rating === Number(ratingFilter);
    return matchSearch && matchRating;
  });

  return (
    <DashboardLayout title="Reviews">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Average Rating", value: `${avgRating.toFixed(1)} ★`, color: "from-amber-500 to-amber-600" },
          { label: "Total Reviews", value: mockReviews.length, color: "from-sky-500 to-sky-600" },
          { label: "5-Star Reviews", value: mockReviews.filter(r => r.rating === 5).length, color: "from-emerald-500 to-emerald-600" },
          { label: "Needs Response", value: mockReviews.filter(r => !r.replied).length, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Rating Summary */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Rating Summary</h3>
          <div className="text-center mb-5">
            <p className="font-poppins font-extrabold text-5xl text-slate-900 dark:text-white">{avgRating.toFixed(1)}</p>
            <RatingStars rating={Math.round(avgRating)} />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Based on {mockReviews.length} reviews</p>
          </div>
          <div className="space-y-2">
            {ratingDist.map(d => (
              <div key={d.rating} className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-400 w-4">{d.rating}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                <div className="flex-1 bg-slate-100 dark:bg-white/6 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: d.count > 0 ? `${(d.count / mockReviews.length) * 100}%` : "0%" }} />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-4">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Ratings</option>
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
          </div>

          <div className="space-y-4">
            {filtered.map(r => (
              <div key={r.id} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <img src={r.avatar} alt={r.reviewer} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">{r.reviewer}</p>
                      <span className="text-xs text-slate-400">{r.date}</span>
                    </div>
                    <RatingStars rating={r.rating} />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Service: {r.service} · Pet: {r.petName}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{r.comment}</p>
                <div className="flex items-center justify-between">
                  {r.replied && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Replied
                    </span>
                  )}
                  {!r.replied && (
                    <button onClick={() => setShowReplyFor(showReplyFor === r.id ? null : r.id)}
                      className="text-xs text-brand-orange font-semibold flex items-center gap-1 hover:underline">
                      <MessageSquare className="w-3.5 h-3.5" /> Reply
                    </button>
                  )}
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                  </div>
                </div>
                {showReplyFor === r.id && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                    <textarea rows={2} value={replyText[r.id] || ""} onChange={e => setReplyText(prev => ({ ...prev, [r.id]: e.target.value }))}
                      placeholder="Write a response..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none resize-none mb-2" />
                    <div className="flex gap-2">
                      <button onClick={() => setShowReplyFor(null)} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/8 text-xs text-slate-600 dark:text-slate-400">Cancel</button>
                      <button onClick={() => { setShowReplyFor(null); }} className="px-3 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Send Reply</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
