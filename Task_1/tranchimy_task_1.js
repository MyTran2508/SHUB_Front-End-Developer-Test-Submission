import { utils, writeFile, read } from "xlsx";

async function retrieveAndParseExcel() {
  try {
    const response = await fetch(
      "https://go.microsoft.com/fwlink/?LinkID=521962"
    );
    const buffer = await response.arrayBuffer();
    const workbook = read(buffer, { type: "buffer" });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    const data = utils.sheet_to_json(worksheet);

    const salesValues = data.map((row) => ({ "  Sales ": row["  Sales "] }));

    const newWorkbook = utils.book_new();
    const newWorksheet = utils.json_to_sheet(salesValues);
    utils.book_append_sheet(newWorkbook, newWorksheet, "Sales Data");

    writeFile(newWorkbook, "SalesData.xlsx");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

retrieveAndParseExcel();
