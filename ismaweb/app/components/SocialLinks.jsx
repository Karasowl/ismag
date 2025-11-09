const links = [
  {
    id: "youtube",
    label: "YouTube",
    handle: "@IsmaelGuimarais",
    href: "https://www.youtube.com/@IsmaelGuimarais"
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@IsmaGuimarais",
    href: "https://x.com/IsmaGuimarais"
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@ismaguimarais",
    href: "https://www.instagram.com/ismaguimarais/"
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@ismaguimarais",
    href: "https://www.tiktok.com/@ismaguimarais"
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@ismaguimarais",
    href: "https://www.threads.net/@ismaguimarais"
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "ismaguimarais",
    href: "https://www.facebook.com/ismaguimarais/"
  }
];

const toneById = {
  youtube: "link-card--youtube",
  x: "link-card--x",
  instagram: "link-card--instagram",
  tiktok: "link-card--tiktok",
  threads: "link-card--threads",
  facebook: "link-card--facebook"
};

export default function SocialLinks({ className = "" }) {
  const classes = ["linktree", className].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-label="Redes sociales de Ismael Guimarais">
      {links.map((link) => {
        const tone = toneById[link.id] || "";
        return (
          <a
            key={link.id}
            className={`link-card ${tone}`.trim()}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-card__icon" aria-hidden="true">
              {link.label.charAt(0)}
            </span>
            <span className="link-card__body">
              <span className="link-card__label">{link.label}</span>
              <span className="link-card__handle">{link.handle}</span>
            </span>
            <span className="link-card__arrow" aria-hidden="true">
              →
            </span>
          </a>
        );
      })}
    </div>
  );
}
