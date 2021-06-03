import React, { useEffect, useMemo, useState } from 'react';
import { Header, Table, Loader, Dropdown } from 'semantic-ui-react';
import { useMunicipalitiesStats } from '../../../hooks/api/getMunicipalitiesStats';
import { getMunicipality } from '../../../hooks/api/getMunicipality';

const AGS_BERLIN = '11000000';
const AGS_BREMEN = '04011000';
const AGS_HAMBURG = '02000000';

const options = [
  {
    key: '100',
    text: 'Qualifizierte Gemeinden',
    value: '100',
  },
  {
    key: '90',
    text: 'Gemeinden zwischen 90% und 100%',
    value: '90',
  },
  {
    key: '80',
    text: 'Gemeinden zwischen 80% und 90%',
    value: '80',
  },
  {
    key: '70',
    text: 'Gemeinden zwischen 70% und 80%',
    value: '70',
  },
  {
    key: '60',
    text: 'Gemeinden zwischen 60% und 70%',
    value: '60',
  },
  {
    key: '50',
    text: 'Gemeinden zwischen 50% und 60%',
    value: '50',
  },
];

const UserStats = () => {
  const stats = useMunicipalitiesStats();
  const [chosenOption, setChosenOption] = useState(options[0].value);
  // Municipalities which should be detailed in the list component below,
  // dependant on the dropdown
  const [municipalitiesToList, setMunicipalitiesToList] = useState([]);
  console.log('chosenOption', chosenOption);
  useEffect(() => {
    if (stats?.data) {
      if (chosenOption === '100') {
        setMunicipalitiesToList(stats.data.qualifiedMunicipalities);
      } else if (chosenOption === '90') {
        setMunicipalitiesToList(stats.data.ninetyPercentMunicipalities);
      } else if (chosenOption === '80') {
        setMunicipalitiesToList(stats.data.eightyPercentMunicipalities);
      } else if (chosenOption === '70') {
        setMunicipalitiesToList(stats.data.seventyPercentMunicipalities);
      } else if (chosenOption === '60') {
        setMunicipalitiesToList(stats.data.sixtyPercentMunicipalities);
      } else if (chosenOption === '50') {
        setMunicipalitiesToList(stats.data.fiftyPercentMunicipalities);
      }
    }
  }, [chosenOption, stats]);

  return (
    <>
      <Header color="orange">Anzahl User*innen</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <UserStatsTable stats={stats} />}

      <Header color="orange">Gemeinden-Übersicht</Header>
      {!stats && <Loader active inline="centered" />}
      {stats && <MunicipalityStatsTable stats={stats} />}

      <Dropdown
        placeholder=""
        selection
        fluid
        search
        value={chosenOption}
        options={options}
        onChange={(event, { value }) => setChosenOption(value)}
        label="Kampagne"
      />

      <Header color="orange">
        {options.find((option) => option.value === chosenOption).text}
      </Header>
      {!stats && <Loader active inline="centered" />}
      {stats?.data && (
        <ListOfMunicipalities municipalities={municipalitiesToList} />
      )}
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
          <Table.Cell>
            {data.summary.users + data.summary.notIncludedUsers}
          </Table.Cell>
          <Table.Cell>{usersBerlinCount}</Table.Cell>
          <Table.Cell>{usersBremenCount}</Table.Cell>
          <Table.Cell>{usersHamburgCount}</Table.Cell>
          <Table.Cell>
            {data.summary.users - data.summary.addedUsers}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const MunicipalityStatsTable = ({ stats: { data } }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Qualifizierte Gemeinden</Table.HeaderCell>
          <Table.HeaderCell>Gemeinden mit 90%</Table.HeaderCell>
          <Table.HeaderCell>Gemeinden mit 80%</Table.HeaderCell>
          <Table.HeaderCell>Gemeinden mit 70%</Table.HeaderCell>
          <Table.HeaderCell>Gemeinden mit 60%</Table.HeaderCell>
          <Table.HeaderCell>Gemeinden mit 50%</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{data.qualifiedMunicipalities.length}</Table.Cell>
          <Table.Cell>{data.ninetyPercentMunicipalities.length}</Table.Cell>
          <Table.Cell>{data.eightyPercentMunicipalities.length}</Table.Cell>
          <Table.Cell>{data.seventyPercentMunicipalities.length}</Table.Cell>
          <Table.Cell>{data.sixtyPercentMunicipalities.length}</Table.Cell>
          <Table.Cell>{data.fiftyPercentMunicipalities.length}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const ListOfMunicipalities = ({ municipalities }) => {
  console.log('municipalities in ListOf', municipalities);
  const [mergedMunicipalities, setMergedMunicipalities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get data (name, goal, etc) for each municipality
  useEffect(() => {
    setLoading(true);

    Promise.all(
      municipalities.map(async (municipality) => {
        return getMunicipality(municipality.ags).then((data) => ({
          ...municipality,
          ...data,
        }));
      })
    ).then((result) => {
      const sortedMunicipalities = result.sort(
        (a, b) =>
          getPercent(b.current, b.goal, 1) - getPercent(a.current, a.goal, 1)
      );

      setMergedMunicipalities(sortedMunicipalities);
      setLoading(false);
    });
  }, [municipalities]);

  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Anmeldungen</Table.HeaderCell>
          <Table.HeaderCell>Einwohner*innen</Table.HeaderCell>
          <Table.HeaderCell>Prozent von Einwohner*innen</Table.HeaderCell>
          <Table.HeaderCell>Ziel</Table.HeaderCell>
          <Table.HeaderCell>Prozent vom Ziel</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mergedMunicipalities.map((municipality) => (
          <Table.Row key={municipality.ags}>
            <Table.Cell>{municipality.name}</Table.Cell>
            <Table.Cell>{municipality.current}</Table.Cell>
            <Table.Cell>{municipality.population}</Table.Cell>
            <Table.Cell>
              {getPercent(municipality.current, municipality.population, 2)} %
            </Table.Cell>
            <Table.Cell>{municipality.goal}</Table.Cell>
            <Table.Cell>
              {getPercent(municipality.current, municipality.goal, 1)} %
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const getPercent = (x, y, decimals) => {
  return +((x / y) * 100).toFixed(decimals);
};

export default UserStats;
