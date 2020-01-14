import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useSignOut } from '../../hooks/authentication';
import { Link } from 'react-router-dom';

const Nav = () => {
  const signOut = useSignOut();

  return (
    <Menu vertical fixed="left" icon="labeled" size="small">
      <Link to="/scan">
        <Menu.Item as="a">
          <Icon name="list alternate outline" />
          Unterschriften scannen
        </Menu.Item>
      </Link>

      <Link to="/stats">
        <Menu.Item as="a">
          <Icon name="chart bar outline" />
          Statistiken
        </Menu.Item>
      </Link>

      <Menu.Item as="a" onClick={() => signOut()}>
        <Icon color="red" name="sign-out" />
        Abmelden
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
