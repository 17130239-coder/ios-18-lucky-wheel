export type PrizeIconKey =
  // Công nghệ
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
  | 'camera'
  | 'tv'
  | 'monitor'
  | 'cpu'
  | 'hard-drive'
  | 'wifi'
  | 'mic'
  | 'battery'
  // Giải thưởng & May mắn
  | 'gift'
  | 'star'
  | 'trophy'
  | 'crown'
  | 'medal'
  | 'gem'
  | 'ticket'
  | 'sparkles'
  | 'coins'
  | 'wallet'
  | 'shopping-bag'
  | 'percent'
  | 'award'
  // Đời sống & Xe cộ
  | 'car'
  | 'bike'
  | 'plane'
  | 'coffee'
  | 'pizza'
  | 'utensils'
  | 'shirt'
  | 'glasses'
  | 'heart'
  | 'flame'
  | 'zap'
  | 'music'
  | 'shield-check'
  | 'sun'
  | 'package';

export interface PrizeItem {
  id: string;
  line1: string;
  line2: string;
  name: string;
  color: string;
  textColor?: string;
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
  showDust?: boolean; // Hạt bụi ánh sáng thể tích 3D
  beamReach?: 'deep' | 'standard'; // Tầm rọi sâu xuống sàn hoặc vừa vặn
}

export type BackgroundTheme = 'default' | 'forest' | 'ocean' | 'underwater';
