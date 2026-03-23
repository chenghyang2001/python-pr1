/**
 * 從 JSON 資料生成 AI 週報 PowerPoint 簡報（支援 20 則，自動分頁）
 *
 * 用法：node gen_pptx_20.js <input.json> <output.pptx>
 */
const pptxgen = require("pptxgenjs");
const fs = require("fs");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("用法：node gen_pptx_20.js <input.json> <output.pptx>");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(args[0], "utf-8"));
const outPath = args[1];

// Midnight Executive palette
const C = {
  navy: "1E2761", darkNavy: "141B3D", ice: "CADCFC",
  white: "FFFFFF", gray: "8B95B0",
};

const ITEMS_PER_SLIDE = 4;

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Claude Code";
pres.title = data.title;

// ====== Slide 1: Title ======
let s1 = pres.addSlide();
s1.background = { fill: C.navy };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.2, fill: { color: C.darkNavy } });
s1.addText("AI WEEKLY DIGEST", { x: 0.8, y: 0.3, w: 8, h: 0.6, fontSize: 14, color: C.gray, fontFace: "Arial", charSpacing: 6, margin: 0 });
s1.addText(data.title.split("｜")[0] || data.title, { x: 0.8, y: 1.5, w: 8, h: 1.2, fontSize: 44, color: C.white, fontFace: "Arial", bold: true, margin: 0 });
s1.addText(data.title.split("｜")[1] || "", { x: 0.8, y: 2.7, w: 8, h: 0.6, fontSize: 24, color: C.ice, fontFace: "Arial", margin: 0 });
s1.addText(data.subtitle, { x: 0.8, y: 3.5, w: 8, h: 0.5, fontSize: 16, color: C.gray, fontFace: "Arial", italic: true, margin: 0 });

// Category cards at bottom
data.categories.forEach((cat, i) => {
  const x = 0.8 + i * 3.0;
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.3, w: 2.7, h: 0.9, fill: { color: C.darkNavy }, rectRadius: 0.1 });
  s1.addShape(pres.shapes.RECTANGLE, { x, y: 4.3, w: 0.08, h: 0.9, fill: { color: cat.color } });
  s1.addText(`${cat.emoji} ${cat.name}`, { x: x + 0.2, y: 4.35, w: 2.3, h: 0.4, fontSize: 12, color: C.white, fontFace: "Arial", bold: true, margin: 0 });
  s1.addText(`${cat.items.length} 則`, { x: x + 0.2, y: 4.7, w: 2.3, h: 0.35, fontSize: 11, color: C.gray, fontFace: "Arial", margin: 0 });
});

// ====== Slide 2: Overview ======
let s2 = pres.addSlide();
s2.background = { fill: C.white };
s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.navy } });
s2.addText("本週總覽", { x: 0.8, y: 0.15, w: 8, h: 0.5, fontSize: 22, color: C.white, fontFace: "Arial", bold: true, margin: 0 });

const totalItems = data.categories.reduce((sum, c) => sum + c.items.length, 0);
const overviewItems = [
  { num: String(totalItems), label: "則", desc: "精選新聞（去重篩選後）" },
  { num: String(data.categories.length), label: "大分類", desc: data.categories.map(c => c.name).join("、") },
];
overviewItems.forEach((item, i) => {
  const y = 1.4 + i * 1.5;
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y, w: 8.4, h: 1.1, fill: { color: "F5F7FA" }, rectRadius: 0.08 });
  s2.addText(item.num, { x: 1.0, y: y + 0.1, w: 1.2, h: 0.9, fontSize: 40, color: C.navy, fontFace: "Arial", bold: true, align: "center", valign: "middle", margin: 0 });
  s2.addText(item.label, { x: 2.1, y: y + 0.1, w: 0.8, h: 0.9, fontSize: 16, color: C.gray, fontFace: "Arial", valign: "middle", margin: 0 });
  s2.addText(item.desc, { x: 3.0, y: y + 0.1, w: 5.8, h: 0.9, fontSize: 18, color: "333333", fontFace: "Arial", valign: "middle", margin: 0 });
});

// ====== Category slides (auto-paginate) ======
data.categories.forEach(cat => {
  const pages = [];
  for (let i = 0; i < cat.items.length; i += ITEMS_PER_SLIDE) {
    pages.push(cat.items.slice(i, i + ITEMS_PER_SLIDE));
  }

  pages.forEach((pageItems, pageIdx) => {
    let slide = pres.addSlide();
    slide.background = { fill: C.white };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.8, fill: { color: cat.color } });

    const pageLabel = pages.length > 1 ? ` (${pageIdx + 1}/${pages.length})` : "";
    slide.addText(`${cat.emoji} ${cat.name}${pageLabel}`, { x: 0.8, y: 0.15, w: 8, h: 0.5, fontSize: 22, color: C.white, fontFace: "Arial", bold: true, margin: 0 });

    pageItems.forEach((item, i) => {
      const globalIdx = pageIdx * ITEMS_PER_SLIDE + i;
      const y = 1.0 + i * 1.1;
      // Number circle
      slide.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.08, w: 0.32, h: 0.32, fill: { color: cat.color } });
      slide.addText(`${globalIdx + 1}`, { x: 0.8, y: y + 0.08, w: 0.32, h: 0.32, fontSize: 12, color: C.white, fontFace: "Arial", bold: true, align: "center", valign: "middle", margin: 0 });
      // Title
      slide.addText(item.title, { x: 1.3, y: y - 0.05, w: 8.0, h: 0.42, fontSize: 14, color: "222222", fontFace: "Arial", bold: true, margin: 0 });
      // Summary
      slide.addText(item.summary, { x: 1.3, y: y + 0.38, w: 8.0, h: 0.55, fontSize: 11, color: "666666", fontFace: "Arial", margin: 0 });
    });
  });
});

// ====== Closing slide ======
let sEnd = pres.addSlide();
sEnd.background = { fill: C.navy };
sEnd.addText("Thank You", { x: 0.8, y: 1.5, w: 8.4, h: 1.0, fontSize: 44, color: C.white, fontFace: "Arial", bold: true, align: "center", margin: 0 });
sEnd.addText(data.title, { x: 0.8, y: 2.5, w: 8.4, h: 0.6, fontSize: 18, color: C.ice, fontFace: "Arial", align: "center", margin: 0 });
sEnd.addText(`由 Claude Code 自動收集整理｜${data.date}`, {
  x: 0.8, y: 4.5, w: 8.4, h: 0.4, fontSize: 12, color: C.gray, fontFace: "Arial", italic: true, align: "center", margin: 0,
});

pres.writeFile({ fileName: outPath }).then(() => console.log("Generated: " + outPath));
