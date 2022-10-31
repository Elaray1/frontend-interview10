import { useCallback, useState } from 'react';
import { Box, Text, Button, Input, Modal } from '@mantine/core';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export function AddVerification({ isOpen, addEmailVerification, closeAddVerification }) {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const onModalSubmit = useCallback((e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Email is invalid');
            return;
        }

        addEmailVerification({ email });
    }, [email]);

    const onEmailChange = useCallback((event) => {
        setEmail(event.target.value);
        setErrorMessage(null);
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            opened={isOpen}
            onClose={closeAddVerification}
            overlayColor="white"
            overlayOpacity={1}
        >
            <form onSubmit={onModalSubmit}>
                <Box my={30}>
                    <Text>Email Address</Text>
                    <Input.Wrapper error={errorMessage}>
                        <Input
                            value={email}
                            onChange={onEmailChange} 
                        />
                    </Input.Wrapper>
                </Box>

                <Box>
                    <Button type="submit">Submit</Button>
                </Box>
            </form>

        </Modal>
    )
}
