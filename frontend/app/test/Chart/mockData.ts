const countsByMonthBalances: Record<string, number> = {};
export const chartData = [
  { month: "Янв", value: 1.105 },
  { month: "Янв", value: 1.11 },
  { month: "Янв", value: 1.12 },
  { month: "Фев", value: 1.109 },
  { month: "Фев", value: 1.108 },
  { month: "Фев", value: 1.105 },
  { month: "Мар", value: 1.105 },
  { month: "Мар", value: 1.104 },
  { month: "Мар", value: 1.103 },
  { month: "Апр", value: 1.102 },
  { month: "Апр", value: 1.105 },
  { month: "Апр", value: 1.109 },
  { month: "Май", value: 1.119 },
  { month: "Май", value: 1.13 },
  { month: "Май", value: 1.13 },
  { month: "Июн", value: 1.13 },
  { month: "Июн", value: 1.13 },
  { month: "Июн", value: 1.13 },
  { month: "Июл", value: 1.13 },
  { month: "Июл", value: 1.149 },
  { month: "Июл", value: 1.128 },
  { month: "Авг", value: 1.137 },
  { month: "Авг", value: 1.137 },
  { month: "Авг", value: 1.137 },
  { month: "Сен", value: 1.137 },
  { month: "Сен", value: 1.137 },
  { month: "Сен", value: 1.137 },
  { month: "Окт", value: 1.137 },
  { month: "Окт", value: 1.137 },
  { month: "Окт", value: 1.137 },
  { month: "Ноя", value: 1.146 },
  { month: "Ноя", value: 1.148 },
  { month: "Ноя", value: 1.148 },
  { month: "Дек", value: 1.138 },
  { month: "Дек", value: 1.121 },
  { month: "Дек", value: 1.139 },
].map((item) => {
  if (!countsByMonthBalances[item.month]) {
    countsByMonthBalances[item.month] = 1;
  } else {
    countsByMonthBalances[item.month] += 1;
  }

  return { ...item, part: countsByMonthBalances[item.month] };
});
