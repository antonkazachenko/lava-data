import React, { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './header.module.css';

type IconProps = {
  className?: string;
};

type IconComponent = FC<IconProps>;

type MenuItem = {
  id: string;
  label: string;
  shortcut?: string;
  icon: IconComponent;
};

const ChevronDownIcon: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="m4 6 4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const TitleIcon: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 6h12M10 6v8M6 14h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CardIcon: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3.75"
      y="5"
      width="12.5"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M4 8h12M7 11h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CogIcon: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="m11.41 2.75.41 1.68c.2.82.9 1.42 1.74 1.48l1.72.12c.58.04.91.69.6 1.18l-.95 1.44a1.74 1.74 0 0 0 0 1.92l.95 1.44c.31.49-.02 1.14-.6 1.18l-1.72.12a1.75 1.75 0 0 0-1.74 1.48l-.41 1.68c-.14.57-.86.78-1.3.38l-1.3-1.16a1.75 1.75 0 0 0-2.26 0l-1.3 1.16c-.44.4-1.16.19-1.3-.38l-.41-1.68a1.75 1.75 0 0 0-1.74-1.48l-1.72-.12c-.58-.04-.91-.69-.6-1.18l.95-1.44a1.74 1.74 0 0 0 0-1.92L2.81 7.21c-.31-.49.02-1.14.6-1.18l1.72-.12a1.75 1.75 0 0 0 1.74-1.48l.41-1.68c.14-.57.86-.78 1.3-.38l1.3 1.16c.64.57 1.62.57 2.26 0l1.3-1.16c.44-.4 1.16-.19 1.3.38ZM10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const menuItems: MenuItem[] = [
  {
    id: 'title',
    label: 'Title',
    shortcut: '⌘⇧B',
    icon: TitleIcon,
  },
  {
    id: 'raw',
    label: 'Raw',
    shortcut: '⌘⇧B',
    icon: CardIcon,
  },
  {
    id: 'source',
    label: 'Source',
    shortcut: '⌘⇧B',
    icon: CogIcon,
  },
];

const CategoriesDropdown: FC = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        type="button"
        className={styles.dropdownTrigger}
      >
        <span
          className={`${styles.hoverText} ${styles.dropdownTriggerLabel}`}
          data-text="Categories"
        >
          Categories
        </span>
        <ChevronDownIcon className={styles.dropdownIcon} />
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={styles.dropdownContent}
        align="start"
        sideOffset={12}
        collisionPadding={12}
      >
        <DropdownMenu.Label className={styles.dropdownLabel}>
          Categories
        </DropdownMenu.Label>
        <DropdownMenu.Separator className={styles.dropdownSeparator} />
        {menuItems.map((item) => (
          <DropdownMenu.Item
            key={item.id}
            className={styles.dropdownItem}
          >
            <span className={styles.dropdownItemIcon}>
              <item.icon />
            </span>
            <span>{item.label}</span>
            {item.shortcut ? (
              <span className={styles.dropdownShortcut}>{item.shortcut}</span>
            ) : null}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Arrow className={styles.dropdownArrow} width={12} height={6} />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default CategoriesDropdown;
