import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

const Nav = () => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      vertical
      visible
      width="thin"
    >
      <Menu.Item as="a">
        <Icon name="list alternate" />
        Unterschriften scannen
      </Menu.Item>
    </Sidebar>
  );
};

export default Nav;
