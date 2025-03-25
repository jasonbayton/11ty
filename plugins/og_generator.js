const fs = require("fs");
const path = require("path");
const { default: satori } = require("satori");
const sharp = require("sharp");
const { html } = require("satori-html");
const { JSDOM } = require("jsdom");
const font = fs.readFileSync(require.resolve("@fontsource/inter/files/inter-latin-700-normal.woff"));

const swirl = fs.readFileSync(path.join("_src", "_includes", "_assets", "img", "bayton_logos", "swirl_static.svg"), "utf8");

module.exports = async function generateOgImages(pages = []) {
  const outputDir = path.join("_src", "_includes", "_assets", "img", "og");
  fs.mkdirSync(outputDir, { recursive: true });

  for (const page of pages) {
    const title = page.data.title || "Jason Bayton";
    const slug = page.fileSlug;
    const outputPath = path.join(outputDir, `${slug}.png`);

    const svgTemplatePath = path.join("_src", "_includes", "_assets", "img", "og", "og_img.svg");
    let svgTemplate = fs.readFileSync(svgTemplatePath, "utf8");

    const dom = new JSDOM(svgTemplate, { contentType: "image/svg+xml" });
    const document = dom.window.document;
    const titleElement = document.querySelector("#post_title");

    if (titleElement) {
      titleElement.textContent = title;
    }

    const modifiedSvg = document.documentElement.outerHTML;

    const png = await sharp(Buffer.from(modifiedSvg)).png().toBuffer();
    fs.writeFileSync(outputPath, png);
    console.log(`OG image generated: ${outputPath}`);
  }
};
