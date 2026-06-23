import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <div className="mt-10 w-[90%] md:w-[80%] m-auto flex flex-col items-center justify-center gap-5 p-5">
      <div className="newsletterContent">
        <h1 className="font-medium text-4xl text-(--text-primary) text-center">
          Get Started with SmartLedger Today!
        </h1>
        <p className="text-sm text-(--text-muted) text-center mt-1">
          Sign up now and streamline your bussiness operations
        </p>
      </div>
      <div className="newsletterButtons flex flex-wrap gap-5">
        <Link to="/register">
          <button className="bg-linear-to-r from-orange-700 via-orange-500 to-orange-400 border border-orange-300 cursor-pointer duration-500 ease-in-out   px-4 py-2 rounded">
            Join for Free
          </button>
        </Link>
        <Link to="#">
          <button className="border border-(--text-primary)  px-4 py-2 rounded cursor-pointer">
            Git Hub
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Newsletter;
