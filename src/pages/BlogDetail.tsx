import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Heart, Tag, Share2 } from "lucide-react";
import { mockBlogPosts } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function BlogDetail() {
  const { id } = useParams();
  const post = mockBlogPosts.find(p => p.id === id) || mockBlogPosts[0];
  const related = mockBlogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  const fullContent = `${post.excerpt}

Understanding your pet's health needs is one of the most important responsibilities as a pet owner. This comprehensive guide covers everything you need to know to provide the best care for your beloved companion.

## Key Points to Remember

**Regular Veterinary Check-ups**: Annual or semi-annual visits to the vet are essential for preventive care. Even if your pet appears healthy, regular check-ups can detect potential issues early when they are most treatable.

**Proper Nutrition**: Feed your pet a balanced, age-appropriate diet. Consult with your veterinarian to determine the best food options based on breed, age, weight, and health conditions.

**Exercise and Mental Stimulation**: Regular physical activity and mental enrichment are crucial for your pet's overall well-being. Activities should be tailored to your pet's age, breed, and health status.

**Preventive Care**: Stay up-to-date with vaccinations, parasite prevention, and dental care. These preventive measures can significantly improve your pet's quality of life and longevity.

## Signs to Watch For

Monitor your pet daily for any changes in behavior, appetite, energy levels, or physical appearance. Early detection of health issues leads to better outcomes and often more affordable treatment options.

Always consult with a qualified veterinarian when you notice any concerning symptoms or behavioral changes in your pet. The PetZoo community is here to support you every step of the way.`;

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-orange transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-3 py-1 rounded-full mb-4">{post.category}</span>
        <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-6 leading-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{post.author}</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">{formatDate(post.publishedAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto text-sm text-light-muted dark:text-dark-muted">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} min read</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views.toLocaleString()}</span>
            <button onClick={() => toast.success("Liked!")} className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart className="w-4 h-4" />{post.likes}</button>
            <button onClick={() => toast.success("Link copied!")} className="flex items-center gap-1 hover:text-brand-blue transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>

        <img src={post.image} alt={post.title} className="w-full rounded-2xl mb-8 aspect-video object-cover" />

        <div className="prose prose-lg max-w-none text-light-text dark:text-dark-body space-y-4">
          {fullContent.split("\n\n").map((para, i) => {
            if (para.startsWith("## ")) return <h2 key={i} className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mt-8 mb-3">{para.replace("## ", "")}</h2>;
            if (para.startsWith("**")) return <p key={i} className="font-semibold text-light-text dark:text-dark-heading">{para.replace(/\*\*/g, "")}</p>;
            return <p key={i} className="text-light-muted dark:text-dark-muted leading-relaxed">{para}</p>;
          })}
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-light-border dark:border-dark-border">
          {post.tags.map(t => <span key={t} className="flex items-center gap-1 text-sm text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full"><Tag className="w-3 h-3" />#{t}</span>)}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.id}`} className="card-base overflow-hidden hover:shadow-card-hover transition-all group">
                  <div className="aspect-video overflow-hidden">
                    <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm text-light-text dark:text-dark-heading line-clamp-2 group-hover:text-brand-orange transition-colors">{r.title}</h4>
                    <p className="text-xs text-light-muted dark:text-dark-muted mt-1">{r.readTime} min · {r.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
