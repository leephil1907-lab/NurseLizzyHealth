import Link from 'next/link';
import { articles } from '../data';
import { KnowledgeTopics, LearningCards, WeeklyTip, DailyFact, MythFact, Discovery } from './learning-tools';
import { HeroCarousel } from './hero-carousel';

type CardItem = { slug: string; image: string; title: string; category: string; excerpt: string; read: string };
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

function ArticleCard({ item, index }: { item: CardItem; index: number }) {
  return <Link href={`/blog/${item.slug}`} className="motion-card">
    <div><span className="motion-card-number">0{index + 1} / {item.category}</span><h3>{item.title}</h3><p>{item.excerpt}</p></div>
    <span className="motion-card-arrow" aria-hidden="true">↗</span>
  </Link>;
}

export default function Home() {
  const featured = articles[0];
  return <main className="motion-page">
    <HeroCarousel />

    <section className="motion-intro">
      <div className="wrap motion-intro-grid">
        <div><span className="motion-kicker">Nurse Lizzy Health / 01</span><h2>Health information, made clearer for everyday life.</h2></div>
        <p className="motion-intro-copy">Explore practical explainers, thoughtful articles and free learning tools designed to help you understand health topics without unnecessary complexity.</p>
      </div>
    </section>

    <section className="section soft motion-section home-transparency">
      <div className="wrap home-transparency-inner">
        <div><span className="eyebrow">About our health information</span><p><strong>Nurse Lizzy Health is an educational resource.</strong> No individual clinical credentials or independent medical reviewer are currently identified on this website.</p></div>
        <p className="home-transparency-note">Our content is for general education—not diagnosis, treatment, or a substitute for personal care from a qualified health professional.</p>
        <div className="home-transparency-links"><Link href="/about" className="read-link">EDITORIAL APPROACH ↗</Link><Link href="/ask" className="read-link">SUGGEST A TOPIC ↗</Link></div>
      </div>
    </section>

    <section className="section motion-section">
      <div className="wrap">
        <div className="motion-section-head"><div><span className="motion-kicker">02 / Start here</span><h2>Find your way into better health knowledge.</h2></div><Link className="read-link" href="/hub">VISIT THE KNOWLEDGE HUB →</Link></div>
        <KnowledgeTopics limit={6}/>
      </div>
    </section>

    <section className="section soft motion-section"><div className="wrap"><WeeklyTip/></div></section>

    <section className="section motion-section">
      <div className="wrap">
        <div className="motion-section-head"><div><span className="motion-kicker">03 / Featured</span><h2>One useful story, worth your time.</h2></div><span className="motion-index">FEATURED ARTICLE</span></div>
        <Link href={`/blog/${featured.slug}`} className="motion-featured">
          <div className="motion-featured-media" style={{ backgroundImage: `url('${photo(featured.image)}')` }}/>
          <div className="motion-featured-copy"><span className="eyebrow">{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><p className="meta">{featured.read}</p><span className="btn">Read Article →</span></div>
        </Link>
      </div>
    </section>

    <section className="section soft motion-section">
      <div className="wrap">
        <div className="motion-section-head"><div><span className="motion-kicker">04 / Learn</span><h2>Understand the basics.</h2></div><Link className="read-link" href="/learn">ALL EXPLAINERS →</Link></div>
        <LearningCards limit={3}/>
      </div>
    </section>

    <section className="section motion-section">
      <div className="wrap">
        <div className="motion-section-head"><div><span className="motion-kicker">05 / Journal</span><h2>Thoughtful reads for real life.</h2></div><Link className="read-link" href="/blog">VIEW ALL ARTICLES →</Link></div>
        <div className="motion-card-grid">{articles.slice(1,4).map((article, index) => <ArticleCard key={article.slug} item={article} index={index}/>)}</div>
      </div>
    </section>

    <section className="section"><div className="wrap"><DailyFact/></div></section>

    <section className="section soft motion-section"><div className="wrap"><div className="motion-section-head"><div><span className="motion-kicker">06 / Clarity</span><h2>Myth vs fact.</h2></div></div><MythFact/></div></section>

    <section className="section motion-section"><div className="wrap"><div className="motion-section-head"><div><span className="motion-kicker">07 / Explore</span><h2>The Health Knowledge Hub.</h2></div><Link className="read-link" href="/hub">EXPLORE ALL TOPICS →</Link></div><KnowledgeTopics/></div></section>

    <section className="section soft motion-section"><div className="wrap"><div className="motion-section-head"><div><span className="motion-kicker">08 / Personalize</span><h2>What are you interested in?</h2></div></div><Discovery/></div></section>

    <section className="section motion-section">
      <div className="wrap motion-resource">
        <div className="motion-resource-copy"><span className="motion-kicker">09 / Free learning</span><h2>Useful tools for real life.</h2><p>Look up a health term, explore interactive learning tools, or follow a guided path through foundational topics. No purchase needed.</p><Link className="btn" href="/tools">Explore free learning tools →</Link><p><Link className="read-link" href="/glossary">A–Z glossary</Link> <Link className="read-link" href="/start-here">Learning paths</Link></p></div>
        <div className="motion-resource-media" style={{ backgroundImage: "url('/images/free-learning-tools-hero.jpg')" }}/>
      </div>
    </section>

    <section className="motion-cta"><div className="wrap motion-cta-inner"><div><span className="motion-kicker">Keep learning</span><h2>Good health information should feel approachable.</h2></div><p>Browse the knowledge hub, save useful articles, or suggest a topic you want explained.</p></div></section>
  </main>;
}
