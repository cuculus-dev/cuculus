'use client';

import { Input, InputProps, styled } from '@mui/material';
import { useEffect, useRef } from 'react';

const StyledInput = styled(Input)`
  height: 100%;

  textarea {
    // inputPropsのminRowsに応じてタグに直接スタイル設定される
    height: 100% !important;
    vertical-align: top;
  }
`;

type OmitKeys = 'multilne' | 'placeholder' | 'value' | 'onChange' | 'fullWidth';

interface Props {
  getContent: string;
  setContent: (str: string) => void;
  minHeight?: number | string;
  focusEditor?: boolean;
}

const Editor = ({
  getContent,
  setContent,
  focusEditor,
  ...inputProps
}: Props & Omit<InputProps, OmitKeys>) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focusEditor) {
      inputRef.current?.focus();
    }
  }, [inputRef, focusEditor]);

  return (
    <StyledInput
      inputRef={inputRef}
      multiline
      placeholder="いまどうしてる？"
      value={getContent}
      onChange={(e) => {
        setContent(e.target.value);
      }}
      fullWidth
      {...inputProps}
    />
  );
};

export default Editor;
