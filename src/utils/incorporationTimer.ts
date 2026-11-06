/**
 * Calculates the exact duration since Church of Royals International Ministry
 * was incorporated in Ghana on 12th August 2013.
 */
export function getIncorporationDuration(targetDate = new Date()) {
  const incDate = new Date(2013, 7, 12); // August is month 7 (0-indexed)
  
  let years = targetDate.getFullYear() - incDate.getFullYear();
  let months = targetDate.getMonth() - incDate.getMonth();
  let days = targetDate.getDate() - incDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    days,
    formatted: `${years} Years, ${months} Months, ${days} Days`,
    fullStatement: `Church Incorporated in Ghana on 12th August 2013 · ${years} Years, ${months} Months, ${days} Days of Covenant Grace`
  };
}
