export type PrizeIconKey =
  | 'smartphone'
  | 'laptop'
  | 'tablet'
  | 'watch'
  | 'headphones'
  | 'gamepad'
  | 'speaker'
  | 'keyboard'
  | 'mouse'
  | 'charger'
  | 'gift'
  | 'star';

export interface PrizeItem {
  id: string;
  line1: string;
  line2: string;
  name: string;
  color: string;
  icon: PrizeIconKey;
  weight?: number;
}

export interface SpinResult {
  prize: PrizeItem;
  index: number;
  timestamp: number;
}

export interface SpinHistoryItem {
  id: string;
  prizeName: string;
  prizeIcon: PrizeIconKey;
  prizeColor: string;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark';

export type SpinState = 'idle' | 'spinning' | 'won';

export type SpotlightColorMode = 'amber' | 'violet' | 'cyan' | 'rose' | 'rgb' | 'custom';

export type SpotlightStyle = 'rim' | 'sweep' | 'center';

export interface SpotlightConfig {
  enabled: boolean;
  colorMode: SpotlightColorMode;
  customColor: string;
  style: SpotlightStyle;
  brightness: number; // 0.2 to 1.0
}
