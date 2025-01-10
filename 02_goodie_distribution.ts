// Import file system module for reading/writing files
import * as fs from "fs";

// Define the structure for a goodie item with name and price
type Goodie = {
  name: string; // Name of the goodie
  price: number; // Price of the goodie
};

// Function to write results to output file
const writeOutput = (
  filePath: string, // Path to output file
  selectedGoodies: Goodie[], // Array of selected goodies
  minDifference: number // Minimum price difference found
): void => {
  const output: string[] = []; // Array to store output lines
  output.push("The goodies selected for distribution are:");

  // Add each selected goodie to output
  for (const goodie of selectedGoodies) {
    output.push(`${goodie.name}: ${goodie.price}`);
  }

  output.push(""); // Empty line for formatting
  // Add the minimum difference information
  output.push(
    `And the difference between the chosen goodie with highest price and the lowest price is ${minDifference}`
  );

  // Write the output to file
  fs.writeFileSync(filePath, output.join("\n"), "utf-8");
};

// Function to parse input file and extract employees count and goodies list
const parseInput = (
  filePath: string
): {
  employees: number;
  goodies: Goodie[];
} => {
  // Read file and split into lines, removing whitespace
  const data = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim());

  // Extract number of employees from first line
  const employees = parseInt(data[0].split(":")[1].trim(), 10);
  const goodies: Goodie[] = [];

  // Parse each goodie line starting from line 3
  for (let i = 2; i < data.length; i++) {
    if (data[i]) {
      // Skip empty lines
      const [name, price] = data[i].split(":").map((part) => part.trim());
      goodies.push({ name, price: parseInt(price, 10) });
    }
  }

  return { employees, goodies };
};

// Main function to distribute goodies with minimum price difference
export const goodieDistribution = ({
  inputFilePath,
  outputFilePath,
}: {
  inputFilePath: string;
  outputFilePath: string;
}) => {
  // Read and parse input file
  const { employees, goodies } = parseInput(inputFilePath);

  // Sort goodies by price to help find minimum difference
  goodies.sort((a, b) => a.price - b.price);

  let minDifference = Infinity; // Track minimum price difference
  let startIndex = 0; // Track starting index of best selection

  // Try each possible consecutive group of employees-sized goodies
  for (let i = 0; i <= goodies.length - employees; i++) {
    // Calculate difference between highest and lowest price in current selection
    const diff = goodies[i + employees - 1].price - goodies[i].price;
    if (diff < minDifference) {
      minDifference = diff;
      startIndex = i;
    }
  }

  // Select the goodies with minimum price difference
  const selectedGoodies = goodies.slice(startIndex, startIndex + employees);

  // Write results to output file
  writeOutput(outputFilePath, selectedGoodies, minDifference);

  // Log confirmation message
  console.log("Output written to", outputFilePath);
};
