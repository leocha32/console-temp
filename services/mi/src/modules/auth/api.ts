import api from '$utils/api';
import { IUSerInfoResponse, IDepartmentInfoResponse, IProfileParams } from './type';

export async function getUserInfo(email: string): Promise<IUSerInfoResponse> {
  const { data } = await api({
    url: `/auth/api/organization/user/useremail/${email}`,
    method: 'get',
  });
  return data.result;
}
export async function getDepartmentInfo(
  deptid: string,
): Promise<IDepartmentInfoResponse> {
  const { data } = await api({
    url: `/auth/api/organization/dept/deptid/${deptid}`,
    method: 'get',
  });
  return data;
}

export async function getUserProfile({
  userId,
  size = 'middle',
}: IProfileParams): Promise<Blob> {
  const { data } = await api({
    url: `/profile/profiles/${userId}_${size}.jpg`,
    method: 'get',
    responseType: 'blob',
  });
  return data;
}
