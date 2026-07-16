export default function ServicesBackgroundEffects() {
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
          bg-blue-600/10
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
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* Center Accent */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      {/* Decorative Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />
    </>
  );
}