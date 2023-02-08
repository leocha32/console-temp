import { useMemo, useCallback, ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  TreeView as CTreeview,
  Select as CSelect,
  InputText as CInputText,
  Button,
  Type,
} from 'mi-ui/src';
import { IUser } from '$modules/management/user';
import { Theme, css } from '@emotion/react';
import { IFormProps, FormType } from '$utils/hooks';
import { isEmailValid } from '$utils/validation';
import { INVALID_EMAIL } from '$utils/message';
import useAlert from '$utils/hooks/useAlert';
import { ALL_MENU_NODE_ID, makeSelectedItem, treeItem } from '$utils/userTreeUtils';
import { useUserInfo } from '$modules/auth';

const WIDTH = 300;
const Item = styled.div`
  display: flex;
  padding-bottom: 15px;
`;
const Dl = styled.dl`
  margin: 0;
`;
const Dt = styled.dt`
  width: 120px;
  min-width: 120px;
`;
const Dd = styled.dd`
  margin: 0;
`;

const TreeView = styled(CTreeview)(({ theme }: { theme?: Theme }) => ({
  border: `1px solid ${theme?.palettes.gray.GRAY_400}`,
  height: '300px',
  width: `calc(${WIDTH}px - 10px)`,
  overflowY: 'auto',
  overflowX: 'hidden',
  borderRadius: '4px',
  padding: '5px',
}));

const InputText = styled(CInputText)({
  width: `${WIDTH}px`,
});

const Select = styled(CSelect)({
  width: `${WIDTH}px`,
});
const EmailWrap = styled.div`
  display: flex;
  gap: 15px;
`;
export const enum RoleType {
  'USER' = 'USER',
  'MANAGER' = 'MANAGER',
  'ADMIN' = 'ADMIN',
}
const roleOption = [
  { value: RoleType.USER, label: 'User' },
  { value: RoleType.MANAGER, label: 'Manager' },
  { value: RoleType.ADMIN, label: 'Admin' },
];

const EmailComponent = ({
  value,
  formType,
  onClick,
  onChange,
  searchFlag,
}: {
  value: string;
  formType: FormType;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchFlag: boolean;
}) => {
  const error = !!value && !isEmailValid(value);
  return (
    <EmailWrap>
      <InputText
        value={value}
        error={error}
        helperText={error && INVALID_EMAIL}
        autoFocus={formType === FormType.ADD}
        disabled={formType === FormType.EDIT || searchFlag}
        onChange={onChange}
      />
      {formType === FormType.ADD ? (
        <Button
          label={searchFlag ? '재조회' : '조회'}
          onClick={onClick}
          disabled={error || !value}
        />
      ) : null}
    </EmailWrap>
  );
};

const isInvalid = (data) => {
  return Object.entries(data)?.some(([key, value]) => {
    if (key === 'email' && !isEmailValid(value as string)) {
      return true;
    }
    return key !== 'accessibleUri' && !value;
  });
};

export const defaultValue: IUser = {
  name: '',
  email: '',
  department: '',
  company: '',
  phone1: '',
  role: RoleType.USER,
  selected: makeSelectedItem([ALL_MENU_NODE_ID]),
};
export const UserAddForm = ({
  formType,
  onChange,
  data,
  onChangeOkDisabled,
}: Omit<IFormProps<IUser>, 'formId'>) => {
  const { state } = useLocation();
  const [searchFlag, setSearchFlag] = useState(false);
  const alert = useAlert({
    title: '오류',
    type: Type.ERROR,
    children: '사용자가 없습니다.',
    maxWidth: 'xs',
  });

  const { refetch } = useUserInfo(state || data?.email, {
    enabled: false,
    onSuccess: (result) => {
      if (!result) {
        alert.open();
      }
      const {
        orgUserCompanyName,
        orgUserCellPhone,
        orgUserDeptName,
        orgUserDeptCode,
        orgUserName,
        orgUserEmail,
      } = result;
      handleChange({
        name: orgUserName,
        email: orgUserEmail,
        department: orgUserDeptName,
        departmentId: orgUserDeptCode,
        company: orgUserCompanyName,
        phone1: orgUserCellPhone,
      });
      setSearchFlag(true);
    },
  });

  const handleChange = useCallback(
    (value) => {
      const newData = {
        ...data,
        ...value,
      };
      if (onChange) {
        onChange(newData);
      }
      if (onChangeOkDisabled) {
        onChangeOkDisabled(isInvalid(newData));
      }
    },
    [data, onChange, onChangeOkDisabled],
  );

  const handleChangeUserInfo = useCallback(
    (role) => {
      handleChange({ role });
    },
    [handleChange],
  );

  const handleChangeEmail = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const email = target.value;
      handleChange({ email });
    },
    [handleChange],
  );

  const handleChangeSelected = useCallback(
    (selected) => {
      handleChange({ selected });
    },
    [handleChange],
  );

  const handleSearch = useCallback(() => {
    if (searchFlag) {
      handleChange({ ...defaultValue });
      setSearchFlag(false);
    } else {
      refetch();
    }
  }, [refetch, searchFlag, handleChange]);

  const items = useMemo(
    () => [
      {
        title: '이름',
        description: <InputText value={data?.name} disabled />,
        required: true,
      },
      {
        title: '계정',
        description: (
          <EmailComponent
            value={data?.email}
            formType={formType}
            onClick={handleSearch}
            onChange={handleChangeEmail}
            searchFlag={searchFlag}
          />
        ),
        required: true,
      },
      {
        title: '회사',
        description: <InputText value={data?.department} disabled />,
        required: true,
      },
      {
        title: '부서',
        description: <InputText value={data?.company} disabled />,
        required: true,
      },
      {
        title: '전화번호',
        description: <InputText value={data?.phone1} disabled />,
        required: true,
      },
      {
        title: '권한',
        description: (
          <Select
            options={roleOption}
            value={data?.role}
            onChange={handleChangeUserInfo}
          />
        ),
        required: true,
      },
      {
        title: '접근',
        description: (
          <TreeView
            items={treeItem}
            defaultExpanded={[ALL_MENU_NODE_ID]}
            selected={data?.selected}
            onChangeSelection={handleChangeSelected}
          />
        ),
        required: true,
      },
    ],
    [
      data,
      formType,
      handleSearch,
      handleChangeUserInfo,
      handleChangeSelected,
      handleChangeEmail,
      searchFlag,
    ],
  );

  return (
    <div>
      <Dl>
        {items?.map(({ title, description, required }, index) => (
          <Item key={index}>
            <Dt
              css={css(
                required
                  ? {
                      '::after': {
                        content: '"*"',
                        color: '#228be7',
                        verticalAlign: 'middle',
                        marginLeft: '3px',
                      },
                    }
                  : {},
              )}
            >
              {title}
            </Dt>
            <Dd>{description}</Dd>
          </Item>
        ))}
      </Dl>
      {alert.rendered}
    </div>
  );
};
