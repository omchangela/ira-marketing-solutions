'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const BODY_HTML = `<div id="pb" style="width: 0%;"></div>
<canvas id="gl" aria-hidden="true" width="1849" height="921"></canvas>
<div id="dtip" class="gone"><span>Desktop layout at 1400px — pinch to zoom, double-tap to fit</span><button id="dclose" aria-label="Hide">✕</button></div>
<div id="side" aria-label="Sections"><button class="on"><b></b>Home</button><button><b></b>What we do</button><button><b></b>Services</button><button><b></b>Third Assistant</button><button><b></b>Why IRA</button><button><b></b>Process</button><button><b></b>About</button><button><b></b>Testimonials</button><button><b></b>Contact</button><button><b></b>Next step</button></div><div id="count"><strong id="cnum">01</strong>/ <span id="ctot">10</span></div>
<div id="keys" style="opacity: 1;">Scroll, or press <kbd>↓</kbd> <kbd>↑</kbd> to move between sections</div><div id="film" aria-hidden="true"></div>
<header><nav aria-label="Main"><a class="lg" href="#home" aria-label="IRA Marketing Solutions, home"><img src="/ira-logo.png" alt="IRA Marketing Solutions" width="110" height="46"></a>
<div class="links"><a href="#services">Services</a><a href="#third">Third Assistant</a><a href="#why">Why IRA</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
<a class="btn sm" href="#contact">Free Consultation</a></nav></header>

<main>
<section class="s" id="home"><div class="hw"><div class="pan in"><span class="tag">IRA Marketing Solutions</span><h1>Your Growth.<br>Our Strategy.</h1>
<p class="lead">We help businesses get found, generate better leads, book more appointments, and turn more opportunities into customers.</p>
<p>Strategy, advertising, websites, social media, automation, and AI — connected into one clear growth system.</p>
<div class="row"><a class="btn" href="#contact">Book Your Free Growth Consultation</a><a class="btn o" href="#services">See How We Can Help</a></div></div></div></section>

<section class="s"><div class="pan w g"><span class="tag">What We Do</span><h2>Marketing that moves your business forward.</h2>
<p class="say">We connect the pieces that bring customers to your business — and make the journey from first impression to inquiry much easier.</p>
<div class="four"><div class="cell"><b>Get Found</b><p>Google, social media, SEO</p></div><div class="cell"><b>Get Chosen</b><p>Branding, websites, content</p></div><div class="cell"><b>Get More Leads</b><p>Ads, funnels, follow-up</p></div><div class="cell"><b>Grow Smarter</b><p>Automation and AI</p></div></div>
<p style="margin-top:14px">More visibility. Better leads. Faster follow-up. Clearer results.</p><div class="row"><a class="btn" href="#services">Find Your Biggest Growth Opportunity</a></div></div></section>

<section class="s" id="services"><div class="pan w g"><span class="tag">Services</span><h2>Everything your business needs to grow online.</h2>
<p>Simple, connected services built around your goals — not random marketing activity.</p><div class="sg" id="sg"><div class="cell"><h3>Digital Marketing</h3><p>A practical growth plan built around your audience, goals, competition, and budget.</p><a href="#contact" data-s="0">Build My Strategy →</a></div><div class="cell"><h3>Social Media</h3><p>Content that keeps your business visible, credible, and active where customers spend time.</p><a href="#contact" data-s="1">Improve My Social Presence →</a></div><div class="cell"><h3>Meta Ads</h3><p>Facebook and Instagram campaigns designed to generate leads, calls, bookings, and sales.</p><a href="#contact" data-s="2">Generate More Leads →</a></div><div class="cell"><h3>Google Ads</h3><p>Reach people who are already searching for the products or services you provide.</p><a href="#contact" data-s="3">Reach Customers Now →</a></div><div class="cell"><h3>Website Design</h3><p>Clean, responsive websites that explain your value and guide visitors toward action.</p><a href="#contact" data-s="4">Build a Website That Converts →</a></div><div class="cell"><h3>Branding &amp; Creative</h3><p>A consistent visual identity that makes your business look professional and memorable.</p><a href="#contact" data-s="5">Strengthen My Brand →</a></div><div class="cell"><h3>SEO</h3><p>Improve your visibility in search and create a stronger long-term source of organic traffic.</p><a href="#contact" data-s="6">Improve Search Visibility →</a></div><div class="cell"><h3>Lead Generation</h3><p>Campaigns, landing pages, and follow-up systems designed to create more qualified opportunities.</p><a href="#contact" data-s="7">Build My Lead System →</a></div><div class="cell"><h3>Marketing Automation</h3><p>Respond faster, follow up consistently, and reduce repetitive work.</p><a href="#contact" data-s="8">Automate My Follow-Up →</a></div><div class="cell"><h3>AI &amp; Voice Solutions</h3><p>Use AI to answer, qualify, schedule, route, and support customer conversations.</p><a href="#contact" data-s="9">Explore Third Assistant →</a></div></div></div></section>

<section class="s" id="third"><div class="pan g"><span class="tag">AI receptionist by IRA</span><div class="big">Third<br>Assistant</div>
<p class="say" style="color:var(--sky);font-size:clamp(16px,2vw,21px)">Always ready when your team is busy</p>
<h2 style="font-size:clamp(24px,3.2vw,38px)">Never let a good call become a missed opportunity.</h2>
<p>Third Assistant is an AI receptionist that helps businesses answer more calls and move customers forward — even when no one is available to pick up.</p>
<ul class="ticks"><li>Answers customer calls</li><li>Handles common questions</li><li>Captures lead information</li><li>Books appointments</li><li>Routes important inquiries</li><li>Supports follow-up</li></ul>
<div class="row"><a class="btn" href="#contact">Explore Third Assistant</a></div></div></section>

<section class="s" id="why"><div class="pan w g"><span class="tag">Why IRA</span><h2>A clearer way to grow.</h2><p>We keep marketing practical, measurable, and easy to understand.</p><div class="vg" id="vg"><div class="cell"><h3>Strategy Before Spending</h3><p>We understand your business first, then recommend what actually makes sense.</p></div><div class="cell"><h3>Built Around Your Business</h3><p>No one-size-fits-all packages. Your plan is based on your market, goals, and stage of growth.</p></div><div class="cell"><h3>Focused on Real Outcomes</h3><p>We care about leads, calls, appointments, conversions, and sales — not just likes.</p></div><div class="cell"><h3>Creative + Data</h3><p>Strong ideas get attention. Performance data helps us improve what works.</p></div><div class="cell"><h3>Clear Communication</h3><p>You should always understand what is happening and why.</p></div><div class="cell"><h3>One Connected Growth System</h3><p>Branding, ads, websites, follow-up, automation, and AI work better together.</p></div></div></div></section>

<section class="s" id="process"><div class="pan w g"><span class="tag">Our Process</span><h2>From attention to customers.</h2><div class="st" id="st"><div class="cell"><h3>Understand</h3><p>We learn your business, your customers, and your goals.</p></div><div class="cell"><h3>Identify</h3><p>We find where opportunities are being missed and where growth can come from.</p></div><div class="cell"><h3>Build</h3><p>We create the right strategy, content, campaigns, website experience, and follow-up.</p></div><div class="cell"><h3>Launch</h3><p>We put the plan into action across the channels that matter most.</p></div><div class="cell"><h3>Optimize</h3><p>We measure results, improve performance, and scale what works.</p></div></div></div></section>

<section class="s" id="about"><div class="pan r g"><span class="tag">About Us</span><h2>Marketing with purpose.</h2>
<p class="say">IRA Marketing Solutions was built to make growth simpler for business owners.</p>
<p>We connect strategy, creativity, advertising, websites, automation, and AI so your marketing works as one system — not as disconnected tasks.</p>
<p style="margin-bottom:12px">Our goal is simple: help your business become easier to find, easier to trust, and easier to choose.</p>
<div class="cell"><b>Our Mission</b><p>Help businesses attract better opportunities and grow with practical, modern marketing.</p></div>
<div class="cell" style="margin-top:10px"><b>Our Vision</b><p>Become a trusted growth partner for businesses using marketing, automation, and AI.</p></div></div></section>

<section class="s" id="testimonials"><div class="pan g"><span class="tag">Testimonials</span><h2>What clients should feel.</h2><p>Clear strategy. Better communication. A stronger customer journey.</p>
<div class="qt"><q>IRA helped us create a much more professional online presence and finally gave us a clearer direction.</q><span>Business Owner</span></div>
<div class="qt"><q>They focused on our business goals, not just the ads. Everything felt more connected and practical.</q><span>Local Business Client</span></div>
<div class="qt"><q>The team explained what was working, what was changing, and what we should focus on next.</q><span>Service Business Owner</span></div>
<p class="note">Replace sample testimonials with verified client testimonials before publishing.</p></div></section>

<section class="s" id="contact"><div class="pan w g"><span class="tag">Contact</span><h2>Let’s find your next growth opportunity.</h2>
<p class="lead">Tell us where your business is today and where you want it to go. We’ll help identify the most practical next step.</p>
<p><strong style="color:var(--ink)">Prefer to talk?</strong> Phone: [Your Phone Number] · Email: [Your Business Email] · Location: [Your City / Service Area] · Monday–Friday, 9:00 a.m.–6:00 p.m.</p>
<form id="f" novalidate=""><div class="f"><label for="n">Full Name</label><input id="n" autocomplete="name" placeholder="Your name"><span class="er" id="en"></span></div>
<div class="f"><label for="b">Business Name</label><input id="b" autocomplete="organization" placeholder="Business name"></div>
<div class="f"><label for="em">Email Address</label><input id="em" type="email" autocomplete="email" placeholder="you@business.com"><span class="er" id="ee"></span></div>
<div class="f"><label for="ph">Phone Number</label><input id="ph" type="tel" autocomplete="tel" placeholder="Phone number"></div>
<div class="f full"><label for="sv">What are you interested in?</label><select id="sv"><option>Choose a service</option><option>Digital Marketing</option><option>Social Media</option><option>Meta Ads</option><option>Google Ads</option><option>Website Design</option><option>Branding</option><option>SEO</option><option>Lead Generation</option><option>Marketing Automation</option><option>Third Assistant / AI Voice Assistant</option></select></div>
<div class="f full"><label for="tx">Tell us about your business</label><textarea id="tx" placeholder="What are you trying to improve right now?"></textarea></div>
<div class="full"><button class="btn" type="submit">Request My Free Growth Consultation</button></div>
<div id="ok" role="status" tabindex="-1"><h3>Thank you — request received.</h3><p>We’ll review what you shared and reply with the most practical next step.</p></div></form></div></section>

<section class="s" id="final" style="min-height:70vh"><div class="pan r g"><span class="tag">Final Thought</span><h2>Your business deserves marketing that works harder.</h2><p class="say">Stop guessing what to do next.</p><p>Let’s identify your biggest marketing opportunity and build a plan around it.</p><div class="row"><a class="btn" href="#contact">Book Your Free Strategy Call</a></div></div></section>
</main>
<footer><div class="fc"><div><p class="say" style="font-size:20px;margin-bottom:6px">Your Growth. Our Strategy.</p><p>Strategy, advertising, websites, social media, automation, and AI — connected into one clear growth system.</p></div>
<div><b class="fh">Company</b><a href="#home">Home</a><a href="#services">Services</a><a href="#third">Third Assistant</a><a href="#about">About</a><a href="#testimonials">Testimonials</a><a href="#contact">Contact</a></div>
<div><b class="fh">Contact</b><span>[Your Phone Number]</span><span>[Your Business Email]</span><span>[Your City / Service Area]</span></div></div></footer>`;

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.initFunnelApp) {
      window.initFunnelApp();
    }
  }, []);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: BODY_HTML }}
        suppressHydrationWarning
      />
      <Script src="/app-funnel.js" strategy="afterInteractive" />
    </>
  );
}
