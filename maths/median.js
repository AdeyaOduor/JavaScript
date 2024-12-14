/* Find the middle of the array, use Array.sort() to sort the values. 
 Return the number at the midpoint if length is odd, otherwise the average of the two middle numbers.
 
 */

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
console.log(median([5, 6, 50, 1, -5])); //5
console.log(median([1, 2, 3, 4, 5]));//3
// ---------------------------------------------------------------------------------------------------------
//Example, Suppose we have a dataset of patient lengths of stay (in days)
const patientLOS = [
  2, 4, 1, 3, 5, 2, 4, 3, 1, 6,
];

// Calculate the median length of stay
const medianLOS = median(patientLOS);

console.log('Median length of stay:', medianLOS);
// Output: Median length of stay: 3

function median(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

/*
In this example, the median function is used to compute the median length of stay for the patients. 
The result shows that the median length of stay is 3 days.

Here are some of the real-world applications of the median in this hospital scenario:

    Performance evaluation: The median length of stay can be used as a key performance indicator (KPI) 
    to evaluate the hospital's efficiency and the quality of care provided to patients. Tracking changes in the 
    median LOS over time can help identify areas for improvement.

    Resource planning: The median LOS can inform decisions about resource allocation, such as the number of hospital 
    beds required, the staffing levels needed, and the procurement of medical supplies.

    Benchmarking: The hospital can compare its median LOS to industry benchmarks or the performance of peer hospitals 
    In this example, the median function is used to compute the median length of stay for the patients. The result shows 
    that the median length of stay is 3 days.

Here are some of the real-world applications of the median in this hospital scenario:

    Performance evaluation: The median length of stay can be used as a key performance indicator (KPI) to evaluate the 
    hospital's efficiency and the quality of care provided to patients. Tracking changes in the median LOS over time can help 
    identify areas for improvement.

    Resource planning: The median LOS can inform decisions about resource allocation, such as the number of hospital beds required, 
    the staffing levels needed, and the procurement of medical supplies.

    Benchmarking: The hospital can compare its median LOS to industry benchmarks or the performance of peer hospitals to assess its 
    
    relative performance and identify opportunities for improvement.

    Patient experience: The median LOS can be used as a proxy for patient satisfaction, as shorter stays may indicate more efficient 
    and effective care.

    Regulatory compliance: Hospitals may be required to report on various metrics related to patient outcomes, including the median 
    length of stay, for regulatory or accreditation purposes. to assess its relative performance and identify opportunities for improvement.

    Patient experience: The median LOS can be used as a proxy for patient satisfaction, as shorter stays may indicate more efficient and 
    effective care.

    Regulatory compliance: Hospitals may be required to report on various metrics related to patient outcomes, including the median length 
    of stay, for regulatory or accreditation purposes.
*/
