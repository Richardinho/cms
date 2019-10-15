const MAX_NUM_TAGS = 3;

export const tagsValidator = (control) => {
  const numberSelected = control
    .controls
    .filter(ctrl => ctrl.value)
    .length;

  if (numberSelected > MAX_NUM_TAGS) {
    return {
      error: 'not allowed more than 3 selected',
    };
  }

  return null;
};
