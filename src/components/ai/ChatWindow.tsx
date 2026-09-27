import { AnimatePresence, motion } from "framer-motion";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";

type ChatWindowProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatWindow({
  isOpen,
  onClose,
}: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ===================================================== */}
          {/* Desktop Glassmorphic Backdrop */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              inset-0
              z-[998]

              hidden
              lg:block

              bg-slate-950/45
              backdrop-blur-md
            "
            onClick={onClose}
          />

          {/* ===================================================== */}
          {/* Desktop Centered Smart-P AI Window */}
          {/* ===================================================== */}

          <div
            className="
              pointer-events-none

              fixed
              inset-0
              z-[999]

              hidden
              items-center
              justify-center

              p-6

              lg:flex
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                pointer-events-auto

                flex

                h-[min(720px,90vh)]
                w-[min(1100px,92vw)]

                overflow-hidden
                rounded-3xl

                border
                border-white/10

                bg-slate-950/90

                shadow-[0_25px_100px_rgba(0,0,0,0.55),0_0_80px_rgba(37,99,235,0.15)]

                backdrop-blur-2xl
              "
              onClick={(event) => event.stopPropagation()}
            >
              {/* ================================================= */}
              {/* Left Panel */}
              {/* ================================================= */}

              <aside
                className="
                  flex
                  w-[370px]
                  shrink-0
                  flex-col

                  overflow-hidden

                  border-r
                  border-white/10

                  bg-gradient-to-b
                  from-slate-950/95
                  via-slate-950/90
                  to-slate-900/90

                  backdrop-blur-xl
                "
              >
                <WelcomeScreen />
              </aside>

              {/* ================================================= */}
              {/* Right Panel */}
              {/* ================================================= */}

              <section
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col

                  overflow-hidden

                  bg-slate-950/70
                "
              >
                <ChatHeader onClose={onClose} />

                <ChatMessages onClose={onClose} />

                <ChatInput />
              </section>
            </motion.div>
          </div>

          {/* ===================================================== */}
          {/* Mobile */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              fixed
              inset-0
              z-[999]

              flex
              flex-col

              overflow-hidden

              bg-slate-950

              lg:hidden
            "
          >
            <ChatHeader onClose={onClose} />

            <ChatMessages onClose={onClose} />

            <ChatInput />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
