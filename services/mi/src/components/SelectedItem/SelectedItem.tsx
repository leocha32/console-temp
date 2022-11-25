import styled from '@emotion/styled';

const SelectedItemWrap = styled.div`
  display: flex;
  font-size: 14px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_700};
  :not(:last-of-type) {
    margin-bottom: 5px;
  }
`;
const Dl = styled.dl`
  margin: 0;
`;
const Dt = styled.dt`
  width: 100px;
  min-width: 100px;
`;
const Dd = styled.dd`
  margin: 0;
`;

export interface IItem {
  title: string;
  value: string;
}
export interface ISelectedItem {
  items: IItem[];
}
const SelectedItem = ({ items }: ISelectedItem) => {
  return (
    <Dl>
      {items.map(({ title, value }, index) => (
        <SelectedItemWrap key={index}>
          <Dt>{title}:</Dt>
          <Dd>{value}</Dd>
        </SelectedItemWrap>
      ))}
    </Dl>
  );
};
export default SelectedItem;
