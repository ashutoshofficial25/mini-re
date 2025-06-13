import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { rolesApi } from 'src/api/roles.api';

import { TableNoData } from '../../user/table-no-data';
import { TableEmptyRows } from '../../user/table-empty-rows';
import { RolesTableHead } from '../roles-table-head';
import { RolesTableToolbar } from '../roles-table-toolbar';
import { emptyRows } from '../../user/utils';
import { Checkbox } from '@mui/material';

export function RolesView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [roles, setRoles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchRoles = useCallback(async () => {
    const response = await rolesApi.getRoles({
      page: page,
      limit: rowsPerPage,
      search: filterName,
      sortBy: orderBy,
      sortOrder: order,
    });

    if (response?.data) {
      setRoles((response.data as any)?.data || []);
      setTotalCount((response.data as any)?.count || 0);
    }
  }, [page, rowsPerPage, filterName, orderBy, order]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      setSelected(roles.map((row: any) => row._id));
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const notFound = !roles.length && !!filterName;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Roles
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Role
        </Button>
      </Box>

      <Card>
        <RolesTableToolbar
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            setPage(0);
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <RolesTableHead
                order={order}
                orderBy={orderBy}
                rowCount={roles.length}
                numSelected={selected.length}
                onSort={handleSort}
                onSelectAllRows={handleSelectAllRows}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'permissions', label: 'Permissions' },
                  { id: 'department', label: 'Department' },
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {roles.map((row: any) => (
                  <TableRow key={row._id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row._id)}
                        onChange={() => handleSelectRow(row._id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.permissions?.length || 0} permissions</TableCell>
                    <TableCell>{row.department?.name}</TableCell>
                    <TableCell align="right">{/* Add actions menu here */}</TableCell>
                  </TableRow>
                ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(page, rowsPerPage, roles.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>
    </DashboardContent>
  );
}
