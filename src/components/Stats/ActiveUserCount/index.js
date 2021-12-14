import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { useActiveUserCount } from '../../../hooks/api/getActiveUserCount';

const ActiveUserCount = () => {
  const count = useActiveUserCount();

  return (
    <>
      <Statistic inverted>
        <Statistic.Value>{count}</Statistic.Value>
        <Statistic.Label>Aktive User*innen</Statistic.Label>
      </Statistic>
    </>
  );
};

export default ActiveUserCount;
