function daysUntil(dateStr, from = /* @__PURE__ */ new Date()) {
  const target = new Date(dateStr);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let next = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  if (next < today) {
    next = new Date(from.getFullYear() + 1, target.getMonth(), target.getDate());
  }
  const diff = next.getTime() - today.getTime();
  return Math.round(diff / (1e3 * 60 * 60 * 24));
}
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function monthName(monthIndex) {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ][monthIndex];
}
export {
  daysUntil,
  formatDate,
  formatShortDate,
  monthName
};
