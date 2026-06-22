import { Link } from "react-router-dom";
import banner from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className="mt-21 flex md:flex-row flex-col justify-center gap-10">
      <div className="bannerContent flex flex-col items-center justify-center">
        <h1 className="text-[48px] text-center">Accounting For Web</h1>
        <p className="text-(--text-muted) text-center">
          Cloud-based ERP for Accounting,Inventory & More.
        </p>
        <div className="bannerButtons flex gap-3 items-center mt-5">
          <Link to="/login">
            <button className="bg-linear-to-r from-orange-700 via-orange-500 to-orange-400 border border-orange-300 cursor-pointer duration-500 ease-in-out   px-4 py-2 rounded">
              Get Started
            </button>
          </Link>
          <Link to="#">
            <button className="border border-(--text-primary)  px-4 py-2 rounded cursor-pointer">
              Watch Demo
            </button>
          </Link>
        </div>
      </div>
      <div className="bannerImage h-120 p-10 perspective-[1000px]">
        <img
          src={banner}
          alt="Smart Ledger Banner"
          className="w-full h-full  transform-3d  rotate-x-15 -rotate-y-15 shadow-2xl rounded-xl transition-transform duration-500 hover:rotate-x-12"
        />
      </div>
    </div>
  );
};

export default Banner;
