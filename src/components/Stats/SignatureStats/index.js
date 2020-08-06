import React, { useState } from 'react';
import { Dropdown, Header, Loader } from 'semantic-ui-react';
import campaignOptions from '../campaignOptions';
import { useSignatureCount } from '../../../hooks/api/getSignatureCount';
import { usePowerUsers } from '../../../hooks/api/getPowerUsers';
import SignatureCountTable from './SignatureCountTable';
import PowerUsersTable from './PowerUsersTable';
import { useSignatureHistory } from '../../../hooks/api/getSignatureHistory';
import SignatureHistoryTable from './SignatureHistoryTable';
import SignatureHistoryChart from './SignatureHistoryChart';
import DatePicker from '../DatePicker';

const SignatureStats = () => {
  const [campaign, setCampaign] = useState(campaignOptions[0].value);
  const stats = useSignatureCount();
  const powerUsers = usePowerUsers();
  const [state, history, reloadHistory] = useSignatureHistory();

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
      {state === 'loading' && <Loader active inline="centered" />}
      {history && (
        <SignatureHistory
          history={history}
          campaign={campaign}
          updateData={reloadHistory}
        />
      )}

      <Header color="orange">Powersammler*innen ({campaign})</Header>
      {!powerUsers && <Loader active inline="centered" />}
      {powerUsers && (
        <PowerUsersTable powerUsers={powerUsers} campaign={campaign} />
      )}
    </>
  );
};

const SignatureHistory = ({ history, campaign, updateData }) => {
  if (!(campaign in history)) {
    return <p>Noch keine Historie für dieses Bundesland</p>;
  }

  return (
    <>
      <DatePicker updateData={updateData} />
      <SignatureHistoryTable campaignHistory={history[campaign]} />
      <SignatureHistoryChart campaignHistory={history[campaign]} />
    </>
  );
};

export default SignatureStats;
