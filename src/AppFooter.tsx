import React from "react";
import styled, { css } from "styled-components";
import { colorGrey, colorOrange, GreyContainer } from "./atoms";
import { useAppStore } from "./appStore";

type TabButtonProps = {
  readonly label: string;
  readonly isActive: boolean;
  readonly onClick: VoidFunction;
};

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin: 0 20px;
`;

const StyledButton = styled.button<{ $isActive: boolean }>`
  background-color: inherit;
  font-size: inherit;
  border: none;
  color: white;
  padding: 20px;

  ${(props) =>
    props.$isActive &&
    css`
      color: ${colorOrange};
      text-decoration: underline;
    `}
`;

const ActionButton = styled.button<{ $isActive: boolean }>`
  margin: 0;
  padding: 0;
  background-color: ${(props) => (props.$isActive ? colorGrey : colorOrange)};
  color: ${(props) => (props.$isActive ? colorOrange : colorGrey)};
  font-size: 2em;
  border: 10px solid black;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  position: relative;
  top: -50%;
`;

const Tabs = () => {
  const tabs = useAppStore(({ tabs }) => tabs);
  const activeTabId = useAppStore(({ activeTabId }) => activeTabId);
  const setActiveTabId = useAppStore(({ setActiveTabId }) => setActiveTabId);
  const isActionMenuOpen = useAppStore(
    ({ isActionMenuOpen }) => isActionMenuOpen
  );
  const toggleActionMenu = useAppStore(
    ({ toggleActionMenu }) => toggleActionMenu
  );
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={tab.id === activeTabId}
          label={tab.label}
          onClick={() => setActiveTabId(tab.id)}
        />
      ))}
      <ActionButton $isActive={isActionMenuOpen} onClick={toggleActionMenu}>
        {isActionMenuOpen ? "x" : "+"}
      </ActionButton>
    </TabsContainer>
  );
};
const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <StyledButton onClick={onClick} $isActive={isActive}>
      {label}
    </StyledButton>
  );
};

const AppFooter = () => {
  return (
    <GreyContainer>
      <Tabs />
    </GreyContainer>
  );
};

export default AppFooter;
