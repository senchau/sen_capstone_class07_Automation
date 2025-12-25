import chalk from "chalk";

type TError = {
  selector: string;
  location: string;
  message: string;
};

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

function stripStackLines(errorText: string) {
  return errorText
    .split("\n")
    .filter((line) => !line.trim().startsWith("at "))
    .join("\n");
}

export function formatError(err: unknown): TError {
  const rawMessage = (err as any)?.message ?? "";
  const message = stripStackLines(rawMessage);

  const stepSymbol = Object.getOwnPropertySymbols(err).find(
    (s) => String(s) === "Symbol(step)"
  );

  const step = stepSymbol ? (err as any)[stepSymbol] : undefined;

  const file = step?.location?.file ?? "";
  const line = step?.location?.line ?? "";
  const column = step?.location?.column ?? "";
  const location = file && line && column ? `${file}:${line}:${column}` : "";

  const selector = step?.params?.selector?.replaceAll(" >> ", "")?.trim() ?? "";

  return {
    selector,
    location,
    message,
  };
}

export function prettyErrorLog(errInfo: TError) {
  const { selector, location, message } = errInfo;

  const parts: string[] = [];

  if (selector) {
    parts.push(`${chalk.yellow.bold("Selector:")}   ${chalk.white(selector)}`);
  }

  if (location) {
    parts.push(`${chalk.cyan.bold("Location:")}   ${chalk.white(location)}`);
  }

  parts.push(`${chalk.magenta.bold("Message:")}\n${chalk.white(message)}`);

  console.log(`
${chalk.bgRed.white.bold(" PLAYWRIGHT ERROR ")} 

${parts.join("\n\n")}
`);
}
