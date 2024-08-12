export const numericSort = (rowA, rowB, columnId) => {
    const a = parseFloat(rowA.values[columnId]);
    const b = parseFloat(rowB.values[columnId]);

    return a > b ? 1 : a < b ? -1 : 0;
};