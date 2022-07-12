export enum SupportedItemTypes {
  Laptop = 'Laptop',
  // Desktop = 'Desktop',
  Tablet = 'Tablet',
  Phone = 'Phone',
  Keyboard = 'Keyboard',
  Webcam = 'Webcam',
  Mouse = 'Mouse',
  Monitor = 'Monitor',
  Headphones = 'Headphones',
  Microphone = 'Microphone',
  // Chair = 'Chair',
  // Desk = 'Desk',
  Ide = 'Ide',
  Terminal = 'Terminal',
  // IdeTheme = 'IdeTheme',
  // IdePlugin = 'IdePlugin',
  Software = 'Software',
  Browser = 'Browser',
}

export type Item = ItemServerData;

export interface Link {
  url: string;
  type: LinkType;
  metadata?: unknown;
}

export enum LinkType {
  Link = 'Link',
  Buy = 'Buy',
  Affiliate = 'Affiliate',
  Video = 'Video',
}

export interface BasicData {
  type: SupportedItemTypes;
  name: string;
  make?: string;
  description?: string;
}

export interface ItemMetadata {
  metadata?: Record<string, string | number | boolean>;
}

export interface PriceData {
  price: number;
  currency: string;
}

export interface LinksData {
  links: Link[];
}

export interface LaptopData
  extends BasicData,
    LinksData,
    ItemMetadata,
    PriceData {
  type: SupportedItemTypes.Laptop;
}

export interface TabletData
  extends BasicData,
    LinksData,
    ItemMetadata,
    PriceData {
  type: SupportedItemTypes.Tablet;
}

export interface PhoneData
  extends BasicData,
    LinksData,
    ItemMetadata,
    PriceData {
  type: SupportedItemTypes.Phone;
}

export interface KeyboardData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Keyboard;
}

export interface WebcamData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Webcam;
}

export interface MouseData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Mouse;
}

export interface MonitorData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Monitor;
}

export interface HeadphonesData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Headphones;
}

export interface MicrophoneData
  extends BasicData,
    LinksData,
    PriceData,
    ItemMetadata {
  type: SupportedItemTypes.Microphone;
}

export interface IdeData extends BasicData, LinksData, ItemMetadata {
  type: SupportedItemTypes.Ide;
}

export interface SoftwareData extends BasicData, LinksData, ItemMetadata {
  type: SupportedItemTypes.Software;
}

export interface TerminalData extends BasicData, LinksData, ItemMetadata {
  type: SupportedItemTypes.Terminal;
}

export interface BrowserData extends BasicData, LinksData, ItemMetadata {
  type: SupportedItemTypes.Browser;
}

export type ItemData =
  | LaptopData
  | TabletData
  | PhoneData
  | KeyboardData
  | WebcamData
  | MouseData
  | MonitorData
  | HeadphonesData
  | MicrophoneData
  | IdeData
  | TerminalData
  | SoftwareData
  | BrowserData;

export type ItemServerData = ItemData & { id: string };
export type ItemUpdateInput = Partial<Omit<ItemServerData, 'links' | 'type'>>;
export type CreateItemData = Omit<ItemData, 'links'>;
