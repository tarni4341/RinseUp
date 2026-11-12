import React from 'react';

/**
 * High-fidelity, responsive SVG illustration of a modern front-load washing machine.
 * Features realistic controls, LED display, inner stainless steel drum,
 * and a distinctly visible open hinged door for AVAILABLE machines.
 */
export default function WashingMachine({
  doorState = 'closed', // 'open' | 'closed'
  status = 'available', // 'available' | 'in-use' | 'out-of-order' | 'setting-up' | 'running'
  size = 'md', // 'sm', 'md', 'lg', 'hero'
  isSpinning = false,
  showWater = false,
  progress = 0,
  glowEffect = true,
  className = '',
}) {
  const isOpen = doorState === 'open';

  // Size mapping
  const sizeMap = {
    sm: { width: 140, height: 160 },
    md: { width: 220, height: 250 },
    lg: { width: 280, height: 320 },
    hero: { width: 340, height: 390 },
  };

  const dimensions = typeof size === 'object' ? size : sizeMap[size] || sizeMap.md;

  // Status accents
  const statusColors = {
    available: { led: '#10b981', ring: '#10b981', text: 'READY', glow: 'rgba(16, 185, 129, 0.25)' },
    'in-use': { led: '#ec4899', ring: '#ec4899', text: 'RUN', glow: 'rgba(236, 72, 153, 0.25)' },
    'out-of-order': { led: '#ef4444', ring: '#ef4444', text: 'ERROR', glow: 'rgba(239, 68, 68, 0.25)' },
    'setting-up': { led: '#3b82f6', ring: '#3b82f6', text: 'SETUP', glow: 'rgba(59, 130, 246, 0.25)' },
    running: { led: '#8b5cf6', ring: '#8b5cf6', text: 'WASH', glow: 'rgba(139, 92, 246, 0.35)' },
  };

  const activeTheme = statusColors[status] || statusColors.available;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        filter: glowEffect ? `drop-shadow(0 14px 30px ${activeTheme.glow})` : undefined,
      }}
    >
      <svg
        viewBox="0 0 340 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Machine Outer Body Linear Gradient */}
          <linearGradient id="bodyGrad" x1="20" y1="20" x2="320" y2="370" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Machine Top Bevel */}
          <linearGradient id="topBevel" x1="170" y1="12" x2="170" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Control Panel Glass Bar */}
          <linearGradient id="panelGrad" x1="30" y1="42" x2="310" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F1F5F9" />
          </linearGradient>

          {/* LED Display Background */}
          <linearGradient id="ledScreenGrad" x1="210" y1="52" x2="295" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F172A" />
            <stop offset="1" stopColor="#1E293B" />
          </linearGradient>

          {/* Metallic Chrome Ring Gradient */}
          <linearGradient id="chromeRing" x1="90" y1="160" x2="250" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="0.25" stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#94A3B8" />
            <stop offset="0.75" stopColor="#CBD5E1" />
            <stop offset="1" stopColor="#64748B" />
          </linearGradient>

          {/* Dark Glass Drum Porthole */}
          <radialGradient id="drumGlass" cx="170" cy="245" r="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#334155" />
            <stop offset="0.5" stopColor="#1E293B" />
            <stop offset="0.9" stopColor="#0F172A" />
            <stop offset="1" stopColor="#020617" />
          </radialGradient>

          {/* Open Drum Interior Depth Gradient */}
          <radialGradient id="openDrumInterior" cx="160" cy="245" r="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#475569" />
            <stop offset="0.4" stopColor="#1E293B" />
            <stop offset="0.8" stopColor="#0F172A" />
            <stop offset="1" stopColor="#020617" />
          </radialGradient>

          {/* Glass Door Swing Gradient (Open Door) */}
          <linearGradient id="doorSwingGlass" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="0.4" stopColor="rgba(199, 210, 254, 0.2)" />
            <stop offset="0.9" stopColor="rgba(99, 102, 241, 0.15)" />
            <stop offset="1" stopColor="rgba(255, 255, 255, 0.35)" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.12" />
          </filter>

          <filter id="doorHingeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ================= BASE / LEVELING FEET ================= */}
        <g id="feet">
          <rect x="42" y="372" width="28" height="10" rx="3" fill="#334155" />
          <rect x="47" y="380" width="18" height="4" rx="2" fill="#1E293B" />
          <rect x="270" y="372" width="28" height="10" rx="3" fill="#334155" />
          <rect x="275" y="380" width="18" height="4" rx="2" fill="#1E293B" />
        </g>

        {/* ================= MAIN CABINET BODY ================= */}
        <g id="cabinet" filter="url(#softShadow)">
          {/* Main Enclosure */}
          <rect
            x="24"
            y="18"
            width="292"
            height="356"
            rx="24"
            fill="url(#bodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />

          {/* Top Edge Lip */}
          <path
            d="M24 38 C24 26 34 18 46 18 L294 18 C306 18 316 26 316 38 L316 42 L24 42 Z"
            fill="url(#topBevel)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Side subtle depth highlight */}
          <line x1="28" y1="45" x2="28" y2="365" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ================= CONTROL PANEL ================= */}
        <g id="control-panel">
          {/* Panel background divider */}
          <rect
            x="32"
            y="44"
            width="276"
            height="62"
            rx="12"
            fill="url(#panelGrad)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* Detergent Dispenser Drawer (Left) */}
          <g id="detergent-drawer">
            <rect x="42" y="52" width="68" height="46" rx="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Drawer Handle Recess */}
            <rect x="52" y="72" width="48" height="6" rx="3" fill="#E2E8F0" />
            {/* Detergent icons indicator */}
            <circle cx="56" cy="62" r="2.5" fill="#94A3B8" />
            <circle cx="65" cy="62" r="2.5" fill="#94A3B8" />
            <circle cx="74" cy="62" r="2.5" fill="#94A3B8" />
            {/* WashWise tiny branding on drawer */}
            <text x="50" y="86" fill="#94A3B8" fontSize="6" fontWeight="700" fontFamily="sans-serif">
              WASHWISE
            </text>
          </g>

          {/* Rotary Program Selector Dial (Center) */}
          <g id="dial-knob" transform="translate(150, 75)">
            {/* Outer Knob Ring */}
            <circle cx="0" cy="0" r="22" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Inner Metallic Disc */}
            <circle cx="0" cy="0" r="17" fill="url(#chromeRing)" />
            {/* Dial Center Cap */}
            <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
            {/* Dial Indicator Notch / Indicator Light */}
            <rect x="-2" y="-12" width="4" height="6" rx="1.5" fill={activeTheme.led} />
            {/* Program tick marks around knob */}
            {[-60, -30, 0, 30, 60].map((deg, i) => (
              <circle
                key={i}
                cx={25 * Math.sin((deg * Math.PI) / 180)}
                cy={-25 * Math.cos((deg * Math.PI) / 180)}
                r="1.5"
                fill={i === 2 ? activeTheme.led : '#94A3B8'}
              />
            ))}
          </g>

          {/* Digital LED Display Screen (Right) */}
          <g id="led-display">
            <rect
              x="208"
              y="52"
              width="90"
              height="46"
              rx="8"
              fill="url(#ledScreenGrad)"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Glowing Digital Time / Status */}
            <text
              x="253"
              y="74"
              textAnchor="middle"
              fill={activeTheme.led}
              fontSize="14"
              fontWeight="800"
              fontFamily="monospace"
              style={{
                textShadow: `0 0 8px ${activeTheme.led}`,
                letterSpacing: '1px',
              }}
            >
              {status === 'in-use' || status === 'running'
                ? `${Math.max(1, Math.round(progress ? (100 - progress) * 0.45 : 23))}m`
                : activeTheme.text}
            </text>

            {/* Mini status indicator row */}
            <g transform="translate(216, 85)">
              {/* Wash icon dot */}
              <circle cx="6" cy="4" r="2.5" fill={activeTheme.led} />
              <rect x="14" y="2" width="16" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
              {/* Progress bar inside LED if running */}
              {(status === 'in-use' || status === 'running') && (
                <rect
                  x="14"
                  y="2"
                  width={Math.max(4, 56 * (progress ? progress / 100 : 0.4))}
                  height="4"
                  rx="2"
                  fill={activeTheme.led}
                />
              )}
              {status !== 'in-use' && status !== 'running' && (
                <text x="36" y="6" fill="#94A3B8" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">
                  {status === 'available' ? 'ECO 60°' : 'STANDBY'}
                </text>
              )}
            </g>
          </g>
        </g>

        {/* Divider line below panel */}
        <line x1="32" y1="116" x2="308" y2="116" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* ================= DRUM & DOOR COMPONENT ================= */}
        {/* Machine Drum Recess / Outer Bezel */}
        <circle cx="170" cy="245" r="94" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="170" cy="245" r="88" fill="#F1F5F9" />

        {/* INNER DRUM (Always rendered inside machine tub) */}
        <g id="inner-drum-tub">
          {/* Deep dark cavity */}
          <circle cx="170" cy="245" r="80" fill="url(#openDrumInterior)" />

          {/* Stainless steel drum texture / Perforated pattern */}
          <circle cx="170" cy="245" r="74" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="170" cy="245" r="62" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 5" />
          <circle cx="170" cy="245" r="50" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="170" cy="245" r="38" fill="none" stroke="#1E293B" strokeWidth="1.5" />

          {/* Internal drum baffles / lifters */}
          <path d="M170 171 L174 195 L166 195 Z" fill="#64748B" opacity="0.6" />
          <path d="M234 282 L215 272 L219 265 Z" fill="#64748B" opacity="0.6" />
          <path d="M106 282 L125 272 L121 265 Z" fill="#64748B" opacity="0.6" />

          {/* Drum Back Center Nut */}
          <circle cx="170" cy="245" r="14" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <circle cx="170" cy="245" r="7" fill="#0F172A" />

          {/* Animated spinning clothes & water when running/spinning */}
          {(isSpinning || status === 'running' || status === 'in-use') && (
            <g id="drum-spinning-content" className={isSpinning ? 'animate-spin' : ''} style={{ transformOrigin: '170px 245px' }}>
              {/* Tumbling clothes representations */}
              <path
                d="M150 220 Q160 210 175 222 Q165 240 150 220 Z"
                fill="#6366f1"
                opacity="0.85"
              />
              <path
                d="M185 240 Q200 230 205 250 Q190 262 185 240 Z"
                fill="#ec4899"
                opacity="0.8"
              />
              <path
                d="M140 255 Q155 270 170 255 Q160 245 140 255 Z"
                fill="#3b82f6"
                opacity="0.75"
              />
              <circle cx="175" cy="235" r="9" fill="#10b981" opacity="0.7" />
            </g>
          )}

          {/* Water slosh and bubbles */}
          {(showWater || status === 'running' || status === 'in-use') && (
            <g id="water-effect">
              {/* Water level curved wave */}
              <path
                d="M102 260 C125 252 145 268 170 262 C195 256 215 268 238 260 C234 290 205 320 170 320 C135 320 106 290 102 260 Z"
                fill="rgba(56, 189, 248, 0.35)"
              />
              {/* Foam bubbles */}
              <circle cx="130" cy="265" r="4" fill="#FFFFFF" opacity="0.7" />
              <circle cx="145" cy="272" r="5" fill="#FFFFFF" opacity="0.6" />
              <circle cx="170" cy="268" r="6" fill="#FFFFFF" opacity="0.75" />
              <circle cx="195" cy="273" r="4.5" fill="#FFFFFF" opacity="0.6" />
              <circle cx="210" cy="266" r="3.5" fill="#FFFFFF" opacity="0.5" />
            </g>
          )}
        </g>

        {/* ================= DOOR (OPEN vs CLOSED) ================= */}
        {isOpen ? (
          /* ================= VISIBLY OPEN HINGED DOOR ================= */
          <g id="open-door-assembly" filter="url(#doorHingeGlow)">
            {/* Door Hinge on the right edge */}
            <g id="door-hinge" transform="translate(242, 225)">
              <rect x="0" y="0" width="8" height="38" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1" />
              <circle cx="4" cy="8" r="2.5" fill="#CBD5E1" />
              <circle cx="4" cy="30" r="2.5" fill="#CBD5E1" />
            </g>

            {/* Swung-Out Open Door (Angled 3D Perspective Ellipse swung out to the right) */}
            {/* Outer Metallic Door Rim - Angled Perspective */}
            <ellipse
              cx="278"
              cy="245"
              rx="42"
              ry="86"
              fill="url(#chromeRing)"
              stroke="#94A3B8"
              strokeWidth="3"
              transform="rotate(6, 278, 245)"
            />

            {/* Inner Chrome Bevel of Open Door */}
            <ellipse
              cx="278"
              cy="245"
              rx="34"
              ry="74"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="2"
              transform="rotate(6, 278, 245)"
            />

            {/* Transparent Tinted Glass Window of Open Door */}
            <ellipse
              cx="278"
              cy="245"
              rx="28"
              ry="64"
              fill="url(#doorSwingGlass)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="2"
              transform="rotate(6, 278, 245)"
            />

            {/* Glass Curvature Light Reflection Highlight */}
            <path
              d="M260 205 C275 195 285 210 288 235 C282 230 272 225 260 205 Z"
              fill="#FFFFFF"
              opacity="0.65"
            />

            {/* Integrated Door Handle on open door rim */}
            <rect
              x="312"
              y="228"
              width="8"
              height="36"
              rx="4"
              fill="#475569"
              stroke="#334155"
              strokeWidth="1.5"
              transform="rotate(6, 312, 228)"
            />

            {/* "DOOR OPEN - READY" Visual Badge floating near open door */}
            <g transform="translate(132, 235)">
              <rect x="0" y="0" width="76" height="22" rx="11" fill="rgba(16, 185, 129, 0.9)" />
              <circle cx="10" cy="11" r="4" fill="#FFFFFF" />
              <text x="20" y="15" fill="#FFFFFF" fontSize="9" fontWeight="800" letterSpacing="0.5">
                DOOR OPEN
              </text>
            </g>
          </g>
        ) : (
          /* ================= CLOSED DOOR ================= */
          <g id="closed-door-assembly">
            {/* Outer Metallic Chrome Frame */}
            <circle
              cx="170"
              cy="245"
              r="84"
              fill="none"
              stroke="url(#chromeRing)"
              strokeWidth="12"
            />

            {/* Sleek Inner Metallic Rim */}
            <circle cx="170" cy="245" r="78" fill="none" stroke="#CBD5E1" strokeWidth="2.5" />

            {/* Glass Porthole Tint & Glare */}
            <circle cx="170" cy="245" r="76" fill="rgba(15, 23, 42, 0.35)" />

            {/* Glossy Diagonal Glass Reflection */}
            <path
              d="M130 185 C160 175 195 185 220 205 C205 225 180 230 155 225 C138 215 132 198 130 185 Z"
              fill="#FFFFFF"
              opacity="0.18"
            />

            {/* Recessed Door Handle on Right */}
            <rect x="238" y="233" width="7" height="24" rx="3.5" fill="#64748B" stroke="#475569" strokeWidth="1" />

            {/* Left Hinge Plates */}
            <rect x="92" y="215" width="5" height="16" rx="2" fill="#94A3B8" />
            <rect x="92" y="258" width="5" height="16" rx="2" fill="#94A3B8" />
          </g>
        )}

        {/* ================= LOWER PLINTH & FILTER ================= */}
        <g id="plinth" transform="translate(24, 342)">
          {/* Bottom kickplate separator line */}
          <line x1="8" y1="0" x2="284" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Drain Pump / Coin Trap Service Hatch (Right) */}
          <circle cx="255" cy="16" r="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="251" y1="16" x2="259" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

          {/* Bottom Ventilation Louvers (Left) */}
          <g fill="#CBD5E1">
            <rect x="24" y="12" width="40" height="2.5" rx="1.25" />
            <rect x="24" y="17" width="40" height="2.5" rx="1.25" />
          </g>
        </g>
      </svg>
    </div>
  );
}

