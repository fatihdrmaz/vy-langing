import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { RevealObserver } from "@/components/motion/Reveal";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Moment } from "@/components/sections/Moment";
import { Dining } from "@/components/sections/Dining";
import { Premium } from "@/components/sections/Premium";
import { PayEarn } from "@/components/sections/PayEarn";
import { Tiers } from "@/components/sections/Tiers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { Download } from "@/components/sections/Download";
import { Faq } from "@/components/sections/Faq";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <a href="#main" className="sr-only">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <Journey />
        <Moment />
        <Dining />
        <Premium />
        <PayEarn />
        <Tiers />
        <HowItWorks />
        <Trust />
        <Download />
        <Faq />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
