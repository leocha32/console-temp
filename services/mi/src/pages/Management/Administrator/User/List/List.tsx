import React, { useCallback, useMemo, useState } from 'react';
import {
  Card as MiCard,
  Button,
  DataGrid,
  IconButton,
  useSnackbar,
  useConfirm,
} from 'mi-ui';
import styled from '@emotion/styled';
import { IUser, useDeleteUser, useUsers } from '$modules/management/user';
import { Outlet, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { accessibleUriToMenuName, addSnackbar } from '$utils/userTreeUtils';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 15px;
`;
export const Card = styled(MiCard)`
  padding: 10px;
  flex: 1;
  height: 100%;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const EditButton = ({ onClick }: { onClick: (row) => void }) => (
  <IconButton onClick={onClick}>
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onClick }: { onClick: (row) => void }) => (
  <IconButton onClick={onClick}>
    <DeleteIcon />
  </IconButton>
);
const column = (onClickEdit, onClickDelete) => [
  { field: 'name', headerName: '이름', width: 100 },
  { field: 'email', headerName: '계정', flex: 1 },
  { field: 'company', headerName: '회사', flex: 1 },
  { field: 'department', headerName: '부서', flex: 1 },
  { field: 'phone1', headerName: '전화번호', flex: 1 },
  { field: 'role', headerName: '권한', flex: 1 },
  {
    field: 'accessibleUri',
    headerName: '접근',
    flex: 2,
    renderCell: ({ row }) => {
      return (
        <div>
          {row.accessibleUri.map((url, index) => (
            <div key={index}>{url}</div>
          ))}
        </div>
      );
    },
  },

  {
    field: 'update',
    headerName: '수정',
    renderCell: ({ row }) => <EditButton onClick={() => onClickEdit(row)} />,
    width: 60,
  },
  {
    field: 'delete',
    headerName: '삭제',
    renderCell: ({ row }) => <DeleteButton onClick={() => onClickDelete(row)} />,
    width: 60,
  },
];

const List = () => {
  const { data } = useUsers();
  const navigate = useNavigate();
  const snackbar = useSnackbar({});
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const deleteUser = useDeleteUser({
    onSuccess: (result) => addSnackbar(snackbar, result),
  });
  const handleDelete = useCallback(() => {
    deleteUser.mutate(selectedUser?.email || '');
  }, [deleteUser, selectedUser]);

  const deleteConfirm = useConfirm({
    title: '사용자 삭제',
    onOk: handleDelete,
  });

  const rows = useMemo(
    () =>
      data?.map(({ accessibleUri = '', ...d }, index) => ({
        ...d,
        accessibleUri: accessibleUriToMenuName(accessibleUri),
        id: index,
      })),
    [data],
  );

  const handleClickEdit = useCallback(
    (user) => {
      navigate('edit', {
        state: { email: user.email || '', authLocation: true },
      });
    },
    [navigate],
  );

  const handleClickAdd = useCallback(() => {
    navigate('add');
  }, [navigate]);

  const handleClickDelete = useCallback(
    (user) => {
      const { name } = user;
      const message = (
        <div>
          <b>{name}</b> 님을 삭제하시겠습니까?
        </div>
      );
      setSelectedUser(user);
      deleteConfirm.open(message);
    },
    [deleteConfirm],
  );

  const columns = useMemo(
    () => column(handleClickEdit, handleClickDelete),
    [handleClickEdit, handleClickDelete],
  );

  return (
    <>
      <Header>
        <Button label="사용자 추가" onClick={handleClickAdd}></Button>
      </Header>
      <Section>
        <Card>
          <DataGrid
            columns={columns}
            rows={rows || []}
            disableColumnMenu
            getRowHeight={() => 'auto'}
          />
        </Card>
      </Section>
      {deleteConfirm.rendered}
      <Outlet />
    </>
  );
};

export default List;
