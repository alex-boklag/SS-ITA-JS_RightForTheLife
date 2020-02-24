function _daysInMonth(ms) {
  const date = new Date(ms);

  // if a next month has a lower days
  date.setDate(1);

  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}

export function _calcRange(from, to = Date.now()) {
  if (!(Number.isInteger(from) && Number.isInteger(to))) {
    // eslint-disable-next-line no-console
    console.error(
      'Warning: expected from and to be integer, but gets:',
      from,
      to,
    );
  }

  if (from > to) {
    // eslint-disable-next-line no-console
    console.error('Warning: from should be lower than to. Gets:', from, to);
  }

  const dateFrom = new Date(from);
  const dateTo = new Date(to);

  const daysRange = dateTo.getDate() - dateFrom.getDate();
  const daysWithoutWeeks =
    daysRange < 0 ? _daysInMonth(from) + daysRange : daysRange;
  const days = daysWithoutWeeks % 7; // 7 - days in week

  const weeks = Math.trunc(daysWithoutWeeks / 7);

  const monthsRaw = dateTo.getMonth() - dateFrom.getMonth();
  const monthsWithDays = monthsRaw < 0 ? 12 + monthsRaw : monthsRaw; // 12 - months in year
  const months =
    dateFrom.getDate() > dateTo.getDate() ? monthsWithDays - 1 : monthsWithDays;

  const yearsWithMonth = dateTo.getFullYear() - dateFrom.getFullYear();
  const years =
    dateFrom.getMonth() > dateTo.getMonth()
      ? yearsWithMonth - 1
      : yearsWithMonth;

  return { years, months, weeks, days };
}

function formatCounter(countAll, first, second, third) {
  // slice is needed if n is more than 99
  const countWithTwo = String(countAll).slice(-2);

  if (countWithTwo.length === 2 && countWithTwo[0] === '1') {
    return first;
  }

  const countWithOne = countWithTwo.slice(-1);
  if (countWithOne === '1') {
    return second;
  }
  if (countWithOne === '2' || countWithOne === '3' || countWithOne === '4') {
    return third;
  }
  return first;
}

function formatAge(type, count) {
  const allTypes = {
    years: n => formatCounter(n, 'лет', 'год', 'года'),
    months: n => formatCounter(n, 'месяцев', 'месяц', 'месяца'),
    weeks: n => formatCounter(n, 'недель', 'неделя', 'недели'),
    days: n => formatCounter(n, 'дней', 'день', 'дня'),
  };

  return allTypes[type](count);
}

function calcAge(ms) {
  const ageObj = _calcRange(ms);
  const parsedAgeObj = Object.entries(ageObj).reduce((acc, [type, count]) => {
    if (!acc.finish && count) {
      acc[acc.first ? 'second' : 'first'] = `${count} ${formatAge(
        type,
        count,
      )}`;
    }

    if (acc.second) acc.finish = true;

    return acc;
  }, {});

  return parsedAgeObj.second
    ? `${parsedAgeObj.first} ${parsedAgeObj.second}`
    : parsedAgeObj.first;
}

export default calcAge;
