import React, { useState } from 'react';
import { Dropdown, Header, Loader } from 'semantic-ui-react';
import campaignOptions from '../campaignOptions';
import { useSignatureCount } from '../../../hooks/api/getSignatureCount';
import { usePowerUsers } from '../../../hooks/api/getPowerUsers';
import SignatureCountTable from './SignatureCountTable';
import PowerUsersTable from './PowerUsersTable';
import { useSignatureHistory } from '../../../hooks/api/getSignatureHistory';
import SignatureHistoryTable from './SignatureHistoryTable';

const SignatureStats = () => {
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const stats = useSignatureCount();
  const powerUsers = usePowerUsers();
  const history = useSignatureHistory();

  return (
    <>
      <Header color="orange">Gesamtanzahl Unterschriften</Header>

      {!stats && <Loader active inline="centered" />}
      {stats && <SignatureCountTable stats={stats} />}

      <Header size="large" color="orange">
        Kampagnenspezifische Unterschriftenstatistiken
      </Header>
      <Dropdown
        placeholder="Kampagne auswählen"
        selection
        fluid
        search
        value={campaign}
        options={campaignOptions}
        onChange={(event, { value }) => setCampaign(value)}
        label="Kampagne"
      />

      <Header color="orange">Historie ({campaign})</Header>
      {!history && <Loader active inline="centered" />}
      {history && (
        <SignatureHistoryTable history={history} campaign={campaign} />
      )}

      <Header color="orange">Powersammler*innen ({campaign})</Header>
      {!powerUsers && <Loader active inline="centered" />}
      {powerUsers && (
        <PowerUsersTable powerUsers={powerUsers} campaign={campaign} />
      )}
    </>
  );
};

export default SignatureStats;
