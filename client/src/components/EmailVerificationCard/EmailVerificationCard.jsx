import React, { useCallback } from 'react';
import { Box, Text, Divider, Group } from '@mantine/core';
import moment from 'moment';

import { getMessageDataByResult } from '../../resources/email/email.helpers';

import useStyles from './styles.js';

export function EmailVerificationCard({ verification, showDetails }) { // TODO: replace verification object with needed fields
  const { classes } = useStyles();

  const onEmailClick = useCallback(() => {
    showDetails(verification.id);
  }, []);

  const resultMessageData = getMessageDataByResult(verification.result);

  // TODO: check if email length is too large!

  return (
    <Box className={classes.container} onClick={onEmailClick}>
        {/* TODO: add orange as main color to styles theme */}
        <Text color="orange" size={20}>{verification.email}</Text>
        <Divider my={25} />
        <Group>
            <Text color="gray">
              Date:
              {' '}
              <Text span color="black" weight={700}>{moment(verification.created_at).format('YYYY-MM-DD')}</Text>
            </Text>
            <Text ml={10} weight={700} color={resultMessageData.color} t style={{ textTransform: 'capitalize' }}>{resultMessageData.label}</Text>
        </Group>
    </Box>
  );
}
