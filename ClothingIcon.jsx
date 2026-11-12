import React from 'react';

/**
 * Clean, modern product-style clothing vector illustrations for WashWise.
 * Replaces generic emojis with polished SVG graphics.
 */
export default function ClothingIcon({ type, className = 'w-10 h-10', color = '#6366f1' }) {
  switch (type) {
    case 'tshirt':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 12 C24 18 40 18 44 12 L56 22 L49 31 L43 27 L43 52 C43 54 41 56 39 56 L25 56 C23 56 21 54 21 52 L21 27 L15 31 L8 22 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M25 14 C27 20 37 20 39 14" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M21 51 L43 51" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'shirt':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 12 L10 22 L17 31 L22 26 L22 53 C22 55 24 57 26 57 L38 57 C40 57 42 55 42 53 L42 26 L47 31 L54 22 L44 12 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M22 13 L32 24 L42 13" stroke={color} strokeWidth="3" strokeLinejoin="round" />
          <line x1="32" y1="24" x2="32" y2="57" stroke={color} strokeWidth="2.5" strokeDasharray="3 4" />
          <circle cx="32" cy="30" r="1.8" fill={color} />
          <circle cx="32" cy="38" r="1.8" fill={color} />
          <circle cx="32" cy="46" r="1.8" fill={color} />
        </svg>
      );

    case 'jeans':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 14 H47 L45 54 C45 55 43 56 41 56 L34 56 C33 56 32 55 32 54 L32 30 L32 54 C32 55 31 56 30 56 L23 56 C21 56 19 55 19 54 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Waistband & pockets */}
          <line x1="17" y1="20" x2="47" y2="20" stroke={color} strokeWidth="2.5" />
          <path d="M20 20 C20 27 25 29 28 27" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M44 20 C44 27 39 29 36 27" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="20" x2="32" y2="28" stroke={color} strokeWidth="2.5" />
        </svg>
      );

    case 'trousers':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 13 H46 L44 54 C44 55 42 56 40 56 L34 56 L32 32 L30 56 L24 56 C22 56 20 55 20 54 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="18" y1="18" x2="46" y2="18" stroke={color} strokeWidth="2.5" />
          <line x1="26" y1="22" x2="26" y2="52" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="38" y1="22" x2="38" y2="52" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      );

    case 'shorts':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 16 H48 L46 41 C46 42 45 43 43 43 L34 43 L32 27 L30 43 L21 43 C19 43 18 42 18 41 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="16" y1="22" x2="48" y2="22" stroke={color} strokeWidth="2.5" />
          <path d="M29 22 L27 25" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M35 22 L37 25" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'socks':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 14 H35 V34 C35 37 38 41 42 41 H48 C51 41 53 44 53 47 C53 51 49 54 44 54 H34 C24 54 18 46 18 36 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="20" y1="19" x2="35" y2="19" stroke={color} strokeWidth="2.5" />
          <line x1="20" y1="24" x2="35" y2="24" stroke={color} strokeWidth="2.5" />
          <path d="M42 41 C42 48 46 54 53 47" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );

    case 'undergarments':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 20 H52 C52 26 49 32 44 38 C38 46 32 49 32 49 C32 49 26 46 20 38 C15 32 12 26 12 20 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="12" y1="24" x2="52" y2="24" stroke={color} strokeWidth="2" strokeDasharray="3 2" />
          <path d="M22 36 Q32 30 42 36" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'towels':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect
            x="14"
            y="14"
            width="36"
            height="40"
            rx="5"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
          />
          <line x1="14" y1="44" x2="50" y2="44" stroke={color} strokeWidth="3" />
          <line x1="14" y1="48" x2="50" y2="48" stroke={color} strokeWidth="2" strokeDasharray="2 3" />
          <path d="M20 22 H44 M20 28 H44 M20 34 H36" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'bedsheets':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 26 L32 14 L52 26 L32 38 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 26 V44 L32 56 V38"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.15"
          />
          <path
            d="M52 26 V44 L32 56 V38"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.25"
          />
          <path d="M22 32 L42 20" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'hoodies':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 18 C20 11 44 11 44 18 L56 26 L49 35 L44 31 L44 54 H20 L20 31 L15 35 L8 26 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hood cowl */}
          <path d="M24 18 C24 25 40 25 40 18" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {/* Kangaroo Pocket */}
          <path d="M25 43 H39 V51 H25 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
          {/* Drawstrings */}
          <line x1="28" y1="23" x2="28" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="23" x2="36" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'sweaters':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 13 H42 L55 24 L48 33 L42 28 V54 H22 V28 L16 33 L9 24 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M26 13 C26 17 38 17 38 13" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {/* Ribbed knit pattern */}
          <line x1="22" y1="50" x2="42" y2="50" stroke={color} strokeWidth="2.5" strokeDasharray="2 3" />
          <line x1="27" y1="24" x2="37" y2="34" stroke={color} strokeWidth="2" opacity="0.5" />
          <line x1="37" y1="24" x2="27" y2="34" stroke={color} strokeWidth="2" opacity="0.5" />
        </svg>
      );

    case 'delicates':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 16 L25 30 L32 20 L39 30 L46 16 L44 48 C44 52 40 54 32 54 C24 54 20 52 20 48 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M25 30 Q32 36 39 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="22" r="2" fill={color} />
          <path d="M22 46 C27 49 37 49 42 46" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'sportswear':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 14 C24 17 40 17 44 14 L55 22 L48 31 L42 27 V52 H22 V27 L16 31 L9 22 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Dynamic athletic chevron stripes */}
          <path d="M22 32 L32 24 L42 32" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 38 L32 30 L40 38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="16" width="32" height="32" rx="8" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="3" />
        </svg>
      );
  }
}

