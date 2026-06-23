import ImageCard from "../components/ImageCard/ImageCard";
import sheet from "../assets/balanceSheet.png";
import summary from "../assets/gstSummary.png";
const Reports = () => {
  return (
    <div className="mt-10 w-[90%] md:w-[80%] m-auto flex flex-col items-center justify-center gap-5">
      <div className="reportText">
        <h1 className="font-medium text-4xl text-(--text-primary) text-center">
          Powerful Bussiness Reports
        </h1>
        <p className="text-sm text-(--text-muted) text-center mt-1">
          Gain insights with detailed financial reports
        </p>
      </div>
      <div className="imagesCards flex flex-wrap items-center justify-center">
        <ImageCard srcImage={sheet} text="Smart Legder Balance Sheet" />
        <ImageCard srcImage={summary} text="Smart Legder GST Summary" />
      </div>
    </div>
  );
};

export default Reports;
