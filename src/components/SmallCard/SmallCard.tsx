interface CardProps {
  icon: any;
  heading: string;
  text: string;
}
const SmallCard = ({ icon, heading, text }: CardProps) => {
  return (
    <div className="card-gradient w-80 rounded-2xl flex items-center gap-3 p-3">
      {icon}
      <div className="card-content flex items-center justify-center flex-col">
        <h3 className="text-[20px] font-bold text-center text-(--text-primary)">
          {heading}
        </h3>
        <p className="text-[14px] text-center text-(--text-muted)">{text}</p>
      </div>
    </div>
  );
};

export default SmallCard;
