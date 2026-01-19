// Map Data Type Definitions

export interface EventTrigger {
  type: 'battle' | 'scenario' | 'shop' | 'none';
  value: string;
  chance?: number;
  triggerOn: 'step' | 'interact';
}

export interface TileData {
  id: string;
  x: number;
  y: number;
  terrainCardId: string;
  isTraversable: boolean;
  eventTrigger?: EventTrigger;
}

export interface MapGrid {
  width: number;
  height: number;
}

export interface MapJson {
  mapId: string;
  name: string;
  bgm: string;
  tableTheme: string;
  grid: MapGrid;
  defaultFogState: 'hidden' | 'revealed';
  tiles: TileData[];
}

export interface Position {
  x: number;
  y: number;
}
