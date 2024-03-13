class ThemeColor extends String {
  static styles = typeof window !== "undefined" ? window.getComputedStyle(document.body) : null;

  static getColor(colorVariable: string): string {
    const color = ThemeColor.styles?.getPropertyValue(colorVariable) ?? `var(${colorVariable})`;

    return `rgb(${color})`;
  }

  private colorVariable: string;

  constructor(colorVariable: string) {
    super("");

    this.colorVariable = colorVariable;
  }

  toString() {
    return ThemeColor.getColor(this.colorVariable);
  }
}

export function getThemeColor(color: string): string {
  return new ThemeColor(color) as unknown as string;
}
