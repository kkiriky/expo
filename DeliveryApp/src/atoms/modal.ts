import {atom} from 'recoil';
import {LoadableComponent} from '@loadable/component';

export interface ModalState {
  Component: LoadableComponent<any>;
  props: any;
}

export const modalState = atom<ModalState[]>({
  key: 'modalState',
  default: [],
});
