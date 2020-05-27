import { Table } from 'semantic-ui-react';
import React from 'react';

const SignatureHistoryTable = ({ history, campaign }) => {
  if (!(campaign in history)) {
    return <p>Noch keine Historie für dieses Bundesland</p>;
  }

  return (
    <Table celled definition>
      <Table.Header>
        <Table.HeaderCell>Tag</Table.HeaderCell>
        <Table.HeaderCell>Unterschriftendownloads</Table.HeaderCell>
        <Table.HeaderCell>
          User*innen, die Unterschriften eingetragen haben
        </Table.HeaderCell>
        <Table.HeaderCell>Angekommene Unterschriften</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {history[campaign].map(element => (
          <Table.Row key={element.day}>
            <Table.Cell>{element.day}</Table.Cell>
            <Table.Cell>{element.downloads}</Table.Cell>
            <Table.Cell>{element.scans}</Table.Cell>
            <Table.Cell>{element.received}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SignatureHistoryTable;
