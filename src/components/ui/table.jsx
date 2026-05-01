export const Table = ({ children }) => (
  <table className="w-full text-sm">{children}</table>
);

export const TableHead = ({ children }) => (
  <thead className="text-gray-400">{children}</thead>
);

export const TableRow = ({ children }) => (
  <tr className="border-t">{children}</tr>
);

export const TableCell = ({ children }) => (
  <td className="py-2">{children}</td>
);