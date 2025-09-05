const fs = require("fs");
const path = require("path");
const simpleIcons = require("simple-icons");

// Path to your companies.json
const companiesFile = path.resolve("src/data/companies.json");

if (!fs.existsSync(companiesFile)) {
    console.error("❌ companies.json not found at", companiesFile);
    process.exit(1);
}
const companies = JSON.parse(fs.readFileSync(companiesFile, "utf8"));

// Output directory
const outDir = path.resolve("public/logos");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Slug overrides: company IDs → SimpleIcons slugs
const SLUG_MAP = {
    "bank-of-america": "bankofamerica",
    "jpmorgan": "jpmorgan",
    "tcs": "tata",
    "hcl": "hcltechnologies",
    // add more only if SimpleIcons slug differs a lot
};

// 🔍 Find icon by slug
function findIcon(slug) {
    return Object.values(simpleIcons).find((i) => i.slug === slug);
}

companies.forEach((c) => {
    const companyId = c.id.toLowerCase();
    const slug = SLUG_MAP[companyId] || companyId;

    const icon = findIcon(slug);
    if (!icon) {
        console.warn(`⚠️ No logo found for ${c.name} (id: ${companyId}, slug: ${slug})`);
        return;
    }

    const svg = icon.svg.replace("<svg", `<svg fill="currentColor"`);
    // Always save using your companyId
    fs.writeFileSync(path.join(outDir, `${companyId}.svg`), svg, "utf8");
    console.log(`✅ Saved ${companyId}.svg`);
});

// fallback
const fallback = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2z"/>
</svg>`;
fs.writeFileSync(path.join(outDir, "company.svg"), fallback, "utf8");
console.log("✅ Saved fallback company.svg");