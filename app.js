// Importing required modules
const fs = require('fs');
const csv = require('csv-parser');

// File paths
const inputFilePath = 'input_countries.csv'; // Make sure this is the correct file path for your CSV file
const canadaFilePath = './canada.txt';
const usaFilePath = './usa.txt';

// Function to delete files if they exist
function deleteFilesIfExist() {
  if (fs.existsSync(canadaFilePath)) {
    fs.unlinkSync(canadaFilePath); // Delete canada.txt if exists
  }
  if (fs.existsSync(usaFilePath)) {
    fs.unlinkSync(usaFilePath); // Delete usa.txt if exists
  }
}

// Function to filter data for a specific country and write to a file
function filterAndWriteData(country, filePath) {
  const results = [];

  // Read and filter CSV data
  fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === country.toLowerCase()) {
        results.push(row); // Push matching rows to results
      }
    })
    .on('end', () => {
      // Format filtered data into CSV format
      const countryData = results
        .map(row => `${row.country},${row.year},${row.population}`)
        .join('\n');
      
      // Write the filtered data to the respective file
      fs.writeFileSync(filePath, 'country,year,population\n' + countryData);
      console.log(`Data for ${country} written to ${filePath}`);
    });
}

// Main logic to run the task
function main() {
  deleteFilesIfExist(); // Delete the files if they already exist

  // Filter and write data for Canada
  filterAndWriteData('Canada', canadaFilePath);

  // Filter and write data for United States
  filterAndWriteData('United States', usaFilePath);
}

// Run the main function
main();
