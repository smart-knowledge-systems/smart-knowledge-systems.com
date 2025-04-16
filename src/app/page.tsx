'use client';

import Hero from '../components/marketing/hero';
import Footer from '../components/marketing/footer';
import Services from '@/components/marketing/services';
import Main from '@/components/marketing/main';

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Main />
      <Services />
      <Footer />
    </div>
  );
}