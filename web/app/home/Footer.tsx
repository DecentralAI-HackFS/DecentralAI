const Footer = () => {
  return (
    <div className="relative flex flex-col items-center justify-start gap-6 bg-[#1a1d22] px-16 py-20">
      <div className="relative flex shrink-0 grow-0 items-start justify-start gap-6">
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          Documentation
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          Discord
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          GitHub
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          Twitter
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          Blog
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-white">
          Products
        </p>
      </div>
      <p className="shrink-0 grow-0 text-left text-base font-medium text-[#f7f9fc]">
        ©DecentralAI. 2023. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
