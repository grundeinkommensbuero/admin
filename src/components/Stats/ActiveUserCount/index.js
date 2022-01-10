import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { useActiveUserCount } from '../../../hooks/api/getActiveUserCount';
import { numberWithDots } from '../../../utils';

const ActiveUserCount = () => {
  const stats = useActiveUserCount();

  return (
    <>
      <Statistic.Group>
        <Statistic inverted>
          <Statistic.Value>
            {stats && numberWithDots(stats.count)}
          </Statistic.Value>
          <Statistic.Label>Aktive User*innen</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>
            {stats && numberWithDots(stats.websiteActivityCount)}
          </Statistic.Value>
          <Statistic.Label>Aktiv auf Website</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>
            {stats && numberWithDots(stats.emailActivityCount)}
          </Statistic.Value>
          <Statistic.Label>E-Mail geöffnet</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  );
};

export default ActiveUserCount;
