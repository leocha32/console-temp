import { Link, LinkProps } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { css } from '@emotion/react';

export interface IBlankLinkProps extends LinkProps {
  isForwardIcon?: boolean;
}

export const BlankLink = ({
  children,
  isForwardIcon = false,
  ...props
}: IBlankLinkProps) => {
  return (
    <Link
      css={css`
        display: flex;
        color: #4285f4;
        align-items: center;
        flex-direction: ${isForwardIcon ? 'row-reverse' : 'row'};
        margin-left: ${isForwardIcon ? '0px' : '5px'};
        margin-right: ${isForwardIcon ? '5px' : '0px'};
      `}
      target="_blank"
      {...props}
    >
      {children}
      <LaunchIcon
        fontSize="small"
        css={css`
          margin-left: ${isForwardIcon ? '0px' : '5px'};
          margin-right: ${isForwardIcon ? '5px' : '0px'};
        `}
      />
    </Link>
  );
};
