export default function BackgroundEffects() {
  return (
    <>
      {/* Top Left Glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-blue-600/20
          blur-3xl
        "
      />

      {/* Bottom Right Glow */}
      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      {/* Center Accent Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[120px]
        "
      />

      {/* Subtle Grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />
    </>
  );
}