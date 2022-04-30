import "./ZoomSelect.css";

export const ZoomSelect = ({ onChange, options, value, ...props }) => {
  return (
    <div className="zoom-select" {...props}>
      <div className="zoom-select__label">Zoom</div>
      <svg
        className="zoom-select__-"
        width="1"
        height="36"
        viewBox="0 0 1 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0V36" stroke="white" strokeOpacity="0.2" />
      </svg>
      <select value={value} className="zoom-select__value" onChange={onChange}>
        {options.map((o) => {
          return <option key={o.value} value={o.value} label={o.label}>{o.label}</option>;
        })}
      </select>
    </div>
  );
};
