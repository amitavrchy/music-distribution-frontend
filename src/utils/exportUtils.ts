import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

/**
 * Exports data to an MS Excel file (.xlsx) and triggers a download in the browser.
 *
 * @param data Array of objects to export
 * @param filename Name of the file to be downloaded (default: 'export.xlsx')
 * @param headers Optional custom headers mapping (e.g., { releaseTitle: 'Title' })
 */
export const exportToExcel = (
  data: Record<string, unknown>[],
  filename: string = "export.xlsx",
  headers?: Record<string, string>,
) => {
  if (!data || !data.length) {
    toast.error("No data to export");
    return;
  }

  // If headers are provided, transform the data to use the header names as keys
  const dataWithHeaders = data.map((item) => {
    if (!headers) return item;

    const newItem: Record<string, unknown> = {};
    Object.keys(headers).forEach((key) => {
      newItem[headers[key]] = item[key];
    });
    return newItem;
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate Excel file and trigger download
  XLSX.writeFile(
    workbook,
    filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`,
  );
};

/**
 * Backwards compatibility or alternative for CSV export
 */
export const exportToCSV = (
  data: Record<string, unknown>[],
  filename: string = "export.csv",
  headers?: Record<string, string>,
) => {
  if (!data || !data.length) {
    console.error("No data to export");
    return;
  }

  // Define headers
  const columnHeaders = headers ? Object.values(headers) : Object.keys(data[0]);
  const keys = headers ? Object.keys(headers) : Object.keys(data[0]);

  // Create CSV rows
  const csvRows = [
    columnHeaders.join(","), // Header row
    ...data.map((item) =>
      keys
        .map((key) => {
          const val = item[key];
          const escaped = ("" + (val ?? "")).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(","),
    ),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Exports an HTML element to a PDF file and triggers a download.
 *
 * @param elementId The ID of the HTML element to capture
 * @param filename Name of the file to be downloaded (default: 'document.pdf')
 */
export const exportToPDF = async (
  elementId: string,
  filename: string = "document.pdf",
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    const msg = `Error: Invoice template (ID: ${elementId}) not found in document.`;
    console.error(msg);
    alert(msg);
    return;
  }

  try {
    console.log(
      "Starting PDF generation with jsPDF html() for element:",
      elementId,
    );

    // Ensure element is temporarily visible for capture
    const originalStyle = element.style.cssText;
    element.style.position = "fixed";
    element.style.top = "0";
    element.style.left = "0";
    element.style.visibility = "visible";
    element.style.zIndex = "-1000";
    // Remove opacity for capture
    element.style.opacity = "1";

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
      hotfixes: ["px_scaling"],
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    await pdf.html(element, {
      callback: (doc) => {
        doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
        console.log("PDF successfully generated and saved.");
        // Restore original style after callback
        element.style.cssText = originalStyle;
      },
      x: 0,
      y: 0,
      width: pdfWidth,
      windowWidth: 800, // Match the width in our template
      html2canvas: {
        scale: 1, // Let width/windowWidth handle scaling
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    toast.error(
      `An error occurred while generating the PDF: ${error?.message || "Unknown error"}. Please check the console for more details.`,
    );
  }
};
