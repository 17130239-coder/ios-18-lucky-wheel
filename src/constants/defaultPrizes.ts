import { PrizeItem } from '@/types/wheel';

export const DEFAULT_PRIZES: PrizeItem[] = [
  {
    id: 'prize-1',
    line1: 'iPhone 16',
    line2: 'Pro Max',
    name: 'iPhone 16 Pro Max',
    color: '#FF6B00',
    icon: 'smartphone',
    weight: 1,
  },
  {
    id: 'prize-2',
    line1: 'MacBook',
    line2: 'Pro M3',
    name: 'MacBook Pro M3',
    color: '#1E293B',
    icon: 'laptop',
    weight: 1,
  },
  {
    id: 'prize-3',
    line1: 'iPad Pro',
    line2: 'M4',
    name: 'iPad Pro M4',
    color: '#0EA5E9',
    icon: 'tablet',
    weight: 1,
  },
  {
    id: 'prize-4',
    line1: 'Apple Watch',
    line2: 'Ultra 2',
    name: 'Apple Watch Ultra 2',
    color: '#10B981',
    icon: 'watch',
    weight: 1,
  },
  {
    id: 'prize-5',
    line1: 'Tai nghe',
    line2: 'AirPods Max',
    name: 'AirPods Max',
    color: '#8B5CF6',
    icon: 'headphones',
    weight: 1,
  },
  {
    id: 'prize-6',
    line1: 'Máy chơi game',
    line2: 'PS5',
    name: 'PlayStation 5',
    color: '#F59E0B',
    icon: 'gamepad',
    weight: 1,
  },
  {
    id: 'prize-7',
    line1: 'Loa Bluetooth',
    line2: 'Marshall',
    name: 'Loa Marshall',
    color: '#EF4444',
    icon: 'speaker',
    weight: 1,
  },
  {
    id: 'prize-8',
    line1: 'Bàn Phím Cơ',
    line2: 'Custom',
    name: 'Bàn Phím Cơ Custom',
    color: '#059669',
    icon: 'keyboard',
    weight: 1,
  },
  {
    id: 'prize-9',
    line1: 'Chuột Gaming',
    line2: 'MX Master 3S',
    name: 'Chuột MX Master 3S',
    color: '#6366F1',
    icon: 'mouse',
    weight: 1,
  },
  {
    id: 'prize-10',
    line1: 'Củ Sạc Nhanh',
    line2: 'Anker 140W',
    name: 'Củ Sạc Anker 140W',
    color: '#D946EF',
    icon: 'charger',
    weight: 1,
  },
];

export const EXTENDED_PRIZE_POOL: PrizeItem[] = [
  ...DEFAULT_PRIZES,
  {
    id: 'prize-11',
    line1: 'Màn Hình 4K',
    line2: 'Studio 27"',
    name: 'Màn Hình Studio 4K',
    color: '#EC4899',
    icon: 'monitor',
    weight: 1,
  },
  {
    id: 'prize-12',
    line1: 'Flycam Mini',
    line2: 'DJI 4K HDR',
    name: 'Flycam DJI 4K',
    color: '#14B8A6',
    icon: 'camera',
    weight: 1,
  },
  {
    id: 'prize-13',
    line1: 'Kính VR 3D',
    line2: 'Vision Pro',
    name: 'Kính Apple Vision Pro',
    color: '#A855F7',
    icon: 'glasses',
    weight: 1,
  },
  {
    id: 'prize-14',
    line1: 'Loa Thông Minh',
    line2: 'HomePod Mini',
    name: 'Loa HomePod Mini',
    color: '#F43F5E',
    icon: 'speaker',
    weight: 1,
  },
  {
    id: 'prize-15',
    line1: 'Sạc Dự Phòng',
    line2: 'MagSafe 20k',
    name: 'Sạc Dự Phòng MagSafe',
    color: '#3B82F6',
    icon: 'battery',
    weight: 1,
  },
  {
    id: 'prize-16',
    line1: 'Thẻ Quà Tặng',
    line2: 'Apple Store',
    name: 'Thẻ Quà Tặng Apple',
    color: '#F97316',
    icon: 'gift',
    weight: 1,
  },
];

const VIBRANT_COLOR_PALETTE = [
  '#FF6B00',
  '#1E293B',
  '#0EA5E9',
  '#10B981',
  '#8B5CF6',
  '#F59E0B',
  '#EF4444',
  '#059669',
  '#6366F1',
  '#D946EF',
  '#EC4899',
  '#14B8A6',
  '#A855F7',
  '#F43F5E',
  '#3B82F6',
  '#F97316',
];

export function createNewPrize(index: number): PrizeItem {
  if (index < EXTENDED_PRIZE_POOL.length) {
    const template = EXTENDED_PRIZE_POOL[index];
    return {
      ...template,
      id: `prize-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
  }

  const color = VIBRANT_COLOR_PALETTE[index % VIBRANT_COLOR_PALETTE.length];
  return {
    id: `prize-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    line1: `Phần Quà`,
    line2: `#${index + 1}`,
    name: `Phần Quà #${index + 1}`,
    color,
    icon: 'gift',
    weight: 1,
  };
}
