import { Box, Modal, Text, Stack, Table } from '@mantine/core';
import moment from 'moment';

import { getMessageDataByResult } from '../../resources/email/email.helpers';

import useStyles from './styles.js';

const LABEL_BY_FIELD_VALUE = {
    is_private: 'Private',
    is_catchall: 'Catchall',
    is_disposable: 'Disposable',
    is_freemail: 'Freemail',
    is_rolebased: 'Rolebased',
    is_dns_valid_mx: 'Dns Valid Mx',
    is_smtp_valid: 'SMTP Valid',
    is_domain_banned: 'Domain Banned',
    is_domain_privacy: 'Domain Privacy',
    mailbox_exists: 'Mailbox Exists',
}

const getTablePropertyValueData = (value, property) => {
    const isColorReversed = property.includes('banned');
    const successColor = isColorReversed ? 'red' : 'green';
    const errorColor = isColorReversed ? 'green' : 'red';

    if (value === 1 || value === 0) {
        if (value) {
            return { label: 'yes', color: successColor };
        }

        return { label: 'no', color: errorColor };
    }

    return { label: value, color: null }
}

export function EmailVerificationDetails({ isOpen, emailVerification, closeDetails }) { // TODO: add propTypes everywhere
    const { classes } = useStyles();

    if (!isOpen) {
        return null;
    }

    const titleDatesData = [
        {
            label: 'Date',
            value: moment(emailVerification.created_at).format('YYYY-MM-DD'),
        },
        {
            label: 'Last verified at',
            value: moment(emailVerification.verified_at).format('YYYY-MM-DD hh:mm'),
        },
    ];

    const resultMessageData = getMessageDataByResult(emailVerification.result);

    const rows = Object.keys(LABEL_BY_FIELD_VALUE).map((property, index) => {
        const value = emailVerification[property];
        const tablePropertyValueData = getTablePropertyValueData(value, property);

        return (
            <tr key={property} className={index % 2 === 1 && classes.tableRow}>
              <td>{LABEL_BY_FIELD_VALUE[property]}</td>
              <td style={{ color: tablePropertyValueData.color }}>{tablePropertyValueData.label}</td>
            </tr>
        );
    });

    return (
        <Modal
            className={classes.modal}
            opened={isOpen}
            onClose={closeDetails}
            overlayColor="white"
            overlayOpacity={1}
        >
            <Stack className={classes.titleContainer} align="center" justify="center">
                <Box>
                    <Text>Email Verification result for <Text span weight={600}>{emailVerification.email}</Text></Text>
                </Box>
                <Box className={classes.titleDates}>
                    {titleDatesData.map((dateData) => (
                        <Box mt={5} key={dateData.label}>
                            <Text weight={600} size={14}>
                                <Text className={classes.dateLabel} span color="gray" weight={500}>{dateData.label}: </Text>
                                {dateData.value}
                            </Text>
                        </Box>
                    ))}
                </Box>
                <Text my={15}>Email is <Text span color={resultMessageData.color}>{resultMessageData.label}</Text></Text>
            </Stack>

            <Table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Modal>
    )
}
