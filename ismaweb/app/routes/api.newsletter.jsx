import { json } from "@remix-run/node";

export async function action({ request }) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email) return json({ ok: false, error: "Email requerido" }, { status: 400 });

  // ConvertKit
  const CK_KEY = process.env.CONVERTKIT_API_KEY;
  const CK_FORM = process.env.CONVERTKIT_FORM_ID;
  if (CK_KEY && CK_FORM) {
    try {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${CK_FORM}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ api_key: CK_KEY, email }),
      });
      if (!res.ok) throw new Error(await res.text());
      return json({ ok: true, provider: "convertkit" });
    } catch (e) {
      return json({ ok: false, error: "Error en ConvertKit" }, { status: 502 });
    }
  }

  // Mailchimp
  const MC_KEY = process.env.MAILCHIMP_API_KEY; // e.g. "xxxx-us21"
  const MC_LIST = process.env.MAILCHIMP_AUDIENCE_ID;
  if (MC_KEY && MC_LIST) {
    try {
      const [, dc] = MC_KEY.split("-");
      const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MC_LIST}/members`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `apikey ${MC_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, status: "pending" }),
      });
      if (!res.ok) throw new Error(await res.text());
      return json({ ok: true, provider: "mailchimp" });
    } catch (e) {
      return json({ ok: false, error: "Error en Mailchimp" }, { status: 502 });
    }
  }

  // Fallback
  console.log("Newsletter signup (no provider configured):", email);
  return json({ ok: true, provider: "none" });
}

export function loader() {
  return json({ ok: true });
}

