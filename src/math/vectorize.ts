function vectorize(num: number, dim1: number = 1, dim2: number = 1) {
  const ro = [];
  for (let i = 0; i < dim1; i++) {
    const row = [];
    for (let j = 0; j < dim2; j++) {
      row.push(num);
    }
    ro.push(row);
  }

  return ro;
}

export default vectorize;
