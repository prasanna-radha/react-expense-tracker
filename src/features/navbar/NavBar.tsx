import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import ExpenseStore from "../../app/stores/expenseStore";

const NavBar: React.FC = () => {
  const expenseStore = useContext(ExpenseStore);
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
            onClick={expenseStore.openCreateForm}
            positive
            content="Create Expense" >
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);