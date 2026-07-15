import { Link } from "react-router-dom";
import Container from "../common/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-white transition hover:text-blue-400"
          >
            Smart-P Analytics
          </Link>

          {/* Navigation */}

          <div className="flex items-center gap-8">
            <Link
              to="/about"
              className="text-slate-300 transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/projects"
              className="text-slate-300 transition hover:text-white"
            >
              Projects
            </Link>

            <Link
              to="/services"
              className="text-slate-300 transition hover:text-white"
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="text-slate-300 transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}