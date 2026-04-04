// CSTAR Media — Unit Economics Tracker
// Google Apps Script — run this ONCE to build your entire tracker
//
// HOW TO USE:
// 1. Go to sheets.google.com -> create a new blank spreadsheet
// 2. Name it "CSTAR Media - Unit Economics Tracker"
// 3. Click Extensions -> Apps Script
// 4. Delete everything in the editor
// 5. Paste this entire script
// 6. Click Save, then click Run
// 7. Accept permissions when prompted
// 8. Go back to your spreadsheet - all 4 sheets are built!

function buildCSTARTracker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  buildMonthlyOverview(ss);
  buildClientTracker(ss);
  buildUnitEconomics(ss);
  buildScaleReadiness(ss);
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet) ss.deleteSheet(defaultSheet);
  SpreadsheetApp.getUi().alert("CSTAR Media Tracker built! All 4 sheets are ready.");
}

var DARK_BLUE  = "#1a3a5c";
var WHITE      = "#ffffff";
var LIGHT_GRAY = "#f5f5f5";
var GREEN_BG   = "#d9ead3";
var RED_BG     = "#fce8e6";
var YELLOW_BG  = "#fff2cc";
var GREEN_TEXT = "#274e13";
var RED_TEXT   = "#660000";

// ---- SHEET 1: MONTHLY OVERVIEW --------------------------------
function buildMonthlyOverview(ss) {
  var sheet = ss.getSheetByName("Monthly Overview") || ss.insertSheet("Monthly Overview", 0);
  sheet.clear();
  sheet.clearConditionalFormatRules();

  var headers = ["Month","Active Clients","New Clients","Churned Clients","MRR ($)","New Revenue ($)","Lost Revenue ($)","Net MRR Growth ($)","MRR Growth %"];
  var months  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  for (var i = 0; i < 12; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(months[i]);
    if (i % 2 === 0) sheet.getRange(row, 1, 1, headers.length).setBackground(LIGHT_GRAY);
  }

  var totalsRow = 14;
  sheet.getRange(totalsRow, 1).setValue("TOTALS").setFontWeight("bold");
  sheet.getRange(totalsRow, 3).setFormula("=SUM(C2:C13)").setFontWeight("bold");
  sheet.getRange(totalsRow, 4).setFormula("=SUM(D2:D13)").setFontWeight("bold");
  sheet.getRange(totalsRow, 6).setFormula("=SUM(F2:F13)").setFontWeight("bold");
  sheet.getRange(totalsRow, 7).setFormula("=SUM(G2:G13)").setFontWeight("bold");
  sheet.getRange(totalsRow, 8).setFormula("=SUM(H2:H13)").setFontWeight("bold");
  sheet.getRange(totalsRow, 1, 1, headers.length).setBackground("#d9d9d9");

  for (var i = 1; i < 12; i++) {
    var row = i + 2;
    sheet.getRange(row, 9).setFormula("=IF(E"+(row-1)+"=0,0,(E"+row+"-E"+(row-1)+")/E"+(row-1)+")").setNumberFormat("0.0%");
  }

  sheet.getRange(2, 5, 13, 4).setNumberFormat("$#,##0");
  sheet.setColumnWidth(1, 120);
  for (var c = 2; c <= 9; c++) sheet.setColumnWidth(c, 140);
  sheet.setFrozenRows(1);
}

// ---- SHEET 2: CLIENT TRACKER ----------------------------------
function buildClientTracker(ss) {
  var sheet = ss.getSheetByName("Client Tracker") || ss.insertSheet("Client Tracker", 1);
  sheet.clear();
  sheet.clearConditionalFormatRules();

  var headers = ["Client Name","Niche","Start Date","Monthly Fee ($)","Ad Spend Budget ($)","Status","Months Active","Total Revenue ($)","Churn Date","Churn Reason"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  for (var i = 0; i < 20; i++) {
    var row = i + 2;
    sheet.getRange(row, 7).setFormula("=IF(C"+row+"=\"\",\"-\",IF(I"+row+"=\"\",DATEDIF(C"+row+",TODAY(),\"M\"),DATEDIF(C"+row+",I"+row+",\"M\")))");
    sheet.getRange(row, 8).setFormula("=IF(OR(D"+row+"=\"\",G"+row+"=\"\"),\"-\",D"+row+"*G"+row+")");
    if (i % 2 === 0) sheet.getRange(row, 1, 1, headers.length).setBackground(LIGHT_GRAY);
  }

  var statusRange = sheet.getRange("F2:F21");

  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Active")
    .setBackground(GREEN_BG)
    .setFontColor(GREEN_TEXT)
    .setRanges([statusRange])
    .build();

  var redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Churned")
    .setBackground(RED_BG)
    .setFontColor(RED_TEXT)
    .setRanges([statusRange])
    .build();

  sheet.setConditionalFormatRules([greenRule, redRule]);

  var statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Active","Churned"], true).build();
  sheet.getRange("F2:F21").setDataValidation(statusValidation);

  var nicheValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Home Services","Health & Wellness","Automotive","Beauty","Other"], true).build();
  sheet.getRange("B2:B21").setDataValidation(nicheValidation);

  sheet.getRange(2, 4, 20, 2).setNumberFormat("$#,##0");
  sheet.getRange(2, 8, 20, 1).setNumberFormat("$#,##0");

  var widths = [160,140,110,140,160,100,120,140,110,180];
  for (var c = 0; c < widths.length; c++) sheet.setColumnWidth(c+1, widths[c]);
  sheet.setFrozenRows(1);
}

// ---- SHEET 3: UNIT ECONOMICS ----------------------------------
function buildUnitEconomics(ss) {
  var sheet = ss.getSheetByName("Unit Economics") || ss.insertSheet("Unit Economics", 2);
  sheet.clear();
  sheet.clearConditionalFormatRules();

  sheet.getRange(1, 1, 1, 3).setValues([["Metric","Value","Notes"]])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  var labels = [
    "Total Active Clients",
    "MRR ($)",
    "ARR ($)",
    "Avg Client Value ($/mo)",
    "Avg Client Lifespan (months)",
    "LTV ($)",
    "CAC ($)",
    "LTV:CAC Ratio",
    "Payback Period (months)",
    "Monthly Churn Rate %",
    "Close Rate %",
    "Avg CPL ($)"
  ];
  var notes = [
    "Auto-counted from Client Tracker",
    "Auto-summed from active clients",
    "MRR x 12",
    "MRR divided by Total Clients",
    "UPDATE: how many months avg client stays",
    "Avg Value x Avg Lifespan",
    "UPDATE: what you spend to get 1 client",
    "Target: 3.0x or higher",
    "Target: 3 months or less",
    "Target: under 10%",
    "UPDATE: % of calls you close",
    "UPDATE: your avg cost per lead"
  ];

  for (var i = 0; i < labels.length; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(labels[i]);
    sheet.getRange(row, 3).setValue(notes[i]).setFontColor("#666666").setFontStyle("italic");
    if (i % 2 === 0) sheet.getRange(row, 1, 1, 3).setBackground(LIGHT_GRAY);
  }

  // Formulas
  sheet.getRange(2, 2).setFormula("=COUNTIF('Client Tracker'!F2:F21,\"Active\")");
  sheet.getRange(3, 2).setFormula("=SUMIF('Client Tracker'!F2:F21,\"Active\",'Client Tracker'!D2:D21)").setNumberFormat("$#,##0");
  sheet.getRange(4, 2).setFormula("=B3*12").setNumberFormat("$#,##0");
  sheet.getRange(5, 2).setFormula("=IF(B2=0,0,B3/B2)").setNumberFormat("$#,##0");
  sheet.getRange(6, 2).setValue(12).setBackground(YELLOW_BG).setFontColor("#0000FF");
  sheet.getRange(7, 2).setFormula("=B5*B6").setNumberFormat("$#,##0");
  sheet.getRange(8, 2).setValue(500).setBackground(YELLOW_BG).setFontColor("#0000FF").setNumberFormat("$#,##0");
  sheet.getRange(9, 2).setFormula("=IF(B8=0,0,B7/B8)").setNumberFormat("0.0\"x\"");
  sheet.getRange(10, 2).setFormula("=IF(B5=0,0,B8/B5)").setNumberFormat("0.0\" mo\"");
  sheet.getRange(11, 2).setFormula("=IFERROR(COUNTIF('Client Tracker'!F2:F21,\"Churned\")/COUNTA('Client Tracker'!A2:A21),0)").setNumberFormat("0.0%");
  sheet.getRange(12, 2).setValue(0.30).setBackground(YELLOW_BG).setFontColor("#0000FF").setNumberFormat("0.0%");
  sheet.getRange(13, 2).setValue(30).setBackground(YELLOW_BG).setFontColor("#0000FF").setNumberFormat("$#,##0");

  // Note
  sheet.getRange(15, 1).setValue("Blue cells = manual inputs (update these as your numbers change).")
    .setFontStyle("italic").setFontColor("#666666");

  // Conditional formatting
  var rules = [];

  var ltvcacRange = sheet.getRange("B9");
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(3).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([ltvcacRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(3).setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([ltvcacRange]).build());

  var paybackRange = sheet.getRange("B10");
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThanOrEqualTo(3).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([paybackRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(3).setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([paybackRange]).build());

  var churnRange = sheet.getRange("B11");
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.10).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([churnRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.10).setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([churnRange]).build());

  var closeRange = sheet.getRange("B12");
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(0.30).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([closeRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.30).setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([closeRange]).build());

  sheet.setConditionalFormatRules(rules);

  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 300);
  sheet.setFrozenRows(1);
}

// ---- SHEET 4: SCALE READINESS --------------------------------
function buildScaleReadiness(ss) {
  var sheet = ss.getSheetByName("Scale Readiness") || ss.insertSheet("Scale Readiness", 3);
  sheet.clear();
  sheet.clearConditionalFormatRules();

  sheet.getRange(1, 1, 1, 3).setValues([["Checkpoint","Status","Notes"]])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  var rows = [
    ["Offer proven with 2+ client results",       "NO",  ""],
    ["Close rate above 25%",                       "NO",  ""],
    ["Monthly churn under 10%",                    "NO",  ""],
    ["LTV:CAC ratio 3.0 or above",                "NO",  ""],
    ["Payback period under 90 days (3 months)",   "NO",  ""],
    ["SOPs documented for all repeating tasks",   "NO",  ""],
    ["At least 1 case study written",             "NO",  ""],
    ["VSL script written",                         "YES", "Done - see /scale/vsl-script.md"],
    ["Landing page built",                         "NO",  ""],
    ["Ad budget defined for paid acquisition",     "NO",  ""]
  ];

  for (var i = 0; i < rows.length; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(rows[i][0]);
    sheet.getRange(row, 2).setValue(rows[i][1]);
    sheet.getRange(row, 3).setValue(rows[i][2]).setFontColor("#666666");
    if (i % 2 === 0) sheet.getRange(row, 1, 1, 3).setBackground(LIGHT_GRAY);
  }

  var validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["YES","NO"], true).build();
  sheet.getRange("B2:B11").setDataValidation(validation);

  var statusRange = sheet.getRange("B2:B11");
  var recRange    = sheet.getRange("B13");

  var rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("YES").setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([statusRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("NO").setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([statusRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("READY TO SCALE").setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setRanges([recRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("ALMOST READY").setBackground(YELLOW_BG).setFontColor("#7d4e00").setRanges([recRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("NOT YET - KEEP BUILDING").setBackground(RED_BG).setFontColor(RED_TEXT).setRanges([recRange]).build());
  sheet.setConditionalFormatRules(rules);

  sheet.getRange(12, 1).setValue("YOUR SCORE").setFontWeight("bold");
  sheet.getRange(12, 2).setFormula("=COUNTIF(B2:B11,\"YES\")&\" / 10\"").setFontWeight("bold");
  sheet.getRange(12, 1, 1, 3).setBackground("#d9d9d9");

  sheet.getRange(13, 1).setValue("RECOMMENDATION").setFontWeight("bold");
  sheet.getRange(13, 2).setFormula("=IF(COUNTIF(B2:B11,\"YES\")>=8,\"READY TO SCALE\",IF(COUNTIF(B2:B11,\"YES\")>=5,\"ALMOST READY\",\"NOT YET - KEEP BUILDING\"))").setFontWeight("bold");

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 280);
  sheet.setFrozenRows(1);
}
