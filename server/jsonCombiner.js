import fs from 'fs/promises'; // Import fs/promises directly
import path from 'path';

// Function to read a JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    throw error;
  }
}

// Function to read JSON files from a folder
export async function readJsonFiles(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    const promises = jsonFiles.map(file => readJsonFile(path.join(folderPath, file)));
    return await Promise.all(promises);
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
}

 
export async function writeCombinedJson(outputFilePath, data) {
  try {
    const outputData = { data };
    await fs.writeFile(outputFilePath, JSON.stringify(outputData, null, 2));
    return `Combined JSON data has been written to: ${outputFilePath}`;
  } catch (error) {
    console.error("Error writing output file:", error);
    throw error;
  }
}

export async function clearOutputFile(outputFilePath) {
  try {
    await fs.writeFile(outputFilePath, '');
    console.log(`Cleared contents of ${outputFilePath}`);
  } catch (err) {
    console.error(`Error clearing output file: ${err.message}`);
  }
}

