import { useState, useEffect, useCallback } from 'react';
import { Box, Text, Button, Loader, Center, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { AddVerification, EmailVerificationCard, EmailVerificationDetails } from "../.";

import { getEmailVerifications, addEmailVerification } from '../../resources/email/email.api';

import useStyles from './styles.js';

export function EmailVerificationHistory () {
    const { classes } = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [emailVerifications, setEmailVerifications] = useState([]);
    const [emailVerification, setEmailVerification] = useState({});

    const onOpenAddNewEmailModal = useCallback(() => {
        setIsAddOpen(true);
    }, []);

    const fetchEmailVerifications = useCallback(async () => {
        try {
            const fetchedEmailVerifications = await getEmailVerifications();

            setEmailVerifications(fetchedEmailVerifications);
        } catch (error) {
            console.log(error); // TODO: show error on UI
        } finally {
            setIsLoading(false);
        }
    }, []);


  const onAddEmailVerification = async ({ email }) => {
      setIsLoading(true);
      setIsAddOpen(false);

      try {
        await addEmailVerification(email);

        showNotification({
            title: 'Your request was received',
            color: 'green',
        });

        fetchEmailVerifications();


      } catch (error) {
        setIsLoading(false);

        showNotification({
            title: 'There is a problem with your request',
            description: error,
            color: 'red',
        });
      }
  }

  const showDetailsModal = (verificationId) => {
      setIsDetailsOpen(true)
      setEmailVerification(
          emailVerifications.filter(emailVerification => emailVerification.id === verificationId)[0]
      )
  }

  useEffect(() => {
      fetchEmailVerifications();
  }, []);

  if (isLoading) {
      return <Center style={{ height: '100vh' }}><Loader size="xl" color="orange" /></Center>
  }

  return (
    <Box className={classes.wrapper}>
        <Group position="apart" mb={20}>
            <Box>
                <Text size={30}>Email Verification History</Text>
                <Text size={14} color="gray">{`${emailVerifications.length} result${emailVerifications.length === 1 ? '' : 's'}`}</Text>
            </Box>
            <Button
                onClick={onOpenAddNewEmailModal}
                color="orange"
                size="md"
                radius="xl"
                uppercase
            >
                Verify Email
            </Button>
        </Group>

        <AddVerification isOpen={isAddOpen} addEmailVerification={onAddEmailVerification} closeAddVerification={() => setIsAddOpen(false)} />
        <EmailVerificationDetails isOpen={isDetailsOpen} emailVerification={emailVerification} closeDetails={() => {setIsDetailsOpen(false)}} />

        <Group>
        {emailVerifications.length &&
            emailVerifications.map((item) =>
                <EmailVerificationCard
                    key={item.id}
                    verification={item}
                    showDetails={showDetailsModal}
                />
            )}
        </Group>
    </Box>
  );
}
