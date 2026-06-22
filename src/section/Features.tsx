import SmallCard from "../components/SmallCard/SmallCard";
import { LuNotebookPen, LuDiamondPercent } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
const Features = () => {
  return (
    <div className="featureCards mt-5 w-[90%] md:w-[80%] m-auto flex items-center justify-center flex-wrap gap-6">
      <SmallCard
        icon={<LuNotebookPen size={50} />}
        heading="Accounting Simplified"
        text="Fast keyboard driven entries"
      />
      <SmallCard
        icon={<MdOutlineInventory2 size={50} />}
        heading="Inventory Management"
        text="Track stock with ease."
      />
      <SmallCard
        icon={<LuDiamondPercent size={50} />}
        heading="GST & Compliance"
        text="GST ready reports"
      />
    </div>
  );
};

export default Features;
