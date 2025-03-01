import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProp = {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClass: string;
  defaultTitle?: boolean;
}

const Modal: FC<TModalProp> = ({
  onClose, title, className, children, headerClass, defaultTitle,
}) => {
  const handleClose = (): void => onClose();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={title ? onClose : handleClose} />
        <div className={`${styles.modal} ${className}`} data-cy="modal">
          <div className={headerClass}>
            {
              (!defaultTitle) ? (
                <h2 className="text text_type_digits-default">{title}</h2>
              )
                : <h2 className="text text_type_main-large">{title}</h2>
            }
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <a onClick={handleClose} data-cy="modal-close"><CloseIcon /></a>
          </div>
          {children}
        </div>
      </>
    ),
    modalRoot,
  );
};

export default Modal;
