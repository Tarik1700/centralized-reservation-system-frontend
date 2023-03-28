import IMenu from './IMenu';

export default interface IRestaurantDetails {
  name: string;
  address: string;
  description: string;
  menu: IMenu[];
  images: string[];
}
