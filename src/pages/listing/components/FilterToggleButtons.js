import React from 'react';
import styled from 'styled-components';

import plusFilter from '../../../assets/icons/plus_filter.png';
import minusFilter from '../../../assets/icons/minus_filter.png';

const ToggleFilter = styled.img`
  width: 12px;
  height: 12px;
`;

const BorderBottom = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 15px;
  background-color: #dde2eb;
`;

export const PlusFilter = () => {
  return <ToggleFilter src={plusFilter} alt="Plus Filter" />;
};

export const MinusFilter = () => {
  return <ToggleFilter src={minusFilter} alt="Minus Filter" />;
};

export const SeparationLine = () => {
  return <BorderBottom />;
};
