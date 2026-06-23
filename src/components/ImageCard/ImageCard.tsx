const ImageCard = ({ srcImage, text }: any) => {
  return (
    <div className="imageCard">
      <img src={srcImage} alt={text} className="w-90" />
    </div>
  );
};

export default ImageCard;
