import { redirect } from "@remix-run/node";

// Redirect permanente 301 de /music a /musica para SEO
export const loader = () => {
  return redirect("/musica", 301);
};
