import type { NextApiRequest, NextApiResponse, NextPageContext } from "next";
const pdf2img = require("pdf-img-convert");
const pdfjsLib = require("pdfjs-dist");

export interface PDFResponse {
  images: string[];
  link: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PDFResponse>
) {
  const { method, body } = req;

  if (method == "GET") {
    const response: PDFResponse = await getLatestImages();

    return res.json(response);
  }
}

async function getLatestImages() {
  const response1 = await fetch("https://pdf.stuyspec.com/"); 
  const text = await response1.text();
  const volume = (text.split("href=\"").at(-5)!).split("/").at(1);
  // get volume

  const response2 = await fetch( `https://pdf.stuyspec.com/${volume}`);
  const text2 = await response2.text();
  const issue = (text2.split("</a>").at(-4)!).split(">").at(-1);
  // get issue

  const loadingTask = pdfjsLib.getDocument(
    `https://pdf.stuyspec.com/${volume}/${issue}`
  );
  const numPages = await loadingTask.promise.then(
    (pdfDocument: { numPages: any }) => {
      return pdfDocument.numPages;
    }
  ); //find the number of pages in the current issue

  const convertImages = await pdf2img.convert(
    `https://pdf.stuyspec.com/${volume}/${issue}`,
    { page_numbers: [1, numPages] }
  );
  // convert the pdfs to Uint8 arrays using the pdf2img library

  const firstPage = Buffer.from(convertImages[0]).toString("base64");
  const lastPage = Buffer.from(convertImages[1]).toString("base64");
  // convert the Uint8 arrays into base64

  let images: string[] = [
    "data:image/jpeg;base64," + firstPage,
    "data:image/jpeg;base64," + lastPage,
  ];
  // create temporary image links using data URLs

  const link = `https://pdf.stuyspec.com/${volume}/${issue}`;
  return { images, link };
}