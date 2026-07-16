export default function ProfileSection() {
  return (
    <div
      className="
        relative
        mx-auto
        flex
        items-center
        justify-center
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          h-[300px]
          w-[220px]
          rounded-xl
          bg-blue-500/20
          blur-3xl

          sm:h-[360px]
          sm:w-[260px]

          md:h-[420px]
          md:w-[300px]

          lg:h-[520px]
          lg:w-[380px]
        "
      />

      {/* Portrait Card */}

      <div
        className="
          relative
          overflow-hidden
          rounded-lg
          border
          border-blue-500/40
          bg-slate-900
          shadow-2xl

          h-[300px]
          w-[220px]

          sm:h-[360px]
          sm:w-[260px]

          md:h-[420px]
          md:w-[300px]

          lg:h-[520px]
          lg:w-[380px]
        "
      >
        <img
          src="public/images/profile/pam-sani.jpg"
          alt="Pam Sani George"
          className="
            h-full
            w-full
            object-cover
            object-top
          "
        />
      </div>
    </div>
  );
}