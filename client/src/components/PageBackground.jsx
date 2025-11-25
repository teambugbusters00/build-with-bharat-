const PageBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">

      <div
        className="
          absolute inset-0 z-0
          bg-[url('/bg/bg.avif')]
          bg-size-[520px]
          opacity-[0.35]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
