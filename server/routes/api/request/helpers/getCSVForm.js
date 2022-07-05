// There are lots of modules that converts json to csv format
// But as our data is complex, we should have our own converter
module.exports = function getCSVFormat(data, category) {
  const maxWidth = Object.entries(data.global).length + 1;
  const result = [];
  const addSplitterAndHeader = () => {
    result.push(new Array(maxWidth - 1).fill(",").join("")); // Splitter
    result.push(`,${Object.keys(data.global).join(",")}`); // Header
  };

  result.push(`${category}${new Array(maxWidth - 1).fill(",").join("")}`);

  // Global Statistic
  addSplitterAndHeader();
  result.push(`Global,${Object.values(data.global).join(",")}`);

  // Statistic By Countires
  addSplitterAndHeader();
  for (const [country, statistic] of Object.entries(data.country))
    result.push(`${country},${Object.values(statistic).join(",")}`);

  // Statistic By States
  addSplitterAndHeader();
  for (const [state, statistic] of Object.entries(data.state))
    result.push(`${state},${Object.values(statistic).join(",")}`);

  return result;
};
