import HeroSection from "@/components/home/heroSection/HeroSection";
import ImageGallery from "@/components/home/imageGallery/ImageGallery";
import QuoteSlider from "@/components/home/quoteSection/QuoteSlider";
import TipsSection from "@/components/home/tipsAndTricks/TipsSection";

const HomePage = async () => {
  return (
    <div className="mx-auto max-w-[2520px] px-2 md:px-10 xl:px-20 p-4 min-h-screen bg-zinc-50">
      <HeroSection />
      <QuoteSlider />
      <ImageGallery />
      <TipsSection />
    </div>
  );
};

export default HomePage;
