// CSTAR Media — Unit Economics Tracker
// Google Apps Script — run this ONCE to build your entire tracker
//
// HOW TO USE:
// 1. Go to sheets.google.com → create a new blank spreadsheet
// 2. Name it "CSTAR Media — Unit Economics Tracker"
// 3. Click Extensions → Apps Script
// 4. Delete everything in the editor
// 5. Paste this entire script
// 6. Click Save, then click Run
// 7. Accept permissions when prompted
// 8. Go back to your spreadsheet — all 4 sheets are built!

function buildCSTARTracker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove default sheet later, build all 4 first
  buildMonthlyOverview(ss);
  buildClientTracker(ss);
  buildUnitEconomics(ss);
  buildScaleReadiness(ss);

  // Remove the default blank Sheet1 if it exists
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet) ss.deleteSheet(defaultSheet);

  SpreadsheetApp.getUi().alert("CSTAR Media Tracker built successfully! All 4 sheets are ready.");
}

// ─── COLORS ───────────────────────────────────────────────────
var DARK_BLUE   = "#1a3a5c";
var WHITE       = "#ffffff";
var LIGHT_GRAY  = "#f5f5f5";
var GREEN_BG    = "#d9ead3";
var RED_BG      = "#fce8e6";
var YELLOW_BG   = "#fff2cc";
var GREEN_TEXT  = "#274e13";
var RED_TEXT    = "#660000";

// ─── SHEET 1: MONTHLY OVERVIEW ────────────────────────────────
function buildMonthlyOverview(ss) {
  var sheet = ss.getSheetByName("Monthly Overview") || ss.insertSheet("Monthly Overview", 0);
  sheet.clear();

  var headers = ["Month", "Active Clients", "New Clients", "Churned Clients", "MRR ($)", "New Revenue ($)", "Lost Revenue ($)", "Net MRR Growth ($)", "MRR Growth %"];
  var months  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Header row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  // Month rows
  for (var i = 0; i < 12; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(months[i]);
    // Alternating row colors
    if (i % 2 === 0) sheet.getRange(row, 1, 1, headers.length).setBackground(LIGHT_GRAY);
  }

  // Totals row
  var totalsRow = 14;
  sheet.getRange(totalsRow, 1).setValue("TOTALS").setFontWeight("bold");
  sheet.getRange(totalsRow, 3).setFormula("=SUM(C2:C13)").setFontWeight("bold"); // New Clients
  sheet.getRange(totalsRow, 4).setFormula("=SUM(D2:D13)").setFontWeight("bold"); // Churned
  sheet.getRange(totalsRow, 6).setFormula("=SUM(F2:F13)").setFontWeight("bold"); // New Revenue
  sheet.getRange(totalsRow, 7).setFormula("=SUM(G2:G13)").setFontWeight("bold"); // Lost Revenue
  sheet.getRange(totalsRow, 8).setFormula("=SUM(H2:H13)").setFontWeight("bold"); // Net Growth
  sheet.getRange(totalsRow, 1, 1, headers.length).setBackground("#d9d9d9");

  // MRR Growth % formula for each month (skip row 2 — no prior month)
  for (var i = 1; i < 12; i++) {
    var row = i + 2;
    sheet.getRange(row, 9).setFormula("=IF(E" + (row-1) + "=0,\"-\",(E" + row + "-E" + (row-1) + ")/E" + (row-1) + ")")
      .setNumberFormat("0.0%");
  }

  // Currency format for money columns
  sheet.getRange(2, 5, 13, 4).setNumberFormat("$#,##0");

  // Column widths
  sheet.setColumnWidth(1, 120);
  for (var c = 2; c <= 9; c++) sheet.setColumnWidth(c, 140);

  sheet.setFrozenRows(1);
}

// ─── SHEET 2: CLIENT TRACKER ──────────────────────────────────
function buildClientTracker(ss) {
  var sheet = ss.getSheetByName("Client Tracker") || ss.insertSheet("Client Tracker", 1);
  sheet.clear();

  var headers = ["Client Name", "Niche", "Start Date", "Monthly Fee ($)", "Ad Spend Budget ($)", "Status", "Months Active", "Total Revenue ($)", "Churn Date", "Churn Reason"];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  // 20 blank rows with formulas
  for (var i = 0; i < 20; i++) {
    var row = i + 2;
    // Months Active formula
    sheet.getRange(row, 7).setFormula(
      "=IF(C" + row + "=\"\",\"-\",IF(I" + row + "=\"\",DATEDIF(C" + row + ",TODAY(),\"M\"),DATEDIF(C" + row + ",I" + row + ",\"M\")))"
    );
    // Total Revenue formula
    sheet.getRange(row, 8).setFormula(
      "=IF(D" + row + "=\"\",\"-\",D" + row + "*G" + row + ")"
    );
    // Alternating rows
    if (i % 2 === 0) sheet.getRange(row, 1, 1, headers.length).setBackground(LIGHT_GRAY);
  }

  // Conditional formatting for Status column (F)
  var statusRange = sheet.getRange("F2:F21");
  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Active").setBackground(GREEN_BG).setFontColor(GREEN_TEXT).build();
  var redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Churned").setBackground(RED_BG).setFontColor(RED_TEXT).build();
  statusRange.setConditionalFormatRules([greenRule, redRule]);

  // Data validation for Status
  var statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Active", "Churned"], true).build();
  sheet.getRange("F2:F21").setDataValidation(statusValidation);

  // Niche validation
  var nicheValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Home Services", "Health & Wellness", "Automotive", "Beauty", "Other"], true).build();
  sheet.getRange("B2:B21").setDataValidation(nicheValidation);

  // Format money columns
  sheet.getRange(2, 4, 20, 2).setNumberFormat("$#,##0");
  sheet.getRange(2, 8, 20, 1).setNumberFormat("$#,##0");

  // Column widths
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 110);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 140);
  sheet.setColumnWidth(9, 110);
  sheet.setColumnWidth(10, 180);

  sheet.setFrozenRows(1);
}

// ─── SHEET 3: UNIT ECONOMICS ──────────────────────────────────
function buildUnitEconomics(ss) {
  var sheet = ss.getSheetByName("Unit Economics") || ss.insertSheet("Unit Economics", 2);
  sheet.clear();

  sheet.getRange(1, 1, 1, 3).setValues([["Metric", "Value", "Notes"]])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  var metrics = [
    ["Total Active Clients",       "='Client Tracker'!F2:F21",   "Auto-counted from Client Tracker"],
    ["MRR ($)",                    "",                            "Auto-summed from active clients"],
    ["ARR ($)",                    "",                            "MRR x 12"],
    ["Avg Client Value ($/mo)",    "",                            "MRR / Total Clients"],
    ["Avg Client Lifespan (mo)",   "12",                         "UPDATE: your avg client stays X months"],
    ["LTV ($)",                    "",                            "Avg Value x Avg Lifespan"],
    ["CAC ($)",                    "500",                        "UPDATE: what you spend to acquire 1 client"],
    ["LTV:CAC Ratio",              "",                            "Target: 3.0 or higher"],
    ["Payback Period (months)",    "",                            "Target: 3 months or less"],
    ["Monthly Churn Rate %",       "",                            "Target: under 10%"],
    ["Close Rate %",               "30%",                        "UPDATE: % of calls you close"],
    ["Avg CPL ($)",                "30",                         "UPDATE: cost per lead from paid ads"],
  ];

  // Write metrics
  for (var i = 0; i < metrics.length; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(metrics[i][0]);
    sheet.getRange(row, 3).setValue(metrics[i][2]).setFontColor("#666666").setFontStyle("italic");
    if (i % 2 === 0) sheet.getRange(row, 1, 1, 3).setBackground(LIGHT_GRAY);
  }

  // Formulas for calculated cells
  // Total Active Clients
  sheet.getRange(2, 2).setFormula("=COUNTIF('Client Tracker'!F2:F21,\"Active\")");
  // MRR
  sheet.getRange(3, 2).setFormula("=SUMIF('Client Tracker'!F2:F21,\"Active\",'Client Tracker'!D2:D21)").setNumberFormat("$#,##0");
  // ARR
  sheet.getRange(4, 2).setFormula("=B3*12").setNumberFormat("$#,##0");
  // Avg Client Value
  sheet.getRange(5, 2).setFormula("=IF(B2=0,0,B3/B2)").setNumberFormat("$#,##0");
  // Avg Lifespan — manual input (highlighted yellow)
  sheet.getRange(6, 2).setValue(12).setBackground(YELLOW_BG).setFontColor("#0000FF");
  // LTV
  sheet.getRange(7, 2).setFormula("=B5*B6").setNumberFormat("$#,##0");
  // CAC — manual input (highlighted yellow)
  sheet.getRange(8, 2).setValue(500).setBackground(YELLOW_BG).setFontColor("#0000FF");
  // LTV:CAC
  sheet.getRange(9, 2).setFormula("=IF(B8=0,0,B7/B8)").setNumberFormat("0.0\"x\"");
  // Payback Period
  sheet.getRange(10, 2).setFormula("=IF(B5=0,0,B8/B5)").setNumberFormat("0.0\" mo\"");
  // Churn Rate
  sheet.getRange(11, 2).setFormula("=COUNTIF('Client Tracker'!F2:F21,\"Churned\")/MAX(1,COUNTA('Client Tracker'!A2:A21))").setNumberFormat("0.0%");
  // Close Rate — manual input
  sheet.getRange(12, 2).setValue(0.30).setBackground(YELLOW_BG).setFontColor("#0000FF").setNumberFormat("0.0%");
  // Avg CPL — manual input
  sheet.getRange(13, 2).setValue(30).setBackground(YELLOW_BG).setFontColor("#0000FF").setNumberFormat("$#,##0");

  // Conditional formatting — LTV:CAC (row 9)
  var ltvcacRule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(3).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).build();
  var ltvcacRule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(3).setBackground(RED_BG).setFontColor(RED_TEXT).build();
  sheet.getRange("B9").setConditionalFormatRules([ltvcacRule1, ltvcacRule2]);

  // Payback Period (row 10) — green if <= 3 months
  var paybackRule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThanOrEqualTo(3).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).build();
  var paybackRule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(3).setBackground(RED_BG).setFontColor(RED_TEXT).build();
  sheet.getRange("B10").setConditionalFormatRules([paybackRule1, paybackRule2]);

  // Churn Rate (row 11) — green if < 10%
  var churnRule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0.10).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).build();
  var churnRule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(0.10).setBackground(RED_BG).setFontColor(RED_TEXT).build();
  sheet.getRange("B11").setConditionalFormatRules([churnRule1, churnRule2]);

  // Close Rate (row 12) — green if >= 30%
  var closeRule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(0.30).setBackground(GREEN_BG).setFontColor(GREEN_TEXT).build();
  var closeRule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0.30).setBackground(RED_BG).setFontColor(RED_TEXT).build();
  sheet.getRange("B12").setConditionalFormatRules([closeRule1, closeRule2]);

  // Note about yellow cells
  sheet.getRange(15, 1).setValue("Yellow cells = manual inputs. Update these as your numbers change.")
    .setFontStyle("italic").setFontColor("#666666");

  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 280);
  sheet.setFrozenRows(1);
}

// ─── SHEET 4: SCALE READINESS ─────────────────────────────────
function buildScaleReadiness(ss) {
  var sheet = ss.getSheetByName("Scale Readiness") || ss.insertSheet("Scale Readiness", 3);
  sheet.clear();

  sheet.getRange(1, 1, 1, 3).setValues([["Checkpoint", "Status (YES / NO)", "Notes"]])
    .setBackground(DARK_BLUE).setFontColor(WHITE).setFontWeight("bold").setHorizontalAlignment("center");

  var checkpoints = [
    ["Offer proven with 2+ client results",       "NO", ""],
    ["Close rate above 25%",                       "NO", ""],
    ["Monthly churn under 10%",                    "NO", ""],
    ["LTV:CAC ratio 3.0 or above",                "NO", ""],
    ["Payback period under 90 days (3 months)",   "NO", ""],
    ["SOPs documented for all repeating tasks",   "NO", ""],
    ["At least 1 case study written",             "NO", ""],
    ["VSL script written",                         "YES","Done - see /scale/vsl-script.md"],
    ["Landing page built",                         "NO", ""],
    ["Ad budget defined for paid acquisition",     "NO", ""],
  ];

  for (var i = 0; i < checkpoints.length; i++) {
    var row = i + 2;
    sheet.getRange(row, 1).setValue(checkpoints[i][0]);
    sheet.getRange(row, 2).setValue(checkpoints[i][1]);
    sheet.getRange(row, 3).setValue(checkpoints[i][2]).setFontColor("#666666");
    if (i % 2 === 0) sheet.getRange(row, 1, 1, 3).setBackground(LIGHT_GRAY);
  }

  // Data validation YES/NO
  var validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["YES", "NO"], true).build();
  sheet.getRange("B2:B11").setDataValidation(validation);

  // Conditional formatting YES/NO
  var yesRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("YES").setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setFontWeight("bold").build();
  var noRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("NO").setBackground(RED_BG).setFontColor(RED_TEXT).build();
  sheet.getRange("B2:B11").setConditionalFormatRules([yesRule, noRule]);

  // Score row
  sheet.getRange(12, 1).setValue("YOUR SCORE").setFontWeight("bold");
  sheet.getRange(12, 2).setFormula("=COUNTIF(B2:B11,\"YES\")&\" / 10\"").setFontWeight("bold");
  sheet.getRange(12, 1, 1, 3).setBackground("#d9d9d9");

  // Recommendation row
  sheet.getRange(13, 1).setValue("RECOMMENDATION").setFontWeight("bold");
  sheet.getRange(13, 2).setFormula(
    "=IF(COUNTIF(B2:B11,\"YES\")>=8,\"READY TO SCALE\",IF(COUNTIF(B2:B11,\"YES\")>=5,\"ALMOST READY\",\"NOT YET — KEEP BUILDING\"))"
  ).setFontWeight("bold");

  // Conditional formatting on recommendation
  var readyRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("READY TO SCALE").setBackground(GREEN_BG).setFontColor(GREEN_TEXT).setFontWeight("bold").build();
  var almostRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("ALMOST READY").setBackground(YELLOW_BG).setFontColor("#7d4e00").setFontWeight("bold").build();
  var notYetRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("NOT YET — KEEP BUILDING").setBackground(RED_BG).setFontColor(RED_TEXT).setFontWeight("bold").build();
  sheet.getRange("B13").setConditionalFormatRules([readyRule, almostRule, notYetRule]);

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 280);
  sheet.setFrozenRows(1);
}
