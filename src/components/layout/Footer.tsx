import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row">
          <p>
            © {new Date().getFullYear()} Smart-P Analytics.
            All rights reserved.
          </p>

          <p>
            Built on Resilience. Powered by Data.
          </p>
        </div>
      </Container>
    </footer>
  );
}