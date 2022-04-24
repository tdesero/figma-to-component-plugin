import "./Button.css";

export const Button = ({ children, variant, ...props }: any) => {
  const variantClass = variant ? " button--" + variant : "";

  return (
    <button className={"button" + variantClass} {...props}>
      <div className="button__title">{children}</div>
    </button>
  );
};
