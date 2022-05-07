import "./Loader.css";

export function Loader() {
  return (
    <div className="loader__wrapper">
      <div className="loader">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
    </div>
  );
}
