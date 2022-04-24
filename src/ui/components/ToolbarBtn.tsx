import "./ToolbarBtn.css";

export const ToolbarBtn = ({ icon, label, isSelected, ...props }) => {
  return (
    <button
      className={"toolbar-btn" + (isSelected ? " toolbar-btn--selected" : "")}
      {...props}
    >
      <div className="toolbar-btn__icon">{icon}</div>
      <div className="toolbar-btn__preview">{label}</div>
    </button>
  );
};
