import { css } from '@emotion/react';
import logo from 'assets/images/logo.png';

export const Header = (
  <div
    id={'layout-header'}
    css={css`
      font-size: 24px;
      font-weight: 700;
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
  >
    <img
      src={logo}
      css={css`
        position: sticky;
        height: 40px;
        margin-right: 10px;
      `}
    />
    <span
      css={css`
        font-size: 20px;
        font-weight: 500;
      `}
    >
      {`${' MI Platform'}`}
    </span>
  </div>
);
