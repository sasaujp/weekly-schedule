import { useMemo } from "react";
import * as JapaneseHolidays from "japanese-holidays";

interface HolidayDictionary {
  [dateString: string]: string | undefined;
}

export function useJapaneseHolidays(dates: Date[]): (string | undefined)[] {
  const holidaysMap = useMemo(() => {
    const holidayDict: HolidayDictionary = {};

    const years = new Set(dates.map((d) => d.getFullYear()));
    years.forEach((year) => {
      const holidayList = JapaneseHolidays.getHolidaysOf(year);
      holidayList.forEach((holiday) => {
        const dateString = `${year}-${holiday.month
          .toString()
          .padStart(2, "0")}-${holiday.date.toString().padStart(2, "0")}`;
        holidayDict[dateString] = holiday.name;
      });
    });
    return holidayDict;
  }, [dates]);

  const holidays = useMemo(() => {
    return dates.map((date) => {
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      console.log(dateString);
      return holidaysMap[dateString];
    });
  }, [dates, holidaysMap]);

  return holidays;
}
