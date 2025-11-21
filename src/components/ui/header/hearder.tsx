interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="h-16 bg-orange-400 px-3 rounded-md flex justify-between items-center text-white mb-4 overflow-hidden">
      <h2 className="text-base sm:text-xl font-semibold tracking-tight truncate max-w-[70%]">
        {title}
      </h2>
      {children && <div className="flex space-x-2">{children}</div>}
    </div>
  );
};

export default Header;
