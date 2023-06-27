import styled, { css } from "styled-components";

export const colorGrey = "#4d4b4b";
export const colorOrange = "#ff322b";
export const GreyContainer = styled.div<{ $hasCurvedBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colorGrey};

  ${(props) =>
    props.$hasCurvedBorder &&
    css`
      border-bottom-left-radius: 28px;
    `}
`;
