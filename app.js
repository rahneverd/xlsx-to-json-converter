const XLSX = require('xlsx');
const fs = require('fs');

// Path to the Excel file
const excelFilePath = 'translation.xlsx'; // Replace this with the path to your Excel file

// Read Excel file
const workbook = XLSX.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert Excel data to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Create JSON object with lowercase English keys and Arabic as values
const translationObject = {};
jsonData.forEach(row => {
    const lowercaseKey = row.English && typeof(row.English) ===  'string' ? row.English.toLowerCase() : row.English;
    translationObject[lowercaseKey] = row.Arabic;
});

// Convert the object to JSON string
const jsonString = JSON.stringify(translationObject, null, 2);

// Save the JSON data to a file
fs.writeFileSync('translations.json', jsonString, 'utf-8');

console.log('JSON data with lowercase keys has been created and saved to "translations.json".');
