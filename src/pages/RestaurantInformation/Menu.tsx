import IMenu from '../../interfaces/IMenu';

interface IProps {
  menuItem: IMenu;
}

const Menu = ({ menuItem }: IProps) => {
  return (
    <div className="menu-item mx-4 my-4 border-[#ECECEC] border-[1px] rounded-lg h-32 flex justify-between items-center ">
      <div className="text-center grow">
        <div className="text-base">{menuItem.name}</div>
        <div className="border-b-[#ECECEC] border-b-[1px]  mx-4 my-3"></div>
        <div className="item-price">{menuItem.price} KM</div>
      </div>

      <div className="item-image">
        <img
          className="h-20 w-20 object-cover rounded-lg mr-4"
          src={menuItem.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Menu;
