import React, { useState } from 'react';
import { Button, Header, Loader, Table } from 'semantic-ui-react';
import { useDonations } from '../../hooks/api/getDonations';
import './index.css';
import { formatDate } from '../../utils';
import { useUpdateUser } from '../../hooks/api/updateUser';
import { useEffect } from 'react/cjs/react.development';

const Donations = () => {
  const [donations, refetchDonations] = useDonations();

  return (
    <>
      {!donations && <Loader active inline="centered" />}
      {donations && (
        <>
          {donations.recurringDonations.length > 0 && (
            <>
              <Header color="orange">Wiederkehrende Spenden</Header>
              <DonationsTable
                refetchDonations={refetchDonations}
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

const DonationsTable = ({ donations, recurring, refetchDonations }) => {
  const [updateUserState, updateUser] = useUpdateUser();
  const [cancelledDonationId, setCancelledDonationId] = useState();

  const cancelDonation = (userId, donationId) => {
    updateUser(userId, { donation: { cancel: true } });
    setCancelledDonationId(donationId);
  };

  // Refetch donation was cancellation was successful
  useEffect(() => {
    if (updateUserState === 'saved') {
      refetchDonations();
    }
  }, [updateUserState, refetchDonations]);

  return (
    <>
      {' '}
      {updateUserState === 'error' && <p>Fehler beim Beenden der Spende!</p>}
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
                  <Table.HeaderCell>Jährlich</Table.HeaderCell>
                  <Table.HeaderCell>Geändert am</Table.HeaderCell>
                  <Table.HeaderCell>Beendet am</Table.HeaderCell>
                  <Table.HeaderCell>Spende beenden</Table.HeaderCell>
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
                    <Table.Cell>{donation.yearly ? 'Ja' : 'Nein'}</Table.Cell>
                    <Table.Cell>{formatDate(donation.updatedAt)}</Table.Cell>
                    <Table.Cell>{formatDate(donation.cancelledAt)}</Table.Cell>
                    <Table.Cell>
                      {!donation.cancelledAt && (
                        <Button
                          negative
                          loading={cancelledDonationId === donation.id}
                          onClick={() =>
                            cancelDonation(donation.userId, donation.id)
                          }
                        >
                          Spende beenden
                        </Button>
                      )}
                    </Table.Cell>
                  </>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
