export type ArtKind =
  | "sofa"
  | "armchair"
  | "chair"
  | "table"
  | "bed"
  | "cabinet"
  | "shelf"
  | "lamp"
  | "pendant";

export type ProductArt = {
  kind: ArtKind;
  tone: number;
};

export type VariantType = "wood" | "fabric" | "metal" | "color";

export type Variant = {
  id: string;
  label: string;
  type: VariantType;
  hex: string;
  priceDelta: number;
  /** Alternate .glb shown when this variant is selected. */
  model?: string;
  /** Alternate artwork tone shown when this variant is selected. */
  tone?: number;
};

export type ModelHotspot = {
  slot: string;
  label: string;
  detail?: string;
  position: string;
  normal?: string;
};

export type ProductModel = {
  glb: string;
  /** Required for iOS Quick Look AR. */
  usdz?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  hotspots?: ModelHotspot[];
};

export type Dimensions = {
  width: number;
  depth: number;
  height: number;
  unit: "cm" | "in";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  currency: string;
  salePrice?: number;
  shortDescription: string;
  description: string;
  story?: string;
  dimensions: Dimensions;
  materials: string[];
  colors: string[];
  features: string[];
  /** Optional real photos. When absent, generated artwork is used. */
  images?: string[];
  art: ProductArt;
  model3d?: ProductModel;
  variants?: Variant[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured: boolean;
  bestseller?: boolean;
  createdAt: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  art: ProductArt;
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export type RoomPiece = {
  slug: string;
  label: string;
  kind: ArtKind;
  tone: number;
  /** Scene-x of the piece centre, in the 0–400 scene space. */
  x: number;
  /** Extra vertical offset after the piece is grounded on the y=350 floor. */
  dy?: number;
  scale: number;
  /** Scene-y of the hotspot dot. */
  hotY: number;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  /** Backdrop palette tone. */
  tone: number;
  pieces: RoomPiece[];
};

export type ProductFilter = {
  q: string;
  categories: string[];
  materials: string[];
  colors: string[];
  maxPrice?: number;
  inStockOnly: boolean;
  sort: SortKey;
};
