"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Quote {
  id: number;
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    id: 1,
    text: "Gardening adds years to your life and life to your years.",
    author: "Unknown",
  },
  {
    id: 2,
    text: "To plant a garden is to believe in tomorrow.",
    author: "Audrey Hepburn",
  },
  {
    id: 3,
    text: "Gardens are not made by singing ‘Oh, how beautiful,’ and sitting in the shade.",
    author: "Rudyard Kipling",
  },
  {
    id: 4,
    text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.",
    author: "Alfred Austin",
  },
  {
    id: 5,
    text: "A garden requires patient labor and attention. Plants do not grow merely to satisfy ambitions or to fulfill good intentions.",
    author: "Liberty Hyde Bailey",
  },
];

const QuoteSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="py-12 px-5 xl:px-16 lg:px-12 bg-zinc-50">
      <h2 className="text-center text-3xl font-bold text-emerald-500 mb-2">
        Inspiring Gardening Quotes
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto mt-4  ">
        Let these words of wisdom inspire your passion for gardening and nature.
        Each quote brings a new perspective on nurturing growth and connecting
        with the beauty of green spaces.
      </p>

      <div className="max-w-3xl mx-auto">
        <Slider {...sliderSettings}>
          {quotes.map((quote) => (
            <div key={quote.id} className="p-4">
              <div className="bg-white h-[250px] flex flex-col justify-center items-center rounded-lg p-8 text-center relative overflow-hidden shadow-lg border border-emerald-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-green-100 opacity-20 pointer-events-none rounded-lg"></div>
                <p className="text-xl italic text-gray-800 mb-6 relative z-10 overflow-y-auto max-h-[150px] px-2">
                  {quote.text}
                </p>
                <h3 className="text-lg font-semibold text-emerald-500 relative z-10">
                  - {quote.author}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default QuoteSlider;
