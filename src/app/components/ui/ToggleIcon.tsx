type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleIcon({ toggled, onToggle, onIcon, offIcon }: Props) {
  return <button onClick={() => onToggle(!toggled)}>{toggled ? onIcon : offIcon}</button>;
}
