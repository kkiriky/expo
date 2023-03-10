import {modalState} from './../atoms/modal';
import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {LoadableComponent} from '@loadable/component';

const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const openModal = useCallback(
    <T>(Component: LoadableComponent<T>, props?: T) => {
      setModal(modals => [...modals, {Component, props}]);
    },
    [setModal],
  );
  const closeModal = useCallback(
    <T>(Component: LoadableComponent<T>) => {
      setModal(modals => {
        return modals.filter(modal => modal.Component !== Component);
      });
    },
    [setModal],
  );

  return {openModal, closeModal};
};

export default useModal;
