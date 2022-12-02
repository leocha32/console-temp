import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from '@emotion/styled';
import { Button } from '../Atoms';
import { css } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrap = styled.div`
  height: auto;
  width: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.palettes.gray.GRAY_900};
  font-size: 15px;
`;

export interface IErrorPageProps {
  resetErrorBoundary: ErrorBoundary['resetErrorBoundary'];
}
export const ErrorPage = ({ resetErrorBoundary }: IErrorPageProps) => {
  const navigate = useNavigate();
  const handleGoToHome = useCallback(() => {
    resetErrorBoundary();
    navigate('/');
  }, [resetErrorBoundary, navigate]);
  return (
    <Wrap>
      <ErrorOutlineIcon sx={{ color: '#f55e5e' }} />
      <Title>오류가 발생했습니다.</Title>
      <Button
        label={'홈으로'}
        css={css`
          width: 100px;
          margin-top: 30px;
        `}
        onClick={handleGoToHome}
      ></Button>
    </Wrap>
  );
};
