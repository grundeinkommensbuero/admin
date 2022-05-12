import React from 'react';
import { Header, Loader, Table } from 'semantic-ui-react';
import { useCollectors } from '../../hooks/api/getCollectors';
import { formatDate } from '../../utils';
import './index.css';

const Collectors = () => {
  const collectors = useCollectors();

  if (!collectors) {
    return <Loader active inline="centered" />;
  }

  return (
    <>
      <Header color="orange">Sammler*innen, die generell wollen</Header>
      <CollectorsTable collectors={collectors.inGeneral} />

      <Header color="orange">Sammler*innen, die für ein Event wollen</Header>
      {collectors.meetups.map((meetup) => (
        <>
          <Header as="h4" className="heading">
            {formatDate(meetup.date)}, {meetup.location}
          </Header>
          <CollectorsTable collectors={meetup.collectors} />
        </>
      ))}
    </>
  );
};

const CollectorsTable = ({ collectors }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>E-Mail</Table.HeaderCell>
        <Table.HeaderCell>Telefonnummer</Table.HeaderCell>
        <Table.HeaderCell>PLZ</Table.HeaderCell>
        <Table.HeaderCell>Frage/Kommentar</Table.HeaderCell>
        <Table.HeaderCell>Erstellt am</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {collectors.map((user, index) => (
        <Table.Row key={index}>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.phoneNumber}</Table.Cell>
          <Table.Cell>{user.zipCode}</Table.Cell>
          <Table.Cell>{user.wantsToCollect.question}</Table.Cell>
          <Table.Cell>{formatDate(user.wantsToCollect.createdAt)}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default Collectors;
