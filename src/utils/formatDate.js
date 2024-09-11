const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${month} ${day}, ${year} ${hours % 12}:${
    (minutes < 10 ? "0" : "") + minutes
  } ${ampm}`;

  return formattedDate;
};

export default formatDate;
