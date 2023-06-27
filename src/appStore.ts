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

// TODO
type TabBodyContent = {
  readonly content?: string;
};

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
      body: {},
    },
    [TabId.SAVINGS]: {
      header: {
        title: "Savings",
        subtitle: "Invest in your future",
        description: null,
      },
      body: {},
    },
    [TabId.PENSION]: {
      header: {
        title: "Pension",
        subtitle: null,
        description: null,
      },
      body: {},
    },
  },
  isActionMenuOpen: false,
  toggleActionMenu: () =>
    set(({ isActionMenuOpen }) => ({ isActionMenuOpen: !isActionMenuOpen })),
}));
