// 2.9999999999999 | 3.0000000000004 => 3
module.exports = function (value) {
  const freshValue = (value + Number.EPSILON).toFixed(10).split("");

  while (!freshValue.at(-1) === "0") freshValue.pop();
  if (freshValue.at(-1) === ".") freshValue.pop();

  return Number(freshValue.join(""));
};
