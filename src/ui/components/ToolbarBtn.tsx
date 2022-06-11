import "./ToolbarBtn.css";

export const ToolbarBtn = ({
  icon,
  label,
  hideLabel,
  isSelected,
  ...props
}: any) => {
  return (
    <button
      className={"toolbar-btn" + (isSelected ? " toolbar-btn--selected" : "")}
      {...props}
    >
      <div className="toolbar-btn__icon">{icon}</div>
      {!hideLabel && <div className="toolbar-btn__preview">{label}</div>}
    </button>
  );
};
