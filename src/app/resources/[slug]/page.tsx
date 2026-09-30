import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { learnTopics } from '../../../education';

export function generateStaticParams() {
  return learnTopics.map(topic => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = learnTopics.find(item => item.slug === slug);
  return {
    title: topic ? topic.title.replace(/^Learn About /, '') : 'Health Resource',
    description: topic?.summary || 'Plain-language health education from Nurse Lizzy Health.',
  };
}

const sources = [
  { label: 'WHO Health Topics', url: 'https://www.who.int/health-topics/' },
  { label: 'WHO Health Information', url: 'https://www.who.int/news-room/fact-sheets/' },
  { label: 'CDC Health Topics', url: 'https://www.cdc.gov/health-topics/' },
];

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = learnTopics.find(item => item.slug === slug);
  if (!topic) notFound();

  const related = learnTopics
    .filter(item => item.slug !== topic.slug && item.category === topic.category)
    .slice(0, 3);

  return (
    <main className="resource-detail">
      <section className="resource-detail-hero">
        <div className="wrap">
          <Link href="/resource-library" className="back-link"><ArrowLeft size={16}/> Resource Library</Link>
          <div className="resource-detail-kicker">{topic.category} / Health Explainer</div>
          <h1>{topic.title.replace(/^Learn About /, '')}</h1>
          <p className="resource-lede">{topic.summary}</p>
          <div className="resource-trust"><ShieldCheck size={17}/><span>Educational information designed to help you understand a topic and prepare better questions for a qualified healthcare professional.</span></div>
        </div>
      </section>

      <section className="section resource-detail-body">
        <div className="wrap resource-detail-layout">
          <article>
            <div className="resource-overview">
              <span className="eyebrow">At a glance</span>
              <p>{topic.summary}</p>
            </div>

            <div className="resource-sections">
              {topic.sections.map(([heading, body], index) => (
                <section className="resource-section" key={heading}>
                  <div className="resource-section-index">0{index + 1}</div>
                  <div><h2>{heading}</h2><p>{body}</p></div>
                </section>
              ))}
            </div>

            <section className="resource-faq">
              <div className="eyebrow">Questions people ask</div>
              <div className="resource-faq-list">
                {topic.faqs.map(([question, answer]) => (
                  <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
                ))}
              </div>
            </section>
          </article>

          <aside className="resource-sidebar">
            <div className="resource-action-card">
              <BookOpen size={22}/>
              <span className="eyebrow">Keep exploring</span>
              <h2>Build your understanding one resource at a time.</h2>
              <Link href="/resource-library" className="btn">Browse all resources →</Link>
            </div>

            <div className="resource-source-card">
              <span className="eyebrow">Reference starting points</span>
              <p>Nurse Lizzy Health is an educational resource. For clinical guidance, use authoritative health agencies and your qualified healthcare professional.</p>
              {sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ExternalLink size={14}/></a>)}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && <section className="section soft"><div className="wrap">
        <div className="resource-related-head"><div><span className="eyebrow">Related resources</span><h2>Continue learning</h2></div><Link href="/resource-library" className="read-link">VIEW LIBRARY →</Link></div>
        <div className="resource-related-grid">{related.map(item => <Link key={item.slug} href={`/resources/${item.slug}`} className="resource-related-card"><span>{item.category}</span><h3>{item.title.replace(/^Learn About /, '')}</h3><p>{item.summary}</p><ArrowUpRight size={17}/></Link>)}</div>
      </div></section>}

      <section className="resource-detail-disclaimer"><div className="wrap"><strong>Important:</strong> This page provides general education and does not diagnose, treat, or replace personalized medical advice. Seek appropriate professional or emergency care when needed.</div></section>
    </main>
  );
}
