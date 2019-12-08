import { StateType, ActionType, Action } from 'typesafe-actions';
import { TypedUseSelectorHook } from 'react-redux';
import { Dispatch } from 'redux';
declare global {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState =
    StateType<ReturnType<typeof import('./root-reducer').default>>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./root-action').default>;
  }
}

declare module 'react-redux' {
  export function useSelector<F extends (state: RootState) => any>(
    selector: F,
  ): ReturnType<F>;
  export function useDispatch<A extends Action = RootAction>(): Dispatch<A>;
}

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./root-action').default>;
}
