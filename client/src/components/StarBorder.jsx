const StarBorder = ({
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  fontSize = "16px",
  children,
  handleClick = () => null,
  type = "button",
  ...rest
}) => {
  return (
    <button type={type} onClick={handleClick} className={className}>
      <div
        className={`relative inline-block cursor-pointer overflow-hidden rounded-[20px]`}
        style={{
          padding: `${thickness}px 0`,
          ...rest.style,
        }}
        {...rest}
      >
        <div
          className="animate-star-movement-bottom absolute right-[-250%] bottom-[-11px] z-0 h-[50%] w-[300%] rounded-full opacity-70"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div
          className="animate-star-movement-top absolute top-[-10px] left-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div style={{ fontSize }} className="relative z-1 rounded-[20px] border border-gray-800 bg-gradient-to-b from-black to-gray-900 px-[20px] py-[10px] text-center text-[16px] text-white">
          {children}
        </div>
      </div>
    </button>
  );
};

export default StarBorder;
