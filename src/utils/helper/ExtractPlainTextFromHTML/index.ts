import * as cheerio from "cheerio";

export function extractPlainTextFromHTML(htmlString: string): string {
  // Hapus seluruh alt="..." dan atribut sampai tag > (khusus kasus alt di luar tag <img>)
  const cleanedHtml = htmlString.replace(/alt="[^"]*"\s*[^>]*?>/gi, "");

  const $ = cheerio.load(cleanedHtml);
  return $.text().trim();
}
