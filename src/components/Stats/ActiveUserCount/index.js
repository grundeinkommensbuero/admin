import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { useActiveUserCount } from '../../../hooks/api/getActiveUserCount';

const ActiveUserCount = () => {
  const stats = useActiveUserCount();

  return (
    <>
      <Statistic.Group>
        <Statistic inverted>
          <Statistic.Value>{stats && stats.count}</Statistic.Value>
          <Statistic.Label>Aktive User*innen</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>
            {stats && stats.websiteActivityCount}
          </Statistic.Value>
          <Statistic.Label>Aktiv auf Website</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>{stats && stats.emailActivityCount}</Statistic.Value>
          <Statistic.Label>E-Mail geöffnet</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  );
};

export default ActiveUserCount;
