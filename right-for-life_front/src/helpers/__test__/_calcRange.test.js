import { _calcRange } from '../calcAge';

describe('Calculate range (USA format)', () => {
  function createTest(from, to) {
    const createDate = dateStr => {
      const dateArr = dateStr.split('/').map(i => +i);
      const date = new Date();

      date.setMonth(dateArr[0] - 1);
      date.setDate(dateArr[1]);
      date.setFullYear(dateArr[2]);

      return +date;
    };

    return _calcRange(createDate(from), createDate(to));
  }

  it('If from > to, should log error', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    _calcRange(2, 1);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it('If from or to !== integer, should log error', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    _calcRange(null);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it('If from.d more to.d for 1, should return weeks=4 and days <= 2', () => {
    expect(createTest('01/02/2020', '02/01/2020')).toMatchObject({
      years: 0,
      months: 0,
      weeks: 4,
      days: 2,
    });
  });

  it('If from.d lower to.d for 1, should return days=1', () => {
    expect(createTest('02/01/2020', '02/02/2020')).toMatchObject({
      years: 0,
      months: 0,
      weeks: 0,
      days: 1,
    });
  });

  it('If from.m more to.m for 1, should return months=11', () => {
    expect(createTest('02/02/2019', '01/02/2020')).toMatchObject({
      years: 0,
      months: 11,
      weeks: 0,
      days: 0,
    });
  });

  it('If from.m lower to.m for 1, should return months=1', () => {
    expect(createTest('01/02/2020', '02/02/2020')).toMatchObject({
      years: 0,
      months: 1,
      weeks: 0,
      days: 0,
    });
  });

  it('If from.y lower to.y for 1, should return years=1', () => {
    expect(createTest('01/01/2019', '01/01/2020')).toMatchObject({
      years: 1,
      months: 0,
      weeks: 0,
      days: 0,
    });
  });
});
