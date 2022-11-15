import styled from '@emotion/styled';

export const Contents = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  grid-template-columns: 50% 50%;

  grid-gap: 10px;
  background-color: #fafafa;
  padding: 20px;
  height: fit-content;
  align-items: center;

  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const Title = styled.h3`
  color: #191f28;
  margin: 0;
`;
