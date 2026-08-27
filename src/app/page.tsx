import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import WhyWellfed from '@/components/sections/WhyWellfed';
import HowItWorks from '@/components/sections/HowItWorks';
import Menu from '@/components/sections/Menu';
import Makers from '@/components/sections/Makers';
import PromoBand from '@/components/sections/PromoBand';
import Comparison from '@/components/sections/Comparison';
import Offers from '@/components/sections/Offers';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyWellfed />
      <Menu />
      <Makers />
      <PromoBand />
      <Comparison />
      <Offers />
      <Faq />
      <Footer />
    </>
  );
}
