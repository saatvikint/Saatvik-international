/**
 * Saatvik International: website enquiries → Google Sheet.
 *
 * Paste this into the sheet's Extensions → Apps Script, set SECRET (and NOTIFY_EMAIL if wanted),
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Put the /exec URL in ENQUIRY_SHEET_WEBHOOK_URL and the same secret in ENQUIRY_SHEET_SECRET.
 * Full steps: .agent/developer/enquiry-flow.md
 */

/** Must equal ENQUIRY_SHEET_SECRET on the website. Long random string; never commit the real value. */
const SECRET = 'CHANGE-ME-to-a-long-random-string';

/** Optional: email address that gets a short alert for every new enquiry. Leave '' to turn off. */
const NOTIFY_EMAIL = '';

/** Tab that receives enquiries. Created if missing. */
const SHEET_NAME = 'Enquiries';

const HEADERS = [
  'Received (IST)', 'Reference', 'Form', 'Name', 'Company', 'Email', 'Phone',
  'City / Country', 'Products', 'Quantity / Volume', 'Message', 'Page', 'Status',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!SECRET || data.secret !== SECRET) return reply({ ok: false, error: 'unauthorised' });

    const sheet = enquirySheet();
    const reference = clean(data.id, 40);
    if (reference && alreadyRecorded(sheet, reference)) return reply({ ok: true, duplicate: true });

    const received = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, HH:mm');
    sheet.appendRow([
      received, reference, clean(data.form, 120), clean(data.name, 100), clean(data.company, 150),
      clean(data.email, 150), clean(data.phone, 30), clean(data.location, 100), clean(data.products, 500),
      clean(data.volume, 120), clean(data.message, 1000), clean(data.page, 300), 'New',
    ]);

    if (NOTIFY_EMAIL) notify(data, reference, received);
    return reply({ ok: true });
  } catch (error) {
    return reply({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the /exec URL in a browser shows this, which confirms the deployment works. */
function doGet() {
  return reply({ ok: true, service: 'Saatvik enquiries' });
}

function enquirySheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const first = book.getSheets()[0];
    // Reuse the first tab if it is still empty, otherwise add a dedicated tab.
    sheet = first.getLastRow() === 0 ? first.setName(SHEET_NAME) : book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f7dd54');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(11, 360);
  }
  return sheet;
}

function alreadyRecorded(sheet, reference) {
  const rows = sheet.getLastRow();
  if (rows < 2) return false;
  const recent = sheet.getRange(Math.max(2, rows - 200), 2, Math.min(200, rows - 1), 1).getValues();
  return recent.some(function (row) { return row[0] === reference; });
}

/** Text only; values that start like a formula are prefixed so the sheet never runs them. */
function clean(value, max) {
  const text = String(value == null ? '' : value).trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function notify(data, reference, received) {
  const lines = [
    'New website enquiry (' + reference + '), ' + received,
    '',
    'Form: ' + clean(data.form, 120),
    'Name: ' + clean(data.name, 100),
    'Company: ' + clean(data.company, 150),
    'Email: ' + clean(data.email, 150),
    'Phone: ' + clean(data.phone, 30),
    'City / Country: ' + clean(data.location, 100),
    'Products: ' + clean(data.products, 500),
    'Quantity: ' + clean(data.volume, 120),
    '',
    clean(data.message, 1000),
    '',
    'All enquiries: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ];
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: clean(data.email, 150) || NOTIFY_EMAIL,
    subject: 'Website enquiry: ' + (clean(data.company, 80) || clean(data.name, 80)) + ' (' + reference + ')',
    body: lines.join('\n'),
  });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
