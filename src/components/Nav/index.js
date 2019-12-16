import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useSignOut } from '../../hooks/authentication';

const Nav = () => {
  const signOut = useSignOut();

  return (
    <Menu vertical fixed="left" icon="labeled" size="small">
      <Menu.Item as="a">
        <Icon name="list alternate" />
        Unterschriften scannen
      </Menu.Item>
      <Menu.Item as="a" onClick={() => signOut()}>
        <Icon color="red" name="sign-out" />
        Abmelden
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
