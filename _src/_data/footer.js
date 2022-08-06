module.exports = {
    currentYear() {
      const today = new Date();
      return today.getFullYear();
    },
    builtAt: new Date().toLocaleString()
  };
