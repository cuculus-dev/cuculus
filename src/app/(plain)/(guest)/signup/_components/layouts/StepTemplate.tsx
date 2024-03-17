'use client';

import { ReactNode } from 'react';
import { Alert, Button, LinearProgress, styled } from '@mui/material';

const Title = styled('div')`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Form = styled('form')`
  display: flex;
  max-width: 500px;
  padding: 20px;
  gap: 40px;
  flex-direction: column;
`;

const Bottom = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type Props = {
  onSubmit: () => void;
  step: number;
  maxStep: number;
  title: string;
  isMutating: boolean;
  error?: Error | null;
  children: ReactNode;
};

export default function StepTemplate({
  onSubmit,
  step,
  maxStep,
  title,
  isMutating,
  error,
  children,
}: Props) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <Title>
        Step {step}/{maxStep}: {title}
      </Title>
      {children}
      {isMutating && <LinearProgress />}
      {!isMutating && error && <Alert severity="error">{error.message}</Alert>}
      <Bottom>
        <div style={{ marginLeft: 'auto' }} />
        <Button type="submit" disabled={isMutating}>
          Next
        </Button>
      </Bottom>
    </Form>
  );
}
