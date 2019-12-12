import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Nav = () => {
  return (
    <Menu vertical fixed="left" icon="labeled" size="small">
      <Menu.Item as="a">
        <Icon name="list alternate" />
        Unterschriften scannen
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
