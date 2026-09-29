import Link from 'next/link';
import { articles } from '../data';
import { KnowledgeTopics, LearningCards, WeeklyTip, DailyFact, MythFact, Discovery } from './learning-tools';
import { HeroCarousel } from './hero-carousel';

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
type CardItem = { slug: string; image: string; title: string; category: string; excerpt: string; read: string };

function ArticleCard({ item }: { item: CardItem }) {
  return <Link href={`/blog/${item.slug}`} className="card">
    <div className="card-image" style={{ backgroundImage: `url('${photo(item.image)}')` }} />
    <div className="card-body">
      <span className="eyebrow">{item.category}</span>
      <h3>{item.title}</h3>
      <p className="meta">{item.read}</p>
      <span className="read-link">READ ARTICLE　↗</span>
    </div>
  </Link>;
}

export default function Home() {
  const featured = articles[0];
  return <main>
    <HeroCarousel />

    <section className="section soft home-transparency">
      <div className="wrap home-transparency-inner">
        <div><span className="eyebrow">About our health information</span><p><strong>Nurse Lizzy Health is an educational resource.</strong> No individual clinical credentials or independent medical reviewer are currently identified on this website.</p></div>
        <p className="home-transparency-note">Our content is for general education—not diagnosis, treatment, or a substitute for personal care from a qualified health professional.</p>
        <div className="home-transparency-links"><Link href="/about" className="read-link">EDITORIAL APPROACH　↗</Link><Link href="/ask" className="read-link">SUGGEST A TOPIC　↗</Link></div>
      </div>
    </section>

    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">A place to begin</span><h2>Popular health topics</h2></div><Link className="read-link" href="/hub">VISIT THE KNOWLEDGE HUB　→</Link></div><KnowledgeTopics limit={6}/></div></section>
    <section className="section soft"><div className="wrap"><WeeklyTip/></div></section>
    <section className="section"><div className="wrap"><div className="featured-article"><div className="featured-image" style={{ backgroundImage: `url('${photo(featured.image)}')` }}/><div className="featured-copy"><span className="eyebrow">FEATURED ARTICLE · {featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><p className="meta">{featured.read}</p><Link className="btn" href={`/blog/${featured.slug}`}>Read Article　→</Link></div></div></div></section>
    <section className="section soft"><div className="wrap"><div className="section-head"><div><span className="eyebrow">Health explained simply</span><h2>Understand the basics</h2></div><Link className="read-link" href="/learn">ALL EXPLAINERS　→</Link></div><LearningCards limit={3}/></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">From the journal</span><h2>Thoughtful reads for real life</h2></div><Link className="read-link" href="/blog">VIEW ALL ARTICLES　→</Link></div><div className="cards">{articles.slice(1,4).map(article=><ArticleCard key={article.slug} item={article}/>)}</div></div></section>
    <section className="section"><div className="wrap"><DailyFact/></div></section>
    <section className="section soft"><div className="wrap"><div className="section-head"><div><span className="eyebrow">A little clarity goes a long way</span><h2>Myth vs fact</h2></div></div><MythFact/></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">Explore at your own pace</span><h2>The Health Knowledge Hub</h2></div><Link className="read-link" href="/hub">EXPLORE ALL TOPICS　→</Link></div><KnowledgeTopics/></div></section>
    <section className="section soft"><div className="wrap"><div className="section-head"><div><span className="eyebrow">Personalize your browsing</span><h2>What are you interested in?</h2></div></div><Discovery/></div></section>

    <section className="section"><div className="wrap resource"><div className="resource-pic" style={{ backgroundImage: `url('${photo('photo-1455390582262-044cdead277a')}')` }}/><div className="resource-copy"><span className="eyebrow">Free, practical learning</span><h2>Useful tools for real life.</h2><p>Explore the interactive learning tools, look up a health term, or follow a guided path through foundational topics. No purchase needed.</p><Link className="btn" href="/tools">Explore free learning tools　→</Link><p><Link className="read-link" href="/glossary">A–Z glossary</Link>　<Link className="read-link" href="/start-here">Learning paths</Link></p></div></div></section>
  </main>;
}
