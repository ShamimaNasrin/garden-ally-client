import HeroSection from "@/components/home/heroSection/HeroSection";
import ImageGallery from "@/components/home/imageGallery/ImageGallery";
import QuoteSlider from "@/components/home/quoteSection/QuoteSlider";
import TipsSection from "@/components/home/tipsAndTricks/TipsSection";

const HomePage = async () => {
  // const posts = await getAllPosts("isr");

  return (
    <>
      <HeroSection />
      <QuoteSlider />
      <ImageGallery />
      <TipsSection />
    </>
  );
};

export default HomePage;
