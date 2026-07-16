export default function AboutBackgroundEffects() {
  return (
    <>
      <div
        className="
          absolute
          top-0
          left-0
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-96
          w-96
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />
    </>
  );
}