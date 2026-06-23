const TopLogoBar = () => {
  return (
    <div className="fixed top-0 z-999 bg-(--bg-dark-start) w-full flex items-center h-20 border border-(--bg-dark-end)">
      <div className="p-3">
        <img className="object-cover" src="/logo.png" alt="SmartLedger Logo" />
      </div>
    </div>
  );
};

export default TopLogoBar;
