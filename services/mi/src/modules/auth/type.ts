export interface IUSerInfoResponse {
  orgLoginID: string;
  orgType: string;
  orgUserCellPhone: string;
  orgUserCompanyCode: string;
  orgUserCompanyName: string;
  orgUserDeptCode: string;
  orgUserDeptName: string;
  orgUserEmail: string;
  orgUserFax: string;
  orgUserGb: string;
  orgUserID: string;
  orgUserJikcheckCode: string;
  orgUserJikcheckName: string;
  orgUserJoinDate: string;
  orgUserManagerUserId: string;
  orgUserName: string;
  orgUserPhone: string;
  orgUserTitleCode: string;
  orgUserTitleName: string;
  orgUserType: string;
}

export interface IDepartmentInfoResponse {
  orgDeptCode: string;
  orgDeptCompanyCode: string;
  orgDeptCompanyName: string;
  orgDeptGb: string;
  orgDeptLevel: string;
  orgDeptName: string;
  orgDeptName2: string;
  orgDeptUsers: string;
  orgPDeptCode: string;
  orgSubDepts: string;
  orgType: string;
  orgUpdateDate: string;
}

export interface IProfileParams {
  userId: string;
  size?: string;
}
