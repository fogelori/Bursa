import makeStore from "./makeStore";

const [
  StateHideHeaderProvider,
  useHideHeaderState,
  useHideHeaderUpdater,
] = makeStore(false);

export { StateHideHeaderProvider, useHideHeaderState, useHideHeaderUpdater };
