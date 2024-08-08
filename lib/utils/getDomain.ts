export function getDomain(url: string) {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  // Split the hostname into parts
  const parts = hostname.replace("www.", "").split(".");

  // Get the last three parts (the subdomain, the domain and top-level domain)
  const domain = parts.slice(-3).join(".");

  return domain;
}
