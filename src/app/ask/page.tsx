import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Suggest a Health Topic', description: 'Suggest a topic for a future plain-language health explainer.' };
const topicMessage = encodeURIComponent('Hello Nurse Lizzy, I would like to suggest a topic for a future general health explainer.');

export default function Ask() {
  return <main>
    <section className="page-hero"><div className="wrap"><span className="eyebrow">Help shape future explainers</span><h1>Suggest a topic.</h1><p>Tell us what you would like to learn about. Topic suggestions are considered for general education, not for personal diagnosis or treatment.</p></div></section>
    <section className="section"><div className="wrap ask-layout"><div><h2 className="serif">A real way to reach us.</h2><p style={{lineHeight:1.8,color:'#666'}}>The website does not collect or save Ask Nurse Lizzy form submissions. Use the WhatsApp link to send a general topic suggestion instead.</p><p className="medical-note">Please do not include private medical details. WhatsApp is not an emergency service, and we cannot provide personal medical advice or diagnose conditions by message.</p></div><div className="ask-form"><a className="btn" href={`https://wa.me/2349150484921?text=${topicMessage}`} target="_blank" rel="noopener noreferrer">Suggest a topic on WhatsApp　↗</a><p>WhatsApp will open so you can review and send the message yourself. Your topic is not submitted until you choose to send it.</p></div></div></section>
  </main>;
}
