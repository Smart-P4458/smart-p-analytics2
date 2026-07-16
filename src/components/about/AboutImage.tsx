export default function AboutImage() {
  return (
    <div
      className="
        relative
        w-full
        max-w-sm
      "
    >
      <div
        className="
          absolute
          inset-0
          rounded-[32px]
          bg-blue-600/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-blue-500/20
          bg-slate-900
          shadow-2xl
        "
      >
        <img
           src="/images/profile/pam-s-george.jpg"
          alt="Pam Sani George"
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>
    </div>
  );
}