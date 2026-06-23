import Banner from "../components/Banner/Banner";
import TopLogoBar from "../components/TopLogoBar/TopLogoBar";
import Features from "../section/Features";
import Newsletter from "../section/Newsletter";
import Reports from "../section/Reports";

const Landing = () => {
  return (
    <>
      <TopLogoBar />
      <Banner />
      <Features />
      <Reports />
      <Newsletter />
    </>
  );
};

export default Landing;
