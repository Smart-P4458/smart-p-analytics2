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
    </>
  );
}