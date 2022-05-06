export interface IMenuData {
  name: string;
  url: string;
  submenu?: IMenuData[];
}
const menuData: IMenuData[] = [
  { name: 'HOME', url: '/' },
  { name: 'ABOUT US', url: '/about' },
  { name: 'SHOP', url: '/shop' },
  {
    name: 'PRIVACY',
    url: '/privacy',
    submenu: [
      { name: 'Refund Policy', url: '/privacy/refund' },
      { name: 'Cookies', url: '/privacy/cookies' },
    ],
  },
  { name: 'CONTACT US', url: '/contact' },
];
export default menuData;
