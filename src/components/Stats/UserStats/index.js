import React, { useMemo } from 'react';
import { Header, Table, Loader } from 'semantic-ui-react';
import { useMunicipalitiesStats } from '../../../hooks/api/getMunicipalitiesStats';
import { numberWithDots } from '../../../utils';

const AGS_BERLIN = '11000000';
const AGS_BREMEN = '04011000';
const AGS_HAMBURG = '02000000';

const UserStats = () => {
  const stats = useMunicipalitiesStats();

  return (
    <>
      <Header color="orange">Anzahl User*innen</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <UserStatsTable stats={stats} />}
    </>
  );
};

const UserStatsTable = ({ stats: { data } }) => {
  const { signups: usersBerlinCount } = useMemo(
    () => data.municipalities.find(({ ags }) => ags === AGS_BERLIN),
    [data]
  );

  const { signups: usersBremenCount } = useMemo(
    () => data.municipalities.find(({ ags }) => ags === AGS_BREMEN),
    [data]
  );

  const { signups: usersHamburgCount } = useMemo(
    () => data.municipalities.find(({ ags }) => ags === AGS_HAMBURG),
    [data]
  );

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User*innen gesamt</Table.HeaderCell>
          <Table.HeaderCell>User*innen Berlin</Table.HeaderCell>
          <Table.HeaderCell>User*innen Bremen</Table.HeaderCell>
          <Table.HeaderCell>User*innen Hamburg</Table.HeaderCell>
          <Table.HeaderCell>Gemeinde-Anmeldungen</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{numberWithDots(data.summary.users)}</Table.Cell>
          <Table.Cell>{numberWithDots(usersBerlinCount)}</Table.Cell>
          <Table.Cell>{numberWithDots(usersBremenCount)}</Table.Cell>
          <Table.Cell>{numberWithDots(usersHamburgCount)}</Table.Cell>
          <Table.Cell>
            {numberWithDots(data.summary.users - data.summary.addedUsers)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default UserStats;
