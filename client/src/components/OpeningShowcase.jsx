import React from 'react';
import { Droplets, Heart, Scissors, Sparkles, Star } from 'lucide-react';

const showcaseProducts = [
  {
    name: 'Hair Serum',
    icon: Droplets,
    accent: '#dba36e',
    shadow: 'rgba(219, 163, 110, 0.28)',
    order: 0,
    angle: 0,
  },
  {
    name: 'Nail Gloss',
    icon: Star,
    accent: '#f2d6a2',
    shadow: 'rgba(242, 214, 162, 0.24)',
    order: 1,
    angle: 72,
  },
  {
    name: 'Styling Kit',
    icon: Scissors,
    accent: '#dd8b72',
    shadow: 'rgba(221, 139, 114, 0.24)',
    order: 2,
    angle: 144,
  },
  {
    name: 'Skin Elixir',
    icon: Sparkles,
    accent: '#7eb3a1',
    shadow: 'rgba(126, 179, 161, 0.22)',
    order: 3,
    angle: 216,
  },
  {
    name: 'Spa Ritual',
    icon: Heart,
    accent: '#98c4b3',
    shadow: 'rgba(152, 196, 179, 0.22)',
    order: 4,
    angle: 288,
  },
];

export default function OpeningShowcase({ isClosing, onSkip }) {
  return (
    <div class={`intro-screen ${isClosing ? 'intro-screen--closing' : ''}`}>
      <div class="intro-screen__grain"></div>
      <div class="intro-screen__halo intro-screen__halo--left"></div>
      <div class="intro-screen__halo intro-screen__halo--right"></div>
      <div class="intro-screen__halo intro-screen__halo--bottom"></div>

      <button
        type="button"
        onClick={onSkip}
        class="intro-screen__skip"
        aria-label="Skip opening animation"
      >
        Skip intro
      </button>

      <div class="intro-screen__content">
        <div class="intro-copy text-center space-y-4 max-w-2xl">
          <div class="intro-kicker intro-stagger-item" style={{ '--intro-order': 0 }}>
            Midnight salon edit
          </div>
          <h1
            class="intro-copy__headline intro-stagger-item text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight"
            style={{ '--intro-order': 1 }}
          >
            Staggered beauty motion before the reveal.
          </h1>
          <p
            class="intro-copy__body intro-stagger-item text-sm sm:text-base font-light leading-relaxed"
            style={{ '--intro-order': 2 }}
          >
            Each salon essential enters on its own beat and glides elegantly from left to right in a smooth carousel motion, showcasing our curated treatments before the full site opens.
          </p>
        </div>

        <div class="intro-orbit-scene">
          <div class="intro-orbit-scene__glow"></div>
          <div class="intro-curve intro-curve--primary" style={{ '--curve-order': 3 }}></div>
          <div class="intro-curve intro-curve--secondary" style={{ '--curve-order': 4 }}></div>
          <div class="intro-curve intro-curve--accent" style={{ '--curve-order': 5 }}></div>

          {showcaseProducts.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.name}
                class="intro-product"
                style={{
                  '--product-order': product.order,
                  '--product-accent': product.accent,
                  '--product-shadow': product.shadow,
                  '--start-angle': `${product.angle}deg`,
                }}
              >
                <div class="intro-product-icon">
                  <Icon size={34} class="intro-product-icon__glyph" strokeWidth={2.1} />
                </div>
                <div class="intro-product-label">{product.name}</div>
              </div>
            );
          })}
        </div>

        <div class="intro-brand-block">
          <div class="intro-brand-chip intro-stagger-item" style={{ '--intro-order': 9 }}>
            Beauty Saloon
          </div>
          <div class="space-y-2 intro-stagger-item" style={{ '--intro-order': 10 }}>
            <h2 class="intro-brand-title text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight">
              GlowSpot Hyderabad
            </h2>
            <p class="intro-brand-subtitle text-xs sm:text-sm uppercase tracking-[0.32em] font-semibold">
              Curated glam, premium motion, polished booking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
