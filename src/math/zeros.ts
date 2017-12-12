function zeros(dim1: number = 1, dim2: number = 1): Array<Array<number>> {
  const ro = [];
  for (let i = 0; i < dim2; i++) {
    const row = [];
    for (let j = 0; j < dim1; j++) {
      row.push(0);
    }
    ro.push(row);
  }

  return ro;
}

export default zeros;
