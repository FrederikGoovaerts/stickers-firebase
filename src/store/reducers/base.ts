export const createReducer = <T>(initialState: T, setType: string, clearType?: string) => (
  state: T = initialState,
  action: { type: string; payload: T },
): T => {
  if (action.type === setType) {
    return action.payload;
  } else if (clearType !== undefined && action.type === clearType) {
    return initialState;
  }
  return state;
};
