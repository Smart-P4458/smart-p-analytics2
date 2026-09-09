import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/footer/Footer";
import SmartPAI from "./components/ai/SmartPAI";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Skills from "./pages/Skills";

/* Admin */
import AdminLayout from "./components/admin/AdminLayout";
import DashboardOverview from "./components/admin/DashboardOverview";
import ConversationTable from "./components/admin/ConversationTable";
import ContactInbox from "./components/admin/ContactInbox";
import UnansweredQuestions from "./components/admin/UnansweredQuestions";
import AutomationFailures from "./components/admin/AutomationFailures";

export default function App() {
  return (
    <Routes>
      {/* ========================================
          PUBLIC WEBSITE
      ======================================== */}

      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <About />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      <Route
        path="/projects"
        element={
          <>
            <Navbar />
            <Projects />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      <Route
        path="/services"
        element={
          <>
            <Navbar />
            <Services />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      <Route
        path="/skills"
        element={
          <>
            <Navbar />
            <Skills />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <Contact />
            <SmartPAI />
            <Footer />
          </>
        }
      />

      {/* ========================================
          ADMIN DASHBOARD
      ======================================== */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        {/* /admin */}
        <Route
          index
          element={<DashboardOverview />}
        />

        {/* /admin/dashboard */}
        <Route
          path="dashboard"
          element={<DashboardOverview />}
        />

        {/* /admin/conversations */}
        <Route
          path="conversations"
          element={<ConversationTable />}
        />

        {/* /admin/contacts */}
        <Route
          path="contacts"
          element={<ContactInbox />}
        />

        {/* /admin/unanswered */}
        <Route
          path="unanswered"
          element={<UnansweredQuestions />}
        />

        {/* /admin/automation-failures */}
        <Route
          path="automation-failures"
          element={<AutomationFailures />}
        />
      </Route>

      {/* ========================================
          404
      ======================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}