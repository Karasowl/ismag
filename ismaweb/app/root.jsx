import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import globalStyles from "./styles/global.css?url";

export const links = () => [{ rel: "stylesheet", href: globalStyles }];

export const meta = () => [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width,initial-scale=1" }];

export default function App() {
  return (
    <html lang="es" className="theme">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = "Ha ocurrido un error inesperado.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText;
  }

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="error">
        <main>
          <h1>Error {status}</h1>
          <p>{message}</p>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
