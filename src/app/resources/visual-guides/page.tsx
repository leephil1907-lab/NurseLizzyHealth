import Link from 'next/link';
import { ArrowUpRight, Droplets, HeartPulse, Moon, Salad, Activity, ShieldCheck } from 'lucide-react';

const guides = [
 {title:'How to read a health resource',tag:'Health literacy',icon:ShieldCheck,steps:['Start with the definition','Check what the evidence says','Notice what varies by person','Write down questions for a professional']},
 {title:'Understanding blood pressure',tag:'Heart health',icon:HeartPulse,steps:['Know what systolic means','Know what diastolic means','Look at readings in context','Discuss repeated concerns with a professional']},
 {title:'Hydration basics',tag:'Everyday health',icon:Droplets,steps:['Notice thirst and fluid loss','Consider heat and activity','Follow individual fluid guidance','Seek help when severe symptoms appear']},
 {title:'Building a balanced meal',tag:'Nutrition',icon:Salad,steps:['Include variety','Add a protein source','Include vegetables or fruit','Adapt to your needs, culture and access']},
 {title:'Starting movement gradually',tag:'Fitness',icon:Activity,steps:['Choose something manageable','Build gradually','Allow recovery','Adapt for health conditions or injuries']},
 {title:'A calmer sleep routine',tag:'Sleep',icon:Moon,steps:['Keep a regular schedule','Create a comfortable sleep environment','Reduce stimulating activities before bed','Get help when sleep problems persist']},
];

export default function VisualGuidesPage(){
 return <main className="visual-guides-page">
  <section className="page-hero"><div className="wrap"><span className="eyebrow">Nurse Lizzy Health / Visual Guides</span><h1>See the idea.<br/><em>Understand the next step.</em></h1><p>Short, visual learning cards that turn common health concepts into simple steps you can remember and discuss with a qualified professional.</p></div></section>
  <section className="section"><div className="wrap"><div className="visual-guide-grid">{guides.map(({title,tag,icon:Icon,steps})=><article className="visual-guide-card" key={title}><div className="visual-guide-top"><span>{tag}</span><Icon size={23}/></div><h2>{title}</h2><ol>{steps.map((step,i)=><li key={step}><b>0{i+1}</b><span>{step}</span></li>)}</ol></article>)}</div></div></section>
  <section className="section soft"><div className="wrap visual-guide-cta"><div><span className="eyebrow">Go deeper</span><h2>Turn a visual guide into a full resource.</h2><p>Each guide connects to the wider library, where you can explore explainers, articles and glossary terms.</p></div><Link href="/resource-library" className="btn">Open Resource Library →</Link></div></section>
 </main>
}
