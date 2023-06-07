import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { nanoid } from 'nanoid';

const menu = [
  {
    key: nanoid(),
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    key: nanoid(),
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    key: nanoid(),
    title: 'Account',
    icon: <FaRegChartBar />,
    childrens: [
      {
        key: nanoid(),
        title: 'Profile',
        path: '/profile',
      },
      {
        key: nanoid(),
        title: 'Edit Profile',
        path: '/edit-profile',
      },
    ],
  },
  {
    key: nanoid(),
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
];

export default menu;
