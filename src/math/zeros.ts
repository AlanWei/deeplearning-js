const zeros = (
  shape: [number, number],
): number[][] => {
  const row: number = shape[0];
  const col: number = shape[1];
  const ro = [];
  for (let i = 0; i < row; i++) {
    const rowValues = Array(col).fill(0);
    ro.push(rowValues);
  }

  return ro;
};

export default zeros;