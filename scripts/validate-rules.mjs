import fs from "node:fs";
import net from "node:net";

const readLines = (path) =>
  fs
    .readFileSync(path, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

const isValidCidr = (value) => {
  const [ip, prefixText] = value.split("/");
  const prefix = Number(prefixText);
  return net.isIPv4(ip) && Number.isInteger(prefix) && prefix >= 0 && prefix <= 32;
};

const isValidDomain = (value) =>
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(value);

const validateRule = (rule, source) => {
  const parts = rule.split(",");
  const type = parts[0];

  if (type === "IP-CIDR") {
    if (parts.length !== 3 || parts[2] !== "no-resolve" || !isValidCidr(parts[1])) {
      throw new Error(`${source}: invalid IP-CIDR rule: ${rule}`);
    }
    return;
  }

  if (type === "DOMAIN" || type === "DOMAIN-SUFFIX") {
    if (parts.length !== 2 || !isValidDomain(parts[1])) {
      throw new Error(`${source}: invalid ${type} rule: ${rule}`);
    }
    return;
  }

  throw new Error(`${source}: unsupported rule type: ${rule}`);
};

for (const name of ["futu", "judgeme", "google-analytics-ui", "tradingview"]) {
  const surgePath = `surge/${name}.list`;
  const clashPath = `clash/${name}.yaml`;
  const surgeRules = readLines(surgePath);
  surgeRules.forEach((rule) => validateRule(rule, surgePath));

  const clashLines = readLines(clashPath);
  if (clashLines[0] !== "payload:") {
    throw new Error(`${clashPath}: first non-comment line must be payload:`);
  }
  const clashRules = clashLines.slice(1).map((line) => {
    if (!line.startsWith("- ")) {
      throw new Error(`${clashPath}: payload item must start with "- ": ${line}`);
    }
    return line.slice(2);
  });
  clashRules.forEach((rule) => validateRule(rule, clashPath));
  if (surgeRules.join("\n") !== clashRules.join("\n")) {
    throw new Error(`${name}: Surge and Clash rule lists differ`);
  }
  console.log(`Validated ${name}: ${surgeRules.length} rules`);
}
