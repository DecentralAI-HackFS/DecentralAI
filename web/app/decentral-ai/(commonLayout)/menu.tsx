import classNames from 'classnames';
import Link from 'next/link';

interface MenuProps {
  items: { value: string; name: string; path: string }[];
  activeValue?: string;
}

const menu = ({ items, activeValue }: MenuProps) => {
  return (
    <ul className="flex flex-col gap-1 px-[6px] text-sm text-gray-700">
      {items.map((item) => (
        <Link key={item.value} href={item.path}>
          <li
            className={classNames(
              'rounded-md px-[10px] py-2 hover:bg-[#F3F4F6] transition',
              {
                'bg-[#F3F4F6]': activeValue === item.value,
              }
            )}
          >
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default menu;
