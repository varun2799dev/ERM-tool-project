exports.getAvailableCapacity = (engineer, assignments) => {
  const allocated = assignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );
  return engineer.maxCapacity - allocated;
};
