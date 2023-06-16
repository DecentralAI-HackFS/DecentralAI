import classNames from 'classnames';
import Link from 'next/link';

import Footer from './Footer';
import Header from './Header';
import KeyFeaturesSection from './KeyFeaturesSection';
import classes from './style/index.module.scss';

const apps = [
  {
    name: 'Alliance Community',
    memberCount: 3,
    appId: 'e8a5bec5-4d61-47dd-a5f3-53177c947a8a',
  },
  {
    name: 'News Content Writing',
    memberCount: 6,
    appId: '6cf6e657-eb1a-4db5-82cc-e203901e5b70',
  },
  {
    name: 'Decentralized Finance (DeFi)',
    memberCount: 4,
    appId: '3f61243d-de57-43e5-9b3e-7a3813bb8da5',
  },
  {
    name: 'Blockchain Technology in Healthcare',
    memberCount: 9,
    appId: 'd4555337-18f8-489a-82a4-3503e2b30db5',
  },
  {
    name: 'NFT Authentication and Security',
    memberCount: 3,
    appId: '731d80ae-dfe5-467f-a494-7a64bafa5371',
  },
  {
    name: 'NFT Gaming',
    memberCount: 11,
    appId: 'cc0618f3-ff0c-4041-993d-cc5d44d62bef',
  },
];

const Home = () => {
  return (
    <div className="bg-[#1B2029]">
      <div className="sticky top-0 z-10 bg-[#1B2029]">
        <Header />
      </div>
      <div className="flex flex-col items-center gap-52 pb-52 pt-24">
        <div className="flex w-[864px] flex-col items-center justify-start gap-12">
          <div className="relative flex shrink-0 grow-0 items-start justify-center self-stretch pl-[39.310001373291016px] pr-[40.689998626708984px]">
            <p
              className={classNames(
                'shrink-0 grow-0 text-center text-[56px] font-bold',
                classes.title
              )}
            >
              <span className="shrink-0 grow-0 text-center text-[56px] font-bold">
                Unleash the Power of AI with
              </span>
              <br />
              <span className="shrink-0 grow-0 text-center text-[56px] font-bold">
                Decentralization
              </span>
            </p>
          </div>
          <div className="relative flex shrink-0 grow-0 flex-col items-center justify-start gap-10 self-stretch">
            <div className="relative h-[791.5px] w-[865.07px] shrink-0 grow-0">
              <img src="/images/home/banner.png" alt="banner" />
            </div>
            <div className="relative flex w-[640px] shrink-0 grow-0 items-start justify-start opacity-90">
              <p className="w-[640px] grow text-center text-[22px] text-[#f7fafc]">
                DecentralAI is a simple and end to end generative AI no-coding
                platform to create community owned AI applications
              </p>
            </div>
            <Link href="/decentral-ai">
              <div
                className="relative flex shrink-0 grow-0 cursor-pointer items-start justify-start rounded-[10px] bg-[#7a8cd6] pb-[16.799999237060547px] pl-6 pr-[23.470001220703125px] pt-[15px]"
                style={{
                  boxShadow: '0px 0px 5px 0 rgba(0,0,0,0.2)',
                  background:
                    'linear-gradient(90deg, #A642F5 0%, #4C83F6 99.99%, #AB9AEC 100%), #7A8CD6',
                }}
              >
                <p className="shrink-0 grow-0 text-left text-xl font-bold text-white">
                  Get Started
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-16">
          <div className="relative flex shrink-0 grow-0 items-start justify-center gap-2.5 self-stretch">
            <p className="w-[928px] shrink-0 grow-0 text-center text-[40px] font-bold text-[#f7fafc]">
              DecentralAI provides one stop solution to create DAO governed
              generative AI solutions
            </p>
          </div>
          <div className="flex w-[1152px] shrink-0 grow-0 items-start justify-between">
            <div className="relative flex w-[360px] shrink-0 grow-0 flex-col items-end justify-start gap-6 rounded-[20px] bg-white/5 px-10 pb-8 pt-10">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                <p className="shrink-0 grow-0 text-left text-[22px] font-bold text-[#f7fafc]">
                  Data Ingestion
                </p>
                <div className="relative flex shrink-0 grow-0 items-start justify-start self-stretch opacity-90">
                  <p className="w-[280px] grow text-left text-base text-[#f7fafc]">
                    Connect AI with community data from web2 and web3 sources.
                  </p>
                </div>
              </div>
              <svg
                width={56}
                height={57}
                viewBox="0 0 56 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-14 w-14 shrink-0 grow-0"
                preserveAspectRatio="none"
              >
                <circle
                  cx={12}
                  cy="12.75"
                  r="4.25"
                  stroke="white"
                  stroke-width="1.5"
                />
                <circle
                  cx={12}
                  cy="44.75"
                  r="4.25"
                  stroke="white"
                  stroke-width="1.5"
                />
                <circle
                  cx={45}
                  cy="27.75"
                  r="4.25"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M41 28.75L27.7347 28.75L27.7347 12.75L16 12.75"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M41 28.75L27.7347 28.75L27.7347 44.75L16 44.75"
                  stroke="white"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div className="relative flex w-[360px] shrink-0 grow-0 flex-col items-end justify-start gap-6 rounded-[20px] bg-white/5 px-10 pb-8 pt-10">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                <p className="shrink-0 grow-0 text-left text-[22px] font-bold text-[#f7fafc]">
                  AI Governance
                </p>
                <div className="relative flex shrink-0 grow-0 items-start justify-start self-stretch opacity-90">
                  <p className="w-[280px] grow text-left text-base text-[#f7fafc]">
                    Infrastructure that supports decentralization of AI
                    governance.
                  </p>
                </div>
              </div>
              <svg
                width={56}
                height={57}
                viewBox="0 0 56 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-14 w-14 shrink-0 grow-0"
                preserveAspectRatio="none"
              >
                <path
                  d="M20.1644 14.024L27.6438 9.75L35.1233 14.024M20.1644 14.024V23.1062L27.6438 27.3801L35.1233 23.1062V14.024M20.1644 14.024L27.6438 18.2979L35.1233 14.024"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M27.6438 18.298V27.3802"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M20.1644 35.3938L27.6438 31.1199L35.1233 35.3938M20.1644 35.3938V44.476L27.6438 48.75L35.1233 44.476V35.3938M20.1644 35.3938L27.6438 39.6678L35.1233 35.3938"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M27.6438 39.6678V48.75"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M38.3287 24.7089L45.8082 20.4349L53.2876 24.7089M38.3287 24.7089V33.7911L45.8082 38.0651L53.2876 33.7911V24.7089M38.3287 24.7089L45.8082 28.9829L53.2876 24.7089"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M45.8082 28.9829V38.0651"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M23.9041 20.9692L16.9589 25.2432"
                  stroke="white"
                  stroke-width="1.06849"
                />
                <path
                  d="M41 32.1884L34.0548 36.4623"
                  stroke="white"
                  stroke-width="1.06849"
                />
                <path
                  d="M12.6849 31.1199L19.6301 35.3938"
                  stroke="white"
                  stroke-width="1.06849"
                />
                <path
                  d="M31.9178 20.4349L38.863 24.7089"
                  stroke="white"
                  stroke-width="1.06849"
                />
                <path
                  d="M2 24.7089L9.47945 20.4349L16.9589 24.7089M2 24.7089V33.7911L9.47945 38.0651L16.9589 33.7911V24.7089M2 24.7089L9.47945 28.9829L16.9589 24.7089"
                  stroke="white"
                  stroke-width="1.60274"
                />
                <path
                  d="M9.47945 28.9829V38.0651"
                  stroke="white"
                  stroke-width="1.60274"
                />
              </svg>
            </div>
            <div className="relative flex w-[360px] shrink-0 grow-0 flex-col items-end justify-start gap-6 rounded-[20px] bg-white/5 px-10 pb-8 pt-10">
              <div className="relative flex shrink-0 grow-0 flex-col items-start justify-start gap-6 self-stretch">
                <p className="shrink-0 grow-0 text-left text-[22px] font-bold text-[#f7fafc]">
                  AI Building
                </p>
                <div className="relative flex shrink-0 grow-0 items-start justify-start self-stretch opacity-90">
                  <p className="w-[280px] grow text-left text-base text-[#f7fafc]">
                    Complete AI tooling integration powered with web3
                    infrastructure.
                  </p>
                </div>
              </div>
              <svg
                width={56}
                height={57}
                viewBox="0 0 56 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-14 w-14 shrink-0 grow-0"
                preserveAspectRatio="none"
              >
                <circle cx={10} cy="15.75" r={2} fill="white" />
                <circle cx={10} cy="15.75" r={2} fill="white" />
                <circle cx={10} cy="15.75" r={2} fill="white" />
                <circle cx={6} cy="26.75" r={2} fill="white" />
                <circle cx={6} cy="26.75" r={2} fill="white" />
                <circle cx={6} cy="26.75" r={2} fill="white" />
                <circle cx={18} cy="23.75" r={2} fill="white" />
                <circle cx={18} cy="23.75" r={2} fill="white" />
                <circle cx={18} cy="23.75" r={2} fill="white" />
                <circle cx={35} cy="20.75" r={2} fill="white" />
                <circle cx={35} cy="20.75" r={2} fill="white" />
                <circle cx={35} cy="20.75" r={2} fill="white" />
                <circle cx={15} cy={31} r={2} fill="white" />
                <circle cx={15} cy={31} r={2} fill="white" />
                <circle cx={15} cy={31} r={2} fill="white" />
                <circle cx={25} cy="38.75" r={2} fill="white" />
                <circle cx={25} cy="38.75" r={2} fill="white" />
                <circle cx={25} cy="38.75" r={2} fill="white" />
                <circle cx={19} cy={48} r={2} fill="white" />
                <circle cx={19} cy={48} r={2} fill="white" />
                <circle cx={19} cy={48} r={2} fill="white" />
                <circle cx={10} cy={38} r={2} fill="white" />
                <circle cx={10} cy={38} r={2} fill="white" />
                <circle cx={10} cy={38} r={2} fill="white" />
                <circle cx={32} cy="8.75" r={2} fill="white" />
                <circle cx={32} cy="8.75" r={2} fill="white" />
                <circle cx={32} cy="8.75" r={2} fill="white" />
                <circle cx={43} cy="12.75" r={2} fill="white" />
                <circle cx={43} cy="12.75" r={2} fill="white" />
                <circle cx={43} cy="12.75" r={2} fill="white" />
                <circle cx={50} cy="20.75" r={2} fill="white" />
                <circle cx={50} cy="20.75" r={2} fill="white" />
                <circle cx={50} cy="20.75" r={2} fill="white" />
                <circle cx={47} cy={30} r={2} fill="white" />
                <circle cx={47} cy={30} r={2} fill="white" />
                <circle cx={47} cy={30} r={2} fill="white" />
                <circle cx={39} cy="35.75" r={2} fill="white" />
                <circle cx={39} cy="35.75" r={2} fill="white" />
                <circle cx={39} cy="35.75" r={2} fill="white" />
                <circle cx={20} cy="10.75" r={2} fill="white" />
                <path
                  d="M20 10.75L32 8.75M20 10.75L35.5 20.75M20 10.75L18.5 23.75M20 10.75C19.6 10.75 13.1667 14.0833 10 15.75M32 8.75L43 12.75M32 8.75L35.5 20.75M43 12.75L50 20.75L47 30.5M43 12.75L35.5 20.75M47 30.5L39 35.75M47 30.5L35.5 20.75M39 35.75L35.5 20.75M39 35.75L15.5 31.5M35.5 20.75L18.5 23.75M35.5 20.75L15.5 31.5M18.5 23.75L15.5 31.5"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M18.5 24.25L10 15.75L6 26.75L10 38"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M19 48L10 38L15 31.5L19 48ZM19 48L25 38.75L39 35.75"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path d="M25 38.75L15 31.5" stroke="white" stroke-width="1.5" />
                <path d="M18 23.75L6 26.75" stroke="white" stroke-width="1.5" />
                <path d="M6 26.5L15 31.5" stroke="white" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <KeyFeaturesSection />
        <div className="flex w-[1152px] flex-col items-center justify-start gap-10">
          <div className="flex shrink-0 grow-0 flex-col items-start justify-start gap-16">
            <div className="relative flex shrink-0 grow-0 flex-col items-center justify-start gap-6">
              <div className="relative flex w-[1152px] shrink-0 grow-0 items-start justify-center gap-2.5">
                <p
                  className={classNames(
                    classes.title,
                    'w-[1152px] grow text-center text-[40px] font-bold'
                  )}
                >
                  Join the community
                </p>
              </div>
              <p className="w-[859px] shrink-0 grow-0 text-center text-[22px] text-white">
                Learn from others, share your work, and extend your tool set
                with a diverse group of data contributors, data wizards, storage
                provider, and many more from around the world.
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-x-5 gap-y-8">
            {apps.map((app) => (
              <Link key={app.name} href={`/decentral-ai/overview/${app.appId}`}>
                <div className="flex w-[296px] flex-col gap-2.5 rounded-[20px] bg-white/5 px-2.5 py-4">
                  <div className="flex w-full gap-4">
                    <div className="flex h-[61px] w-[63px] shrink-0 items-center justify-center rounded-2xl bg-[#feead5] text-4xl">
                      🤖
                    </div>
                    <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                      <p className="truncate text-xl font-bold text-[#f7fafc]">
                        {app.name}
                      </p>
                      <p className="shrink-0 grow-0 text-left text-base text-[#f7fafc]">
                        {app.memberCount} members
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/decentral-ai/explore/apps">
            <div
              className="relative flex shrink-0 grow-0 cursor-pointer items-start justify-start rounded-[10px] bg-[#7a8cd6] pb-[16.799999237060547px] pl-6 pr-[23.470001220703125px] pt-[15px]"
              style={{
                boxShadow: '0px 0px 5px 0 rgba(0,0,0,0.2)',
                background:
                  'linear-gradient(90deg, #A642F5 0%, #4C83F6 99.99%, #AB9AEC 100%), #7A8CD6',
              }}
            >
              <p className="shrink-0 grow-0 text-left text-xl font-bold text-white">
                Explore
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
