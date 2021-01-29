import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useSignOut } from '../../hooks/authentication';
import { Link } from 'react-router-dom';

const Nav = () => {
  const signOut = useSignOut();

  return (
    <Menu vertical fixed="left" icon="labeled" size="small">
      <Menu.Item as={Link} to="/scan">
        <Icon name="list alternate outline" />
        Unterschriften scannen
      </Menu.Item>

      <Menu.Item as={Link} to="/stats">
        <Icon name="chart bar outline" />
        Statistiken
      </Menu.Item>

      <Menu.Item as={Link} to="/donations">
        <Icon name="money bill alternate outline" />
        Spenden
      </Menu.Item>

      <Menu.Item as={Link} to="/user-info">
        <Icon name="address book outline" />
        User*innen-Suche
      </Menu.Item>

      <Menu.Item as="div" onClick={() => signOut()}>
        <Icon color="red" name="sign-out" />
        Abmelden
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
