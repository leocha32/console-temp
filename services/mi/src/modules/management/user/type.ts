import { User, UserResponseDto } from '$modules/mi-console-report-api';

export type TUserResponseDto = UserResponseDto;

export interface IUser
  extends Pick<Partial<User>, 'accessibleUri' | 'employeeId'>,
    Pick<User, 'name' | 'email' | 'department' | 'company' | 'phone1' | 'role'> {
  /**
   * 접근 가능 tree menu
   */
  selected: string[];
}
