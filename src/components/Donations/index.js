import React from 'react';
import { Header, Loader, Table } from 'semantic-ui-react';
import { useDonations } from '../../hooks/api/getDonations';
import './index.css';
import { formatDate } from '../../utils';

const Donations = () => {
  const donations = useDonations();

  if (
    donations &&
    donations.recurringDonations.length === 0 &&
    donations.onetimeDonations.length
  ) {
    return <p>Es gibt noch keine Spenden</p>;
  }

  return (
    <>
      {!donations && <Loader active inline="centered" />}
      {donations && (
        <>
          {donations.recurringDonations.length > 0 && (
            <>
              <Header color="orange">Wiederkehrende Spenden</Header>
              <DonationsTable
                donations={donations.recurringDonations}
                recurring={true}
              />
            </>
          )}
          {donations.onetimeDonations.length > 0 && (
            <>
              <Header color="orange">Einmalige Spenden</Header>
              <DonationsTable
                donations={donations.onetimeDonations}
                recurring={false}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Donations;

const DonationsTable = ({ donations, recurring }) => {
  return (
    <div className="donationsTable">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mandatsreferenznummer</Table.HeaderCell>
            <Table.HeaderCell>Betrag</Table.HeaderCell>
            <Table.HeaderCell>Vorname</Table.HeaderCell>
            <Table.HeaderCell>Nachname</Table.HeaderCell>
            <Table.HeaderCell>IBAN</Table.HeaderCell>
            <Table.HeaderCell>
              {recurring ? 'Ersteinzug' : 'Einzug'} am
            </Table.HeaderCell>
            <Table.HeaderCell>Erstellt am</Table.HeaderCell>
            {recurring && (
              <>
                <Table.HeaderCell>Geändert am</Table.HeaderCell>
                <Table.HeaderCell>Beendet am</Table.HeaderCell>
              </>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {donations.map((donation) => (
            <Table.Row key={donation.id}>
              <Table.Cell>{donation.id}</Table.Cell>
              <Table.Cell>{donation.amount}€</Table.Cell>
              <Table.Cell>{donation.firstName}</Table.Cell>
              <Table.Cell>{donation.lastName}</Table.Cell>
              <Table.Cell>{donation.iban}</Table.Cell>
              <Table.Cell>
                {formatDate(
                  recurring ? donation.firstDebitDate : donation.debitDate
                )}
              </Table.Cell>
              <Table.Cell>{formatDate(donation.createdAt)}</Table.Cell>
              {recurring && (
                <>
                  <Table.Cell>{formatDate(donation.updatedAt)}</Table.Cell>
                  <Table.Cell>{formatDate(donation.cancelledAt)}</Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
