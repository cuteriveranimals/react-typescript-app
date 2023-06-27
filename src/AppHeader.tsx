import React from "react";
import styled, { css } from "styled-components";
import { GreyContainer } from "./atoms";
import { useAppStore } from "./appStore";

const styles = css`
  margin: 20px;
`;

const Title = styled.h2`
  ${styles}
`;

const Subtitle = styled.h1`
  ${styles}
`;

const Description = styled.h2`
  ${styles}
`;

const AppHeader = () => {
  const activeTabId = useAppStore(({ activeTabId }) => activeTabId);
  const { title, subtitle, description } = useAppStore(
    ({ tabContentMap }) => tabContentMap[activeTabId].header
  );
  return (
    <GreyContainer $hasCurvedBorder={Boolean(subtitle || description)}>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      {description ? <Description>{description}</Description> : null}
    </GreyContainer>
  );
};

export default AppHeader;
