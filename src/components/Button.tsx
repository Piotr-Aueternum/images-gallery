import React from 'react';

interface Props {
    onClick: (event: React.MouseEvent) => void;
}

export const Button: React.FC<Props> = props =>
    <button {...props} />;
