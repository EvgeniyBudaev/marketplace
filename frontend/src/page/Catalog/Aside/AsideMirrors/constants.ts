import { IAsideFilter } from "src/types";

export const filterMirrors: IAsideFilter[] = [
  {
    filter: { filterName: "В наличии", filterNameOnBackend: "inStock" },
    entities: ["В наличии"],
  },
  {
    filter: { filterName: "Категория", filterNameOnBackend: "category" },
    entities: [
      "Венецианские зеркала",
      "Зеркала в полный рост",
      "Зеркала в рамах",
      "Зеркальные панно",
      "Зеркала солнце",
    ],
  },
  {
    filter: { filterName: "Форма", filterNameOnBackend: "form" },
    entities: ["Круглая", "Овальная", "Прямоугольная", "Фигурная"],
  },
  {
    filter: { filterName: "Цвет", filterNameOnBackend: "frame_color" },
    entities: [
      "Античная бронза",
      "Античное золото",
      "Античное серебро",
      "Бронза",
      "Золото",
      "Латунь",
      "Никель",
      "Серебро",
      "Сталь полированная",
      "Хром",
      "Черный",
      "Шампань",
    ],
  },
];
