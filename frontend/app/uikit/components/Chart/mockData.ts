const countsByMonthBalances: Record<string, number> = {};
export const chartData = [
  { month: "Янв", value: { crypto: 1.105, fiat: 1.105 } },
  { month: "Янв", value: { crypto: 1.11, fiat: 1.11 } },
  { month: "Янв", value: { crypto: 1.12, fiat: 1.12 } },
  { month: "Фев", value: { crypto: 1.109, fiat: 1.109 } },
  { month: "Фев", value: { crypto: 1.108, fiat: 1.108 } },
  { month: "Фев", value: { crypto: 1.105, fiat: 1.105 } },
  { month: "Мар", value: { crypto: 1.105, fiat: 1.105 } },
  { month: "Мар", value: { crypto: 1.104, fiat: 1.104 } },
  { month: "Мар", value: { crypto: 1.103, fiat: 1.103 } },
  { month: "Апр", value: { crypto: 1.102, fiat: 1.102 } },
  { month: "Апр", value: { crypto: 1.105, fiat: 1.105 } },
  { month: "Апр", value: { crypto: 1.109, fiat: 1.109 } },
  { month: "Май", value: { crypto: 1.119, fiat: 1.119 } },
  { month: "Май", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Май", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Июн", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Июн", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Июн", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Июл", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Июл", value: { crypto: 1.149, fiat: 1.149 } },
  { month: "Июл", value: { crypto: 1.128, fiat: 1.128 } },
  { month: "Авг", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Авг", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Авг", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Сен", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Сен", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Сен", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Окт", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Окт", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Окт", value: { crypto: 1.113, fiat: 1.113 } },
  { month: "Ноя", value: { crypto: 1.146, fiat: 1.146 } },
  { month: "Ноя", value: { crypto: 1.148, fiat: 1.148 } },
  { month: "Ноя", value: { crypto: 1.148, fiat: 1.148 } },
  { month: "Дек", value: { crypto: 1.138, fiat: 1.138 } },
  { month: "Дек", value: { crypto: 1.121, fiat: 1.121 } },
  { month: "Дек", value: { crypto: 1.139, fiat: 1.139 } },
].map((item) => {
  if (!countsByMonthBalances[item.month]) {
    countsByMonthBalances[item.month] = 1;
  } else {
    countsByMonthBalances[item.month] += 1;
  }

  return { ...item, part: countsByMonthBalances[item.month] };
});
