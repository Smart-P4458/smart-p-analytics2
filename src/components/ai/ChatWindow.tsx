import { AnimatePresence, motion } from "framer-motion";

import ChatHeader from "./ChatHeader";
import WelcomeScreen from "./WelcomeScreen";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

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
          {/* Blur Overlay */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[998]
              bg-slate-950/60
              backdrop-blur-md
            "
          />

          {/* ===================================================== */}
          {/* Desktop & Tablet */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              hidden
              lg:flex

              fixed
              left-1/2
              top-1/2
              z-[999]

              h-[88vh]
              max-h-[860px]

              w-[92vw]
              max-w-[1300px]

              -translate-x-1/2
              -translate-y-1/2

              overflow-hidden

              rounded-[32px]

              border
              border-blue-500/20

              bg-slate-950/95

              shadow-[0_0_80px_rgba(37,99,235,0.18)]

              backdrop-blur-xl
            "
          >
            {/* Left Panel */}

            <aside
              className="
                flex
                w-[370px]
                shrink-0
                flex-col

                border-r
                border-slate-800

                bg-gradient-to-b
                from-slate-950
                via-slate-950
                to-slate-900

                overflow-hidden
              "
            >
              <WelcomeScreen />
            </aside>

            {/* Right Panel */}

            <section
              className="
                flex
                flex-1
                flex-col

                overflow-hidden
              "
            >
              <ChatHeader onClose={onClose} />

              <div
                className="
                  flex-1
                  overflow-y-auto
                "
              >
                <ChatMessages />
              </div>

              <ChatInput />
            </section>
          </motion.div>

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
            }}
            className="
              fixed
              inset-0
              z-[999]

              flex
              flex-col

              bg-slate-950

              lg:hidden
            "
          >
            <ChatHeader onClose={onClose} />

            <div
              className="
                flex-1
                overflow-y-auto
              "
            >
              <ChatMessages />
            </div>

            <ChatInput />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}