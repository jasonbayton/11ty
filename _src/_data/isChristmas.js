module.exports = () => {
  const today = new Date();
  const month = today.getMonth(); // 0 = Jan, 11 = Dec
  const day = today.getDate();

  const isDecember = month === 11 && day >= 1;
  const isEarlyJanuary = month === 0 && day <= 6;

  return isDecember || isEarlyJanuary;
};
