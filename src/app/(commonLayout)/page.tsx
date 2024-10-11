import HeroSection from "@/components/UI/heroSection/HeroSection";
import ImageGallery from "@/components/UI/imageGallery/ImageGallery";

const HomePage = async () => {
  // const posts = await getAllPosts("isr");

  return (
    <>
      <HeroSection />
      <ImageGallery />
    </>
  );
};

export default HomePage;
