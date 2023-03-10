import React from 'react';
import {useRecoilValue} from 'recoil';
import {modalState} from '@/atoms/modal';
import useModal from '@/hooks/useModal';
import loadable from '@loadable/component';

export const modals = {
  askDialog: loadable(() => import('./AskDialog')),
};

const Modals = () => {
  const opendModals = useRecoilValue(modalState);
  const {closeModal} = useModal();

  return (
    <>
      {opendModals.map((modal, index) => {
        const {Component, props} = modal;
        const {onConfirm, ...restProps} = props ?? {};

        const onClose = () => closeModal(Component);

        const confirm = () => {
          if (typeof onConfirm === 'function') {
            onConfirm();
          }
          onClose();
        };

        return (
          <Component
            key={index}
            onConfirm={onConfirm ? confirm : null}
            onClose={onClose}
            {...restProps}
          />
        );
      })}
    </>
  );
};

export default Modals;
