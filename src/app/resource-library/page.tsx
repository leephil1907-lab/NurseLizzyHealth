'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ArrowUpRight, BookOpen, Stethoscope, Sparkles } from 'lucide-react';
import { knowledgeTopics, learnTopics, glossary } from '../../education';
import { articles } from '../../data';

const categories = ['All','Topics','Conditions & Learn','Articles','Glossary'];

export default function ResourceLibraryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    const topicItems = knowledgeTopics.map(t => ({ type:'Topics', title:t.name, description:t.intro, href:`/hub/${t.slug}`, meta:'Health topic' }));
    const learnItems = learnTopics.map(t => ({ type:'Conditions & Learn', title:t.title.replace(/^Learn About /,''), description:t.summary, href:`/resources/${t.slug}`, meta:t.category }));
    const articleItems = articles.map(a => ({ type:'Articles', title:a.title, description:a.excerpt, href:`/blog/${a.slug}`, meta:a.category }));
    const glossaryItems = glossary.map(([term,definition]) => ({ type:'Glossary', title:term, description:definition, href:`/glossary#${term.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`, meta:'A–Z glossary' }));
    return [...topicItems,...learnItems,...articleItems,...glossaryItems].filter(item => {
      const matchesCategory = category === 'All' || item.type === category;
      const matchesQuery = !q || `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category,q]);

  return <main>
    <section className="page-hero resource-library-hero">
      <div className="wrap">
        <span className="eyebrow">Nurse Lizzy Health / Resource Library</span>
        <h1>Find health information<br/><em>without the overwhelm.</em></h1>
        <p>Search health topics, educational explainers, articles and glossary definitions in one place. Start with a question, explore a category, or browse A–Z.</p>
        <div className="library-search">
          <Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search diabetes, sleep, blood pressure…" aria-label="Search health resources"/><kbd>⌘ K</kbd>
        </div>
      </div>
    </section>

    <section className="section resource-library-section">
      <div className="wrap">
        <div className="library-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Resource type">{categories.map(c=><button key={c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <span className="library-count">{results.length} resources</span>
        </div>

        {!q && category==='All' && <div className="library-intro-grid">
          <Link href="/hub" className="library-feature"><span className="library-icon"><BookOpen size={22}/></span><div><span className="eyebrow">Start with a topic</span><h2>Health Knowledge Hub</h2><p>Explore broad subjects from nutrition and women’s health to heart health, mental wellness, sleep and healthy aging.</p></div><ArrowUpRight/></Link>
          <Link href="/learn" className="library-feature dark"><span className="library-icon"><Stethoscope size={22}/></span><div><span className="eyebrow">Understand a subject</span><h2>Health Explainers</h2><p>Plain-language introductions to conditions, symptoms, measurements and everyday health concepts.</p></div><ArrowUpRight/></Link>
          <Link href="/resources/visual-guides" className="library-feature visual-feature"><span className="library-icon"><Sparkles size={22}/></span><div><span className="eyebrow">See it simply</span><h2>Visual Health Guides</h2><p>Quick learning cards for hydration, sleep, nutrition, movement and everyday health concepts.</p></div><ArrowUpRight/></Link>
        </div>}

        <div className="library-results" aria-live="polite">
          {results.map((item,index)=><Link className="library-result-card" href={item.href} key={`${item.type}-${item.href}`}>
            <span className="library-result-number">{String(index+1).padStart(2,'0')}</span><div><span className="library-result-type">{item.meta}</span><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight className="library-arrow" size={19}/>
          </Link>)}
          {!results.length && <div className="library-empty"><Sparkles size={22}/><h2>No resource found yet.</h2><p>Try a broader search term such as “heart”, “nutrition”, “sleep”, or “women’s health”.</p></div>}
        </div>
      </div>
    </section>

    <section className="section soft"><div className="wrap"><div className="library-az-head"><div><span className="eyebrow">A–Z</span><h2>Health glossary</h2></div><Link href="/glossary" className="read-link">OPEN FULL GLOSSARY →</Link></div><div className="glossary-strip">{glossary.slice(0,12).map(([term,definition])=><Link href={`/glossary#${term.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} key={term}><strong>{term}</strong><span>{definition}</span><ArrowUpRight size={16}/></Link>)}</div></div></section>

    <section className="newsletter"><div className="wrap newsletter-in"><div><span className="eyebrow">Keep learning</span><h2>Health information you can return to.</h2><p>Bookmark useful resources and bring questions from your reading to your healthcare professional.</p></div><Link href="/ask" className="btn">Suggest a health topic →</Link></div></section>
  </main>;
}
