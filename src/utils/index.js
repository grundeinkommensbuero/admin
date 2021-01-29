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
