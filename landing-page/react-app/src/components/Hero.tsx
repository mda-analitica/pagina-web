'use client';

import { useEffect, useRef } from 'react';

const images = [
  'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/8sm/xkp/fl4/Balance%20General%20Nivel%201.png',
  'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/jx5/y15/lye/Balance%20General%20Nivel%203.png',
];

interface HeroProps {
  tagline?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
}

export default function Hero({
  tagline = '',
  title = 'Toma el control financiero de tu Cooperativa en minutos',
  highlightedText = 'RIF-Analytic',
  description = 'Somos la analítica de las cooperativas, fondos de empleados y asociaciones mutuales de Colombia.',
}: HeroProps) {
  const currentIndexRef = useRef(0);
  const slidesRef = useRef<NodeListOf<Element> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    slidesRef.current = document.querySelectorAll('.hero-slide');
    if (!slidesRef.current.length) return;

    const nextSlide = () => {
      const slides = slidesRef.current!;
      slides[currentIndexRef.current].classList.remove('opacity-100');
      slides[currentIndexRef.current].classList.add('opacity-0');
      currentIndexRef.current = (currentIndexRef.current + 1) % slides.length;
      slides[currentIndexRef.current].classList.remove('opacity-0');
      slides[currentIndexRef.current].classList.add('opacity-100');
    };

    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white dark:bg-background-dark py-16 lg:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-4 text-left">
              {tagline && (
                <span className="text-primary dark:text-teal-400 text-sm font-extrabold uppercase tracking-widest">
                  {tagline}
                </span>
              )}
              <h1 className="text-[#0e111b] dark:text-white text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                {title}
                <br />
                <span className="text-primary dark:text-teal-400">
                  {highlightedText}
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
                {description}
              </p>
            </div>
          </div>

          {/* Dynamic Image Slider */}
          <div className="flex-1 w-full relative">
            <div
              id="hero-slider"
              className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              {images.map((img, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={img}
                  alt={`Balance General MDA Analítica ${index + 1}`}
                  className={`hero-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            {/* Decorative blurs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
