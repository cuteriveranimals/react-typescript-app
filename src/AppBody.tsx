import React from "react";
import styled from "styled-components";
import {
  isOverviewTabContent,
  isPensionTabContent,
  isSavingsTabContent,
  OverviewTabContent,
  PensionTabContent,
  SavingsTabContent,
  useAppStore,
} from "./appStore";
import { colorOrange } from "./atoms";

type OverviewTabContentProps = {
  readonly content: OverviewTabContent;
};

type SavingsTabContentProps = {
  readonly content: SavingsTabContent;
};

type PensionTabContentProps = {
  readonly content: PensionTabContent;
};

const AppBodyContainer = styled.div`
  flex: 1;
  margin: 40px 20px;
`;

const OverviewCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #333;
  padding: 20px;
  gap: 10px;
`;

const CardTitle = styled.div`
  color: ${colorOrange};
  font-size: 1.2em;
`;

const PensionCardTitle = styled.div`
  font-size: 1.3em;
  margin-bottom: 20px;
`;

const SavingsCard = styled(OverviewCard)`
  --gap: 20px;
  background-color: #333;
  width: calc(50% - (3 * var(--gap)));

  &:first-of-type {
    width: 100%;
  }
`;

const SavingsCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;

const PensionCard = styled.div`
  background-color: #333;
  padding: 20px;
`;

const OverviewTab = ({
  content: { title, subtitle },
}: OverviewTabContentProps) => {
  return (
    <OverviewCard>
      <CardTitle>{title}</CardTitle>
      <div>{subtitle}</div>
    </OverviewCard>
  );
};

const SavingsTab = ({ content: { cards } }: SavingsTabContentProps) => {
  return (
    <SavingsCardsContainer>
      {cards.map((card) => (
        <SavingsCard key={card.title}>
          <CardTitle>{card.title}</CardTitle>
          <div>{card.subtitle}</div>
        </SavingsCard>
      ))}
    </SavingsCardsContainer>
  );
};

const PensionTab = ({
  content: { title, description },
}: PensionTabContentProps) => {
  return (
    <div>
      <h2>Other pensions</h2>
      <PensionCard>
        <PensionCardTitle>{title}</PensionCardTitle>
        {description}
      </PensionCard>
    </div>
  );
};
const AppBody = () => {
  const activeTabId = useAppStore(({ activeTabId }) => activeTabId);
  const content = useAppStore(
    ({ tabContentMap }) => tabContentMap[activeTabId].body
  );
  if (isOverviewTabContent(content)) {
    return (
      <AppBodyContainer>
        <OverviewTab content={content} />
      </AppBodyContainer>
    );
  }
  if (isSavingsTabContent(content)) {
    return (
      <AppBodyContainer>
        <SavingsTab content={content} />
      </AppBodyContainer>
    );
  }
  if (isPensionTabContent(content)) {
    return (
      <AppBodyContainer>
        <PensionTab content={content} />
      </AppBodyContainer>
    );
  }
  return null;
};

export default AppBody;
