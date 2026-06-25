'use client'

import Image from 'next/image'

const mediaLogos = [
  { name: 'Harvard', src: '/static/images/harvard.svg' },
  { name: 'BBC', src: '/static/images/bbc.svg' },
  { name: 'Oxford', src: '/static/images/oxford.png' },
  { name: 'Forbes', src: '/static/images/forbes.svg' },
  { name: 'New York Times', src: '/static/images/nytimes.svg' },
]

export default function MediaTicker() {
  // Duplicate for seamless loop
  const allLogos = [...mediaLogos, ...mediaLogos]

  return (
    <section className="bg-paper border-line overflow-hidden border-y py-16">
      <div className="mb-8 text-center">
        <span className="eyebrow">As featured in</span>
      </div>

      {/* Infinite scroll ticker */}
      <div className="relative">
        <div className="animate-scroll-infinite flex">
          {allLogos.map((logo, index) => (
            <div key={index} className="mx-8 flex flex-shrink-0 items-center justify-center">
              <div className="flex h-16 w-32 items-center justify-center px-4 py-3">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={40}
                  className="max-h-9 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-80"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="from-paper pointer-events-none absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r to-transparent" />
        <div className="from-paper pointer-events-none absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l to-transparent" />
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
