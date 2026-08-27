import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import WhyWellfed from '@/components/sections/WhyWellfed';
import HowItWorks from '@/components/sections/HowItWorks';
import Menu from '@/components/sections/Menu';
import Makers from '@/components/sections/Makers';
import PromoBand from '@/components/sections/PromoBand';
import Recipes from '@/components/sections/Recipes';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyWellfed />
      <Menu />
      <Makers />
      <PromoBand />
      <Recipes />
      <Footer />
    </>
  );
}
