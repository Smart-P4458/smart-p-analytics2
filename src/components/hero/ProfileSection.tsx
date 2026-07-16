export default function ProfileSection() {
  return (
    <div
      className="
        relative
        flex
        items-center
        justify-center
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          h-[520px]
          w-[380px]
          rounded-[12px]
          bg-blue-500/20
          blur-3xl
        "
      />

      {/* Portrait Frame */}

      <div
        className="
          relative
          h-[520px]
          w-[380px]
          overflow-hidden
          rounded-[8px]
          border
          border-blue-500/40
          bg-slate-900
          shadow-2xl
        "
      >
        <img
          src="/images/profile.png"
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