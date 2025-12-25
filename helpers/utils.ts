export function normalizeUrl(url: string): string {
  const u = new URL(url.toLowerCase());

  if (
    (u.protocol === "http:" && u.port === "80") ||
    (u.protocol === "https:" && u.port === "443")
  ) {
    u.port = "";
  }

  u.searchParams.sort();

  if (u.pathname.endsWith("/") && u.pathname !== "/") {
    u.pathname = u.pathname.slice(0, -1);
  }

  return u.toString();
}
