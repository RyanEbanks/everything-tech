module.exports = {
  format_date: (date) => {
    // Convert date string to Date object
    const dateObj = new Date(date);

    // Format date as MM/DD/YYYY
    return dateObj.toLocaleDateString();
  }
};
