const MESSAGE_BY_RESULT = {
  valid: {
    label: 'valid',
    color: 'green',
  },
  invalid: {
    label: 'invalid',
    color: 'red',
  }
};

export const getMessageDataByResult = (result) => MESSAGE_BY_RESULT[result];