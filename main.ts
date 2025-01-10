import * as problem1 from "./01_job_scheduling";
import * as problem2 from "./02_goodie_distribution";

// Problem 1
const input1 = [
  "3",
  "0900", "1030", "100", // Job 1: 9:00-10:30, profit 100
  "1000", "1200", "500", // Job 2: 10:00-12:00, profit 500
  "1100", "1200", "300", // Job 3: 11:00-12:00, profit 300
];
const output1 = problem1.jobScheduling(input1);
console.log(output1); // Output: [2, 400]

const input2 = [
  "3",
  "0900", "1000", "250", // Job 1: 9:00-10:00, profit 250
  "0945", "1200", "550", // Job 2: 9:45-12:00, profit 550
  "1130", "1500", "150", // Job 3: 11:30-15:00, profit 150
];
const output2 = problem1.jobScheduling(input2);
console.log(output2); // Output: [2, 400]

const input3 = [
  "3",
  "0900", "1030", "100", // Job 1: 9:00-10:30, profit 100
  "1000", "1200", "100", // Job 2: 10:00-12:00, profit 100
  "1100", "1200", "100", // Job 3: 11:00-12:00, profit 100
];
const output3 = problem1.jobScheduling(input3);
console.log(output3); // Output: [1, 100]



// Problem 2

const inputFilePath1 = "sample_input_1.txt";
const outputFilePath1 = "sample_output_1.txt";
problem2.goodieDistribution({
  inputFilePath: inputFilePath1,
  outputFilePath: outputFilePath1,
});

const inputFilePath2 = "sample_input_2.txt";
const outputFilePath2 = "sample_output_2.txt";
problem2.goodieDistribution({
  inputFilePath: inputFilePath2,
  outputFilePath: outputFilePath2,
});

const inputFilePath3 = "sample_input_3.txt";
const outputFilePath3 = "sample_output_3.txt";
problem2.goodieDistribution({
  inputFilePath: inputFilePath3,
  outputFilePath: outputFilePath3,
});
