import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-[#1b2029] px-16 py-6">
      <div className="relative flex shrink-0 grow-0 cursor-pointer items-center gap-2">
        <img
          className="h-6 w-6 bg-contain"
          src="/images/common/logo.png"
          alt="logo"
        />
        <p className="shrink-0 grow-0 text-left text-xl font-medium text-[#f7fafc]">
          DecentralAI
        </p>
      </div>
      <div className="relative flex shrink-0 grow-0 items-start justify-start gap-6">
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          Documentation
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          Discord
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          GitHub
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          Twitter
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          Blog
        </p>
        <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
          Products
        </p>
      </div>
      <Link href="/decentral-ai">
        <div className="relative flex shrink-0 grow-0 items-start justify-start gap-2.5 rounded-[100px] border border-[#f7fafc] px-4">
          <p className="shrink-0 grow-0 cursor-pointer text-left text-base font-bold text-[#f7fafc]">
            Get Started
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
