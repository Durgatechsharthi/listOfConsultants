import React, { useState, useMemo, useCallback } from "react";
import {
  usePagination,
  useSortBy,
  useTable,
  useFilters,
  useResizeColumns,
  useFlexLayout,
} from "react-table";
import {
  TextField,
  IconButton,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { RiPlayReverseFill, RiPlayFill } from "react-icons/ri";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import preview from "../assets/images/Preview.png";
import comment from "../assets/images/comments1.png";
import DemandCmt from "../assets/images/DemandCmt.png";
import logfile from "../assets/images/logfile.png";
import "./reactTableComponent.css"; // Importing CSS

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  const handleChangeFilter = (e) => {
    setFilter(e.target.value || undefined);
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <TextField
      size="small"
      value={filterValue || ""}
      onChange={handleChangeFilter}
      onClick={handleStopPropagation} // Stop propagation to prevent sorting
      InputProps={{
        className: "default-filter-input",
      }}
    />
  );
};

// Higher-order function to handle row actions
const handleRowAction = (actionType) => (row) => {
  switch (actionType) {
    case "preview":
      console.log("preview:", row);
      break;
    case "comment":
      console.log("Comment:", row);
      break;
    case "demandComment":
      console.log("Demand Comment:", row);
      break;
    case "log":
      console.log("Log:", row);
      break;
    default:
      break;
  }
};

const ReactTableComponent = ({ tableData, tableColumns, isAction }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Memoize table data and columns for performance optimization
  const tabledata = useMemo(() => tableData, [tableData]);
  const tablecolumns = useMemo(() => {
    const columns = [
      {
        Header: "S.No",
        accessor: (row, i) => i + 1,
        Filter: DefaultColumnFilter,
        disableFilters: false,
        disableSortBy: false,
        width: 72,
        maxWidth: 60,
      },
      ...tableColumns,
    ];

    if (isAction) {
      const actionColumn = {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            {["preview", "comment", "demandComment", "log"].map(
              (actionType, index) => (
                <img
                  key={index}
                  src={{ preview, comment, DemandCmt, logfile }[actionType]}
                  className={`action-icon ${isHovered ? "scale-125" : ""}`}
                  onClick={handleRowAction(actionType)(row)}
                  alt={actionType}
                />
              )
            )}
          </div>
        ),
      };

      return [...columns, actionColumn];
    }
    return columns;
  }, [tableColumns, isAction, isHovered]);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 72,
      width: 160,
      maxWidth: 900,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
    setPageSize,
    setAllFilters,
  } = useTable(
    {
      columns: tablecolumns,
      data: tabledata,
      defaultColumn,
      initialState: { pageSize: rowsPerPage },
    },
    useFilters,
    useSortBy,
    usePagination,
    useResizeColumns,
    useFlexLayout
  );

  // Callback to handle changing rows per page
  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const newPageSize = Number(event.target.value);
      setRowsPerPage(newPageSize);
      setPageSize(newPageSize);
    },
    [setPageSize]
  );

  // Callback to handle input change for pagination
  const handleInputChange = useCallback(
    (event) => {
      let value = Number(event.target.value);
      if (value > 0 && value <= pageCount) {
        gotoPage(value - 1);
      }
    },
    [gotoPage, pageCount]
  );

  // Callback to handle input blur for pagination
  const handleInputBlur = useCallback(
    (event) => {
      let value = Number(event.target.value);
      if (value > 0 && value <= pageCount) {
        gotoPage(value - 1);
      }
    },
    [gotoPage, pageCount]
  );

  // Callback to clear all filters
  const handleClearFilters = useCallback(
    (e) => {
      e.stopPropagation(); // Stop propagation to prevent sorting
      setAllFilters([]);
    },
    [setAllFilters]
  );

  //rendering table

  const renderTable = () => (
    <>
      <table className="table" {...getTableProps()} border={1}>
        <thead className="table-header">
          {headerGroups.map((hg) => {
            const { key, ...headerGroupProps } = hg.getHeaderGroupProps();

            return (
              <tr key={key} {...headerGroupProps}>
                {hg.headers.map((column, columnIndex, headers) => {
                  const { key, ...rest } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  const isLastColumn = columnIndex === headers.length - 1;
                  return (
                    <th
                      key={key}
                      className={`table-header-cell ${
                        isLastColumn ? "header" : ""
                      }`}
                      {...rest}
                    >
                      <div className="header-content">
                        <span className="header-text">
                          {column.render("Header")}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </div>
                      {column.getResizerProps && (
                        <div
                          {...column.getResizerProps()}
                          className="resizer"
                        />
                      )}
                      {isLastColumn && (
                        <Tooltip title="Clear Filter">
                          <FilterListSharpIcon
                            onClick={handleClearFilters}
                            className="clear-filter-icon"
                          />
                        </Tooltip>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {page.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} className="table-row" {...rest}>
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td key={key} className="table-cell" {...rest}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  //rendering pagination

  const renderPagination = () => (
    <>
      <div className="pagination-controls">
        <IconButton onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
          <IoPlaySkipBack />
        </IconButton>
        <IconButton onClick={() => previousPage()} disabled={pageIndex === 0}>
          <RiPlayReverseFill />
        </IconButton>
        <TextField
          value={pageIndex + 1}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          type="number"
          className="pagination-input"
          inputProps={{
            min: 1,
            max: pageCount,
            className: "pagination-input-inner no-border-radius",
          }}
        />
        <span> / {pageCount}</span>
        <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
          <RiPlayFill />
        </IconButton>
        <IconButton
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <IoPlaySkipForward />
        </IconButton>
        <Select
          className="rows-per-page-select"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          {[10, 25].map((rows) => (
            <MenuItem key={rows} value={rows}>
              {rows}
            </MenuItem>
          ))}
        </Select>
        <span>items per page</span>
      </div>
      <div className="pagination-info">
        {pageIndex * rowsPerPage + 1} -{" "}
        {Math.min((pageIndex + 1) * rowsPerPage, tabledata.length)} of{" "}
        {tabledata.length} items
      </div>
    </>
  );

  return (
    <div className="table-container">
      <div className="overflow-auto">{renderTable()}</div>
      <div>
        <span className="total-items">Total Items: {tabledata.length}</span>
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default ReactTableComponent;
