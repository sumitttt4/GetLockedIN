export function NoiseFilter() {
    return (
        <svg
            className="fixed inset-0 z-0 pointer-events-none opacity-100 w-full h-full"
            aria-hidden="true"
        >
            <defs>
                {/* High frequency grain for the "Analog Static" look */}
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.85"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>

                {/* Warp/Distortion for the "Glitchy Grid" */}
                <filter id="distortion">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="2"
                        seed="2"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="20"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
}
