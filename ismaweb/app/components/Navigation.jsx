import { useState } from "react";
import { Link } from "@remix-run/react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre" },
  { label: "Música", href: "/music" },
  { label: "Blog", href: "/blog" },
  { label: "Apóyame", href: "/apoyame" },
  { label: "Videos", href: "https://www.youtube.com/@IsmaelGuimarais", external: true }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ThemeToggle />

      <nav className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
        <button
          className="mobile-nav__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <div className="mobile-nav__menu">
            {NAV_LINKS.map(({ label, href, external }) => (
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
