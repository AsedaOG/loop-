interface LoopLogoProps {
  className?: string
  iconOnly?: boolean
  color?: string
}

export default function LoopLogo({ className = '', iconOnly = false, color = '#4a4a4a' }: LoopLogoProps) {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Top curved arrow (right to left, pointing down-left) */}
        <path
          d="M 160 70 C 160 45, 130 30, 100 30 C 80 30, 65 35, 55 45 L 45 55"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Top arrow head */}
        <path
          d="M 45 55 L 30 45 M 45 55 L 35 70"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Bottom curved arrow (left to right, pointing up-right) */}
        <path
          d="M 40 130 C 40 155, 70 170, 100 170 C 120 170, 135 165, 145 155 L 155 145"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Bottom arrow head */}
        <path
          d="M 155 145 L 170 155 M 155 145 L 165 130"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 600 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Loop icon centered at top */}
      <g transform="translate(200, 30)">
        {/* Top curved arrow (right to left, pointing down-left) */}
        <path
          d="M 160 70 C 160 45, 130 30, 100 30 C 80 30, 65 35, 55 45 L 45 55"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Top arrow head */}
        <path
          d="M 45 55 L 30 45 M 45 55 L 35 70"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Bottom curved arrow (left to right, pointing up-right) */}
        <path
          d="M 40 130 C 40 155, 70 170, 100 170 C 120 170, 135 165, 145 155 L 155 145"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Bottom arrow head */}
        <path
          d="M 155 145 L 170 155 M 155 145 L 165 130"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Text: looplogistics */}
      <text
        x="300"
        y="260"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="68"
        fontWeight="600"
        fill={color}
        textAnchor="middle"
        letterSpacing="-1"
      >
        looplogistics
      </text>
    </svg>
  )
}

