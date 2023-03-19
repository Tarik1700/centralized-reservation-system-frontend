export type BUTTON_TYPES =
  | "danger"
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "base"
  | "success"
  | "custom";

export const getColoringStyle = (variation: string, color: string) => {
  switch (variation) {
    case "primary":
      return {
        backgroundColor: color,
        color: "#fff",
        border: "none",
      };
    case "secondary":
      return {
        backgroundColor: color,
        border: "none",
      };
    case "outline":
      return {
        borderColor: color,
        color: color,
        border: `1px solid ${color}`,
        background: "transparent",
      };
    case "base":
      return {
        background: "transparent",
        color: color,
        border: "none",
      };
    default:
      return null;
  }
};
