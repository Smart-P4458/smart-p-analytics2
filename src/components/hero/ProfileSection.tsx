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
      {/* Background Glow */}

      <div
        className="
          absolute
          h-80
          w-80
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />

      {/* Outer Ring */}

      <div
        className="
          relative
          flex
          h-80
          w-80
          items-center
          justify-center
          rounded-full
          border-4
          border-blue-500/40
          bg-slate-900
          shadow-2xl
        "
      >
        {/* Profile Image */}

        <img
          src="/images/profile.png"
          alt="Pam George"
          className="
            h-[300px]
            w-[300px]
            rounded-full
            object-cover
          "
        />
      </div>
    </div>
  );
}