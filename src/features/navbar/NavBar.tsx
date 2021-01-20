import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
  submitting: boolean;
}

const NavBar: React.FC<IProps> = ({ openCreateForm, submitting }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header >
          <Icon name='balance scale' size="big" outline />
          Expense Tracker
        </Menu.Item>
        <Menu.Item name='Expenses' />
        <Menu.Item>
          <Button
            onClick={openCreateForm}
            positive
            content="Create Expense" >
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;