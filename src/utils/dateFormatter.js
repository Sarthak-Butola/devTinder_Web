export function formatDate(isoDateStr, timeZone = "Asia/Kolkata") {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);
    return date.toLocaleString("en-IN", {
      timeZone,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }