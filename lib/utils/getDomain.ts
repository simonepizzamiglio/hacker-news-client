export function getDomain(url: string) {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  // Split the hostname into parts
  const parts = hostname.split(".");

  // Get the last two parts (the domain and top-level domain)
  const domain = parts.slice(-2).join(".");

  return domain;
}
