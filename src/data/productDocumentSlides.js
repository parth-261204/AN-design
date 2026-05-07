import { candleHolderIronImages } from "./candleholderironImages.js";
import { candleSticksDocumentImages } from "./candleSticksDocumentImages.js";
import { cakeStandImages } from "./cakeStandImages.js";
import { cakedomsImages } from "./cakedomsImages.js";
import { basketImages } from "./basketImages.js";
import { choppingBoardImages } from "./choppingBoardImages.js";
import { bowlsImages } from "./bowlsImages.js";
import { christmasImages } from "./christmasImages.js";
import { furnitureImages } from "./furnitureImages.js";
import { napkinRingsImages } from "./napkinRingsImages.js";
import { potsImages } from "./potsImages.js";
import { sculpturesImages } from "./sculpturesImages.js";
import { stoolImages } from "./stoolImages.js";
import { traysImages } from "./traysImages.js";
import { vaseNewImages } from "./vasenewImages.js";
import { zincPotsImages } from "./zincPotsImages.js";

export const productDocumentSlides = {
  basket: {
    label: "Basket",
    title: "Basket Slideshow",
    slides: basketImages,
    sourceHref: "/basket-old-item-catalogue.pdf",
  },
  "cake-stand": {
    label: "Cake Stand",
    title: "Cake Stand Slideshow",
    slides: cakeStandImages,
    sourceHref: "/cake-stand-catalogue.pdf",
  },
  "candle-holders": {
    label: "Candle Holders",
    title: "Candle Holder Iron Slideshow",
    slides: candleHolderIronImages,
  },
  "candle-sticks": {
    label: "Candle Sticks",
    title: "Candle Sticks Slideshow",
    slides: candleSticksDocumentImages,
    sourceLinks: [
      { href: "/candle-sticks-sculpture-catalogue.pdf", label: "Open PDF" },
      { href: "/candle-stick-ppt-2026-an.pptx", label: "Open PPT" },
    ],
  },
  "chopping-board": {
    label: "Chopping Board",
    title: "Chopping Board Slideshow",
    slides: choppingBoardImages,
    sourceHref: "/chopping-board-old-item-catalogue.pdf",
  },
  "napkin-rings": {
    label: "Napkin Rings",
    title: "Napkin Rings Slideshow",
    slides: napkinRingsImages,
  },
  vase: {
    label: "Vase",
    title: "Vase Slideshow",
    slides: vaseNewImages,
  },
  "xmas-deco": {
    label: "Xmas Deco",
    title: "Christmas Slideshow",
    slides: christmasImages,
  },
  pots: {
    label: "Pots",
    title: "Pots Slideshow",
    slides: potsImages,
  },
  cakedoms: {
    label: "Cakedoms",
    title: "Cakedoms Slideshow",
    slides: cakedomsImages,
  },
  bowls: {
    label: "Bowls",
    title: "Bowls Slideshow",
    slides: bowlsImages,
  },
  furniture: {
    label: "Furniture",
    title: "Furniture Slideshow",
    slides: furnitureImages,
    sourceHref: "/furniture-ppt-amjad.pptx",
  },
  sculptures: {
    label: "Sculptures",
    title: "Sculptures Slideshow",
    slides: sculpturesImages,
    sourceHref: "/sculptures-catalogue.pdf",
  },
  stool: {
    label: "Stool",
    title: "Stool Slideshow",
    slides: stoolImages,
    sourceHref: "/stool-old-item-catalogue.pdf",
  },
  trays: {
    label: "Trays",
    title: "Trays Slideshow",
    slides: traysImages,
    sourceHref: "/trays-old-item-catalogue.pdf",
  },
  "zinc-pots": {
    label: "Zinc Pots",
    title: "Zinc Pots Slideshow",
    slides: zincPotsImages,
    sourceHref: "/zinc-pots-vases-aluminium.pdf",
  },
};
