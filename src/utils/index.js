export const formatDate = (dateString) => {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('de', options).format(date);
};

export const numberWithDots = (num = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
