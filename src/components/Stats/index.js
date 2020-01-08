import React from 'react';
import { useSignatureCount } from '../../hooks/api/getSignatureCount';

const Stats = () => {
  const stats = useSignatureCount();

  return (
    <>
      {stats &&
        Object.keys(stats).map(campaign => (
          <p>
            <b>{campaign}</b>: {stats[campaign].withMixed} (mit gemischten
            Ämtern), {stats[campaign].withoutMixed} (ohne gemischte Ämter)
          </p>
        ))}
    </>
  );
};

export default Stats;
