import millify from 'millify';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - date;

  // Format timestamps less than 1 hour ago as "X minutes ago"
  if (timeDifference < 3600000) {
    const minutesAgo = millify(timeDifference / 60000, { precision: 0 });
    return `${minutesAgo} ago`;
  }

  // Format timestamps less than 1 day ago as "X hours ago"
  if (timeDifference < 86400000) {
    const hoursAgo = millify(timeDifference / 3600000, { precision: 0 });
    return `${hoursAgo} ago`;
  }

  // Format other timestamps as "Month Day, Year"
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}