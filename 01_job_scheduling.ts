// Define a Job type with start time, end time, and profit
type Job = {
  start: number; // Start time in minutes from midnight
  end: number; // End time in minutes from midnight
  profit: number; // Profit value for the job
};

// Find the latest non-conflicting job before the current job
const findNonConflictingJob = (jobs: Job[], index: number): number => {
  // Search backwards from current index
  for (let j = index - 1; j >= 0; j--) {
    // If found a job that ends before current job starts
    if (jobs[j].end <= jobs[index].start) {
      return j;
    }
  }
  return -1; // No non-conflicting job found
};

// Main function to schedule jobs for maximum profit
export const jobScheduling = (input: string[]): [number, number] => {
  // Parse number of jobs from first input
  const n = parseInt(input[0], 10);
  const jobs: Job[] = [];

  // Parse job details from input array
  for (let i = 0; i < n; i++) {
    const start = parseInt(input[i * 3 + 1], 10); // Parse start time
    const end = parseInt(input[i * 3 + 2], 10); // Parse end time
    const profit = parseInt(input[i * 3 + 3], 10); // Parse profit
    jobs.push({ start, end, profit });
  }

  // Sort jobs by end time for optimal scheduling
  jobs.sort((a, b) => a.end - b.end);

  // Initialize maxProfit array
  const maxProfit: number[] = new Array(n).fill(0);
  maxProfit[0] = jobs[0].profit; // Base case: first job's profit

  // Fill maxProfit array with maximum possible profit at each index
  for (let i = 1; i < n; i++) {
    let currentProfit = jobs[i].profit; // Profit if we include current job
    const lastNonConflicting = findNonConflictingJob(jobs, i);
    // Add profit from last non-conflicting job if exists
    if (lastNonConflicting !== -1) {
      currentProfit += maxProfit[lastNonConflicting];
    }
    // Take maximum of including or excluding current job
    maxProfit[i] = Math.max(maxProfit[i - 1], currentProfit);
  }

  const maxEarnings = maxProfit[n - 1]; // Maximum possible earnings
  const selectedJobs: boolean[] = new Array(n).fill(false);
  let remainingProfit = maxEarnings;
  let index = n - 1;

  // Backtrack to find which jobs were selected
  while (index >= 0) {
    // If current profit equals previous profit, skip this job
    if (
      maxProfit[index] === (index > 0 ? maxProfit[index - 1] : 0) &&
      index > 0
    ) {
      index--;
    } else {
      // Include this job in solution
      selectedJobs[index] = true;
      remainingProfit -= jobs[index].profit;
      // Jump to last non-conflicting job
      index = findNonConflictingJob(jobs, index);
    }
  }

  // Calculate remaining tasks and their total earnings
  let remainingTasks = 0;
  let remainingEarnings = 0;
  for (let i = 0; i < n; i++) {
    if (!selectedJobs[i]) {
      remainingTasks++;
      remainingEarnings += jobs[i].profit;
    }
  }

  return [remainingTasks, remainingEarnings];
};
