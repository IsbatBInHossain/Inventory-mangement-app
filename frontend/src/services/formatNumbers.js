// Format Amount
export const formatNumbers = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
