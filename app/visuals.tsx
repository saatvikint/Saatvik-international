import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  ArrowRight02Icon,
  BubbleChatIcon,
  Building03Icon,
  Call02Icon,
  Cancel01Icon,
  DeliveryTruck01Icon,
  FavouriteIcon,
  FireIcon,
  FlashIcon,
  GiftIcon,
  Globe02Icon,
  Invoice01Icon,
  Leaf01Icon,
  Mail01Icon,
  MinusSignIcon,
  Package01Icon,
  PauseIcon,
  PlayIcon,
  PlusSignIcon,
  Search01Icon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  SparklesIcon,
  StarIcon,
  Sun01Icon,
  Tick02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons';

// Every icon on the site comes from Hugeicons (free set). Add new ones here, never as inline SVG.
const icons = {
  arrow: ArrowRight02Icon,
  'chevron-down': ArrowDown01Icon,
  'pause-icon': PauseIcon,
  'play-icon': PlayIcon,
  'search-icon': Search01Icon,
  'bag-icon': ShoppingBag01Icon,
  'cart-icon': ShoppingCart01Icon,
  flame: FireIcon,
  leaf: Leaf01Icon,
  sun: Sun01Icon,
  'heart-icon': FavouriteIcon,
  crunch: FlashIcon,
  building: Building03Icon,
  gift: GiftIcon,
  truck: DeliveryTruck01Icon,
  receipt: Invoice01Icon,
  chat: BubbleChatIcon,
  mail: Mail01Icon,
  phone: Call02Icon,
  sparkle: SparklesIcon,
  check: Tick02Icon,
  star: StarIcon,
  close: Cancel01Icon,
  minus: MinusSignIcon,
  plus: PlusSignIcon,
  package: Package01Icon,
  globe: Globe02Icon,
  whatsapp: WhatsappIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = 'icon', strokeWidth = 1.8 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return <HugeiconsIcon icon={icons[name]} className={className} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" />;
}
