import makeStore from "../../../../makeStore";

const [StateDialogProvider, useDialogState, useDialogUpdater] = makeStore({
  open: false,
  row: {},
});

export { StateDialogProvider, useDialogState, useDialogUpdater };
