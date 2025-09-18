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
    handle: "@ismaelguimarais",
    href: "https://www.tiktok.com/@ismaelguimarais"
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
    handle: "IsmaGuimarais",
    href: "https://www.facebook.com/ismaguimarais"
  }
];

export default function SocialLinks() {
  return (
    <div className="links-grid" aria-label="Redes sociales de Ismael Guimarais">
      {links.map((link) => (
        <a key={link.id} className="social-link" href={link.href} target="_blank" rel="noopener noreferrer">
          <span>{link.label}</span>
          <span>{link.handle}</span>
        </a>
      ))}
    </div>
  );
}
