import { useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconButton, Card, CardActionArea, CardActions } from 'mi-ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CloseIcon from '@mui/icons-material/Close';
import { recentMenuDeleteSelector, recentMenuSelector } from 'recoils/recentMenu';
import { useNavigate } from 'react-router-dom';

const SectionWrap = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 4px;
  padding: 20px;
`;
const SectionTitle = styled.h4`
  color: #191f28;
  margin: 0;
`;
const ContentsWrap = styled.div`
  min-height: 150px;
  overflow: hidden;
  display: flex;
  padding: 20px 0 10px;
  flex-wrap: wrap;
`;

const NoContentsWrap = styled.div`
  color: #8995ae;
  font-size: 13px;
  display: flex;
  min-height: 180px;
  justify-content: center;
  align-items: center;
`;

const RecentViewCard = styled(Card)({
  flexDirection: 'row',
  backgroundColor: '#fafafa',
  minWidth: '300px',
  height: '170px',
  ':not(:last-of-type)': {
    marginRight: '20px',
  },
  borderRadius: '4px',
  boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  display: 'flex',
  marginBottom: '15px',
});

const RecentViewCardClose = styled(CardActions)({
  position: 'absolute',
  right: 0,
  zIndex: 99,
});

const RecentViewCardContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const ParentMenuTitleStyle = css`
  color: #60718b;
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const MenuTitleStyle = css`
  color: rgb(91 110 154 / 66%);
  font-size: 20px;
  font-weight: 500;
`;

export const RecentMenu = () => {
  const navigate = useNavigate();
  const currentMenu = useRecoilValue(recentMenuSelector);
  const deleteCurrentMenu = useSetRecoilState(recentMenuDeleteSelector);

  const handleCloseRecentViewMenu = useCallback(
    (e, path) => {
      e.stopPropagation();
      deleteCurrentMenu(path);
    },
    [deleteCurrentMenu],
  );

  const handleClickCard = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate],
  );
  return (
    <SectionWrap>
      <SectionTitle>최근 조회한 리포트</SectionTitle>
      {currentMenu?.length ? (
        <ContentsWrap>
          {currentMenu?.map(({ currentInfo, parentLabels }) => (
            <RecentViewCard
              key={currentInfo.path}
              onClick={() => handleClickCard(currentInfo.path)}
            >
              <RecentViewCardClose>
                <IconButton
                  onClick={(e) => handleCloseRecentViewMenu(e, currentInfo.path)}
                >
                  <CloseIcon
                    css={css`
                      color: #c7c7ca;
                    `}
                  />
                </IconButton>
              </RecentViewCardClose>
              <CardActionArea>
                <RecentViewCardContents>
                  <div css={ParentMenuTitleStyle}>{parentLabels.join(' | ')}</div>
                  <div css={MenuTitleStyle}>{currentInfo.label}</div>
                </RecentViewCardContents>
              </CardActionArea>
            </RecentViewCard>
          ))}
        </ContentsWrap>
      ) : (
        <NoContentsWrap>최근 조회한 리포트가 없습니다.</NoContentsWrap>
      )}
    </SectionWrap>
  );
};

export default RecentMenu;
