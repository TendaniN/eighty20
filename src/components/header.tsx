import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar as BaseNavbar,
} from "flowbite-react";
import { useSelector } from "state/index";
import { HiUserCircle, HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <BaseNavbar fluid className="bg-white dark:bg-white text-gray-900">
      <div className="flex ml-auto">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              className="mr-2"
              img={user && user.photoURL ? user.photoURL : HiUserCircle}
              rounded
            />
          }
          className="bg-slate-500 dark:bg-slate-500"
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.displayName}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/profile">
            Profile
          </DropdownItem>
          <DropdownItem as={Link} to="/password-reset">
            Password Reset
          </DropdownItem>
        </Dropdown>
        <Dropdown
          arrowIcon={false}
          inline
          className="bg-slate-500 dark:bg-slate-500"
          label={<Avatar alt="" img={HiMenu} />}
        >
          <DropdownItem as={Link} to="/">
            Home
          </DropdownItem>
          <DropdownItem as={Link} to="/logout">
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </BaseNavbar>
  );
};
