import api from '$utils/api';
import { IUser, TUserResponseDto } from './type';
import { makeSelectedItem } from '$utils/userTreeUtils';
export async function getUsers(): Promise<IUser[]> {
  const { data } = await api({
    url: `/v2/api/console/admin/users`,
    method: 'get',
  });
  return data.users;
}
export async function getUser(email: string): Promise<IUser> {
  const { data } = await api({
    url: `/v2/api/console/admin/user`,
    method: 'get',
    params: {
      target: email,
    },
  });

  const { result, user } = data;
  if (result) {
    user.selected = user?.accessibleUri
      ? makeSelectedItem(user.accessibleUri.split(','))
      : [];
  }

  return user;
}
export async function deleteUser(email: string): Promise<TUserResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/admin/user`,
    method: 'delete',
    params: {
      target: email,
    },
  });
  return data;
}
export async function addUser(user: IUser): Promise<TUserResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/admin/user`,
    method: 'post',
    data: {
      user,
    },
  });
  return data;
}

export async function updateUser(user: IUser): Promise<TUserResponseDto> {
  const { data } = await api({
    url: `/v2/api/console/admin/user`,
    method: 'put',
    data: {
      user,
    },
  });
  return data;
}
