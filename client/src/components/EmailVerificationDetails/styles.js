import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  modal: {
    minWidth: 700,
  },
  titleContainer: {
    textAlign: 'center',
    gap: 0,
  },
  titleDates: {
    textAlign: 'left',
  },
  dateLabel: {
    display: 'inline-block',
    minWidth: 110,
  },
  tableRow: {
    backgroundColor: '#F5F5F5',
  }
}));

export default useStyles;