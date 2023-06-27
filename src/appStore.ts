import { create } from "zustand";

enum TabId {
  OVERVIEW = "overview",
  SAVINGS = "savings",
  PENSION = "pension",
}

type Tab = {
  readonly id: TabId;
  readonly label: string;
};

type TabHeaderContent = {
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly description: string | null;
};

type Card = {
  readonly title: string;
  readonly subtitle: string;
};

export type OverviewTabContent = {
  readonly type: TabId.OVERVIEW;
} & Card;

export type SavingsTabContent = {
  readonly type: TabId.SAVINGS;
  readonly cards: Card[];
};

export type PensionTabContent = {
  readonly type: TabId.PENSION;
  readonly title: string;
  readonly description: string;
};

type TabBodyContent =
  | OverviewTabContent
  | SavingsTabContent
  | PensionTabContent;

export const isOverviewTabContent = (
  content: TabBodyContent
): content is OverviewTabContent => content.type === TabId.OVERVIEW;

export const isSavingsTabContent = (
  content: TabBodyContent
): content is SavingsTabContent => content.type === TabId.SAVINGS;

export const isPensionTabContent = (
  content: TabBodyContent
): content is PensionTabContent => content.type === TabId.PENSION;

type TabContent = {
  readonly header: TabHeaderContent;
  readonly body: TabBodyContent;
};

type AppStoreState = {
  readonly tabs: Tab[];
  readonly activeTabId: TabId;
  readonly setActiveTabId: (activeTabId: TabId) => void;
  readonly tabContentMap: Record<TabId, TabContent>;
  readonly isActionMenuOpen: boolean;
  readonly toggleActionMenu: VoidFunction;
};

export const useAppStore = create<AppStoreState>((set) => ({
  tabs: [
    { id: TabId.OVERVIEW, label: "Overview" },
    { id: TabId.SAVINGS, label: "Savings" },
    { id: TabId.PENSION, label: "Pension" },
  ],
  activeTabId: TabId.OVERVIEW,
  setActiveTabId: (activeTabId) => set({ activeTabId }),
  tabContentMap: {
    [TabId.OVERVIEW]: {
      header: {
        title: null,
        subtitle: "Hi Arsen",
        description:
          "Welcome to Storebrand. Would you like to start saving with us?",
      },
      body: {
        type: TabId.OVERVIEW,
        title: "Invest in your future",
        subtitle: "See our selected funds",
      },
    },
    [TabId.SAVINGS]: {
      header: {
        title: "Savings",
        subtitle: "Invest in your future",
        description: null,
      },
      body: {
        type: TabId.SAVINGS,
        cards: [
          {
            title: "Storebrand Fremtid 100 A",
            subtitle: "New fund",
          },
          {
            title: "Storebrand Verdi A",
            subtitle: "Up 9.24%",
          },
          {
            title: "Storebrand Indeks - Alle Markeder A",
            subtitle: "Up 14.13%",
          },
        ],
      },
    },
    [TabId.PENSION]: {
      header: {
        title: "Pension",
        subtitle: null,
        description: null,
      },
      body: {
        type: TabId.PENSION,
        title: "Get an overview of your pension",
        description: `Do you consent to Storebrand Livsforsikring collecting information from Norsk Pensjon about your pension in the National Insurance scheme (Folketrygden) and your private pension policies?
            
            The consent is voluntary and is valid until you withdraw it, which you can do at any point from your profile.`,
      },
    },
  },
  isActionMenuOpen: false,
  toggleActionMenu: () =>
    set(({ isActionMenuOpen }) => ({ isActionMenuOpen: !isActionMenuOpen })),
}));
