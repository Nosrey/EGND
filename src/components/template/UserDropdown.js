import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown } from 'components/ui';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import useAuth from 'utils/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { getUser } from 'services/Requests';
import { setUser } from 'store/auth/userSlice';

const dropdownItemList = [];

export function UserDropdown({ className }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.user.id);
  const currentState = useSelector((state) => state.auth.user);

  const [info, setInfo] = useState();

  useEffect(() => {
    getUser(userInfo).then((data) => {

      let currencyInfo = data?.businessInfo[0]?.currency || "$";

      const newState = {
        ...currentState,
        currency: currencyInfo,
      };
      
      setInfo({ nombre: data.businessName, email: data.mail });
      
      dispatch(setUser(newState));
    });
  }, []);

  const { signOut } = useAuth();

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{info?.nombre}</div>
        <div className="font-bold">{info?.email}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar shape="circle" icon={<HiOutlineUser />} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {info?.nombre}
              </div>
              <div className="text-xs">{info?.email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1"
          >
            <Link className="flex gap-2 items-center" to={item.path}>
              <span className="text-xl opacity-50">{item.icon}</span>
              <span className="cursor-default">{item.label}</span>
            </Link>
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item variant="divider" /> */}
        <Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span className="cursor-default">Cerrar Sesión</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default withHeaderItem(UserDropdown);
