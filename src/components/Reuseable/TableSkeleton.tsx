import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type ColumnType = "text" | "avatar-text" | "badge" | "action";

export interface ColumnConfig {
  header: string;
  type: ColumnType;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

interface TableSkeletonProps {
  columns: ColumnConfig[];
  rowCount?: number;
  minWidth?: string;
  className?: string;
}

const TableSkeleton = ({
  columns,
  rowCount = 5,
  minWidth = "1000px",
  className,
}: TableSkeletonProps) => {
  const renderCellContent = (type: ColumnType) => {
    switch (type) {
      case "avatar-text":
        return (
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded bg-gray-800" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Skeleton className="h-3 w-20 bg-gray-800" />
            </div>
          </div>
        );
      case "badge":
        return (
          <Skeleton className="h-6 w-16 md:w-20 rounded-full bg-gray-800" />
        );
      case "action":
        return <Skeleton className="h-8 w-24 bg-gray-800" />;
      case "text":
      default:
        return (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40 max-w-full bg-gray-800" />
            <Skeleton className="h-3 w-24 max-w-full bg-gray-800" />
          </div>
        );
    }
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table className={cn("w-full")} style={{ minWidth }}>
        <TableHeader>
          <TableRow className="text-[#BDBDBD] text-sm md:text-base border-b border-gray-800 hover:bg-transparent">
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={cn(
                  "px-4 py-2",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  col.className,
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-gray-800">
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={cn(
                    "px-4 py-3",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                  )}
                >
                  <div
                    className={cn(
                      "flex",
                      col.align === "center" && "justify-center",
                      col.align === "right" && "justify-end",
                    )}
                  >
                    {renderCellContent(col.type)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
