/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { Menu } from 'components/ui';
import MenuCollapse from 'components/ui/Menu/MenuCollapse';
import { themeConfig } from 'configs/theme.config';
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from 'constants/navigation.constant';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useMenuActive from 'utils/hooks/useMenuActive';
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem';
import VerticalMenuIcon from './VerticalMenuIcon';
import VerticalSingleMenuItem from './VerticalSingleMenuItem';

const { MenuGroup } = Menu;

function VerticalMenuContent(props) {
  const {
    navMode = themeConfig.navMode,
    collapsed,
    routeKey,
    navigationTree = [],
    userAuthority = [],
    onMenuItemClick,
    direction = themeConfig.direction,
  } = props;

  const { t } = useTranslation();

  const [defaulExpandKey, setDefaulExpandKey] = useState([]);

  const { activedRoute } = useMenuActive(navigationTree, routeKey);

  useEffect(() => {
    if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
      setDefaulExpandKey([activedRoute?.parentKey]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activedRoute?.parentKey]);

  const handleLinkClick = () => {
    onMenuItemClick?.();
  };

  const getNavItem = (nav) => {
    if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
      return (
        <VerticalSingleMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={handleLinkClick}
          sideCollapsed={collapsed}
          userAuthority={userAuthority}
          direction={direction}
        />
      );
    }

    if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
      return (
        <VerticalCollapsedMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={onMenuItemClick}
          sideCollapsed={collapsed}
          userAuthority={userAuthority}
          direction={direction}
        />
      );
    }

    if (nav.type === NAV_ITEM_TYPE_TITLE) {
      if (nav.subMenu.length > 0) {
        return (
          <MenuCollapse
            label={
              <>
                <VerticalMenuIcon icon={nav.icon} />
                <span className="cursor-default">
                  <Trans
                    i18nKey={t(nav.translateKey) || nav.title}
                    defaults={nav.title}
                  />
                </span>
              </>
            }
            key={nav.key}
            eventKey={nav.key}
            expanded={false}
            className="mb-2"
            last
          >
            {nav.subMenu.map((subNav) =>
              subNav.subMenu.length > 0 ? (
                <VerticalCollapsedMenuItem
                  key={subNav.key}
                  nav={subNav}
                  onLinkClick={onMenuItemClick}
                  sideCollapsed={collapsed}
                  userAuthority={userAuthority}
                  direction={direction}
                />
              ) : (
                <VerticalSingleMenuItem
                  key={subNav.key}
                  nav={subNav}
                  onLinkClick={onMenuItemClick}
                  sideCollapsed={collapsed}
                  userAuthority={userAuthority}
                  direction={direction}
                />
              ),
            )}
          </MenuCollapse>
        );
      }
      <MenuGroup label={nav.title} />;
    }
  };

  return (
    <Menu
      className="px-4 pb-4 "
      variant={navMode}
      sideCollapsed={collapsed}
      defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
      defaultExpandedKeys={defaulExpandKey}
    >
      {navigationTree.map((nav) => getNavItem(nav))}
    </Menu>
  );
}

VerticalMenuContent.propTypes = {
  navMode: PropTypes.oneOf(['light', 'dark', 'themed', 'transparent']),
  collapsed: PropTypes.bool,
  routeKey: PropTypes.string,
  navigationTree: PropTypes.array,
  userAuthority: PropTypes.array,
  direction: PropTypes.oneOf(['rtl', 'ltr']),
};

export default VerticalMenuContent;
