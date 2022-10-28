import React from 'react';
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
  CardProps,
  CardContentProps,
  CardActionAreaProps,
  CardActionsProps,
} from '@mui/material';
export type TCardProps = CardProps;
export type TCardContentProps = CardContentProps;
export type TCardActionAreaProps = CardActionAreaProps;
export type TCardActionsProps = CardActionsProps;
export const Card = (props: TCardProps) => {
  return <MuiCard {...props} />;
};

export const CardContent = (props: TCardContentProps) => {
  return <MuiCardContent {...props} />;
};

export const CardActionArea = (props: TCardActionAreaProps) => {
  return <MuiCardActionArea {...props} />;
};

export const CardActions = (props: TCardActionsProps) => {
  return <MuiCardActions {...props} />;
};
