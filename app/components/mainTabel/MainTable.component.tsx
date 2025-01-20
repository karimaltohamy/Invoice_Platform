import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column {
  label: string;
  className?: string;
}

interface Props {
  columns: Column[];
  children: ReactNode;
}

const MainTable: React.FC<Props> = ({ columns, children }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </>
  );
};

export default MainTable;
