//Styles
import "./ThemeSelector.scss";
import { useTheme } from "../../hooks/useTheme";

const themeColors = ["warning", "info", "secondary"];
// const themeColors = ["red", "green", "yellow"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const modeToggle = () => {
    changeMode(mode === "light" ? "dark" : "light");
    console.log("Mode:", mode);
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        {mode === "light" && (
          <i className="bi bi-brightness-high-fill" onClick={modeToggle}></i>
        )}
        {mode === "dark" && (
          <i
            className="bi bi-brightness-high text-light"
            onClick={modeToggle}
          ></i>
        )}
      </div>
      <div className="theme-buttons">
        {themeColors.map((color, i) => (
          <div
            className={`bg-${color}`}
            key={color}
            onClick={() => changeColor(color)}
            // style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
