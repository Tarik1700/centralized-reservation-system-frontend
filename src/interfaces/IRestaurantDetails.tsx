import IMenu from './IMenu';

export default interface IRestaurantDetails {
  id: string;
  name: string;
  address: string;
  description: string;
  menu: IMenu[];
  images: string[];
}
