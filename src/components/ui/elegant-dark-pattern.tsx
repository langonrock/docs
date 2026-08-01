import type React from 'react';
import { cn } from '@/lib/cn';

interface DarkGradientBgProps {
  children?: React.ReactNode;
  className?: string;
}

/* Both ends of the streak gradient come from here, so changing the hue cannot
 * leave the transparent stop behind on the old one and tint the fade. */
const STREAK_RGB = '0, 130, 205';

/*
 * The upstream component ships these at 0.2. Measured against the rendered
 * backdrop rather than the token, 0.2 puts the hero's body copy at 2.60:1 and
 * the action at 2.90:1, against the 4.5:1 and 3:1 the project commits to. At
 * 0.07 and 0.08 the same pixels measure 4.99:1 and 4.78:1, with the display at
 * 7.84:1. Raising them is a contrast regression, not a taste call.
 */
const STREAK_OPACITY = 0.07;
const DOT_OPACITY = 0.08;

/**
 * The five streaks differ only in their mask stops, so they live as data rather
 * than as five near-identical elements.
 */
const STREAK_MASKS = [
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 36%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 11%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0.55) 41%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 9%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 28%, rgba(0, 0, 0, 0.424) 40%, rgb(0, 0, 0) 48%, rgba(0, 0, 0, 0.267) 54%, rgba(0, 0, 0, 0.13) 78%, rgb(0, 0, 0) 88%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 17%, rgba(0, 0, 0, 0.55) 26%, rgb(0, 0, 0) 35%, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.13) 69%, rgb(0, 0, 0) 79%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 27%, rgb(0, 0, 0) 42%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 74%, rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0.47) 88%, rgba(0, 0, 0, 0) 97%)',
];

export function DarkGradientBg({ children, className }: DarkGradientBgProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black',
        className,
      )}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              'radial-gradient(100% 100% at 0% 0%, rgb(46, 46, 46) 0%, rgb(0, 0, 0) 100%)',
            WebkitMask:
              'radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)',
            mask: 'radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          {STREAK_MASKS.map((maskImage, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                opacity: STREAK_OPACITY,
                background: `linear-gradient(rgba(${STREAK_RGB}, 1) 0%, rgba(${STREAK_RGB}, 0) 100%)`,
                WebkitMask: maskImage,
                mask: maskImage,
                transform: 'skewX(45deg)',
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
          backgroundSize: '149.76px',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: DOT_OPACITY,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute inset-0 bg-radial from-slate-800/20 via-transparent to-transparent" />

      {/* The only in-flow child, so it is what the flex centring above acts on. */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
