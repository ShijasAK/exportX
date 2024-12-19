export const plannerSteps = [
  {
    title: 'Inprogress',
  },
  {
    title: 'Completed',
  },
  {
    title: 'Apporaval',
  },
];

export const getPlannerStepActiveIndex = (status) => {
  switch (status?.toLowerCase()) {
    case 'inprogress':
      return 0;
    case 'approved':
      return 1;
    case 'apporaval':
      return 2;
    default:
      return 0;
  }
};
