import "./Typography.css";

export const Typography = ({ tag, variant, children, ...props }) => {
  const Component = tag;

  return (
    <Component className={"typography typography--" + variant} {...props}>
      {children}
    </Component>
  );
};
