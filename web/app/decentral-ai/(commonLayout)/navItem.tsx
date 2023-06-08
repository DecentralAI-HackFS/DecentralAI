import cn from "classnames";

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const navItem = ({ children, active, onClick }: NavItemProps) => {
  return (
    <div
      className={cn(
        "p-2 w-10 h-10 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100",
        {
          "bg-gray-100": active,
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default navItem;
