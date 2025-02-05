console.log("Hello, back to school");

//Declare to variables for use in the script
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

let saleMap;
let totalSale;
let salesByProduct;
let salesBySegment;

const oregonWashingtonButton = document.getElementById("oregon_Washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo_filter");
const minValue = document.getElementById("min_value");
const maxValue = document.getElementById("max_value");
const applyButton = document.getElementById("apply_button");

//Get the workbook
function logWorkbookInformation() {
  workbook = viz.workbook;
  console.log(`The name of the workbook is "${workbook.name}"`);

  //Get the views which are in the workbook
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheet with index ${element.index} is ${element.name}`);
  });

  //Get the active views in the workbook
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  //List all the sheets in the view
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(`The worksheet with index ${element.index} is ${element.name}`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSale = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}
function oregonWashingtonFunction() {
  console.log(
    `Oregon Washington Button press. ${oregonWashingtonButton.value}`
  );

  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSale.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}
function clearFilterFunction() {
  console.log(`Clearing State Filter`);
  //list.sheets.forEach
  saleMap.clearFilterAsync("State");
  totalSale.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function unDo() {
  console.log("Undo last action");
  viz.undoAsync();
}

function filterRangeFunction() {
  console.log(`Min Value to filter first: ${minValue.value}`);
  console.log(`Max Value to filter first: ${maxValue.value}`);

  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: parseFloat(minValue.value),
    max: parseFloat(maxValue.value),
  });
}

viz.addEventListener("firstinteractive", logWorkbookInformation);
oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearFilterFunction);
undoButton.addEventListener("click", unDo);
applyButton.addEventListener("click", filterRangeFunction);
