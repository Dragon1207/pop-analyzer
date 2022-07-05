module.exports = function (value) {
  const freshValue = (value + Number.EPSILON).toFixed(10).split("");

  while (!freshValue.at(-1) === "0") freshValue.pop();
  if (freshValue.at(-1) === ".") freshValue.pop();

  return Number(freshValue.join(""));
};
