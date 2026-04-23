export const SUPPORTED_FORMATIONS = [
  '4-3-3',
  '4-2-3-1',
  '4-4-2',
  '4-1-2-1-2',
  '3-5-2',
] as const;

export type SupportedFormation = (typeof SUPPORTED_FORMATIONS)[number];

export type PlayerPosition =
  | 'GK'
  | 'LB'
  | 'CB'
  | 'RB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LW'
  | 'RW'
  | 'ST';

export type LineupSlotId =
  | 'GK'
  | 'LB'
  | 'CB1'
  | 'CB2'
  | 'CB3'
  | 'RB'
  | 'CDM'
  | 'CDM1'
  | 'CDM2'
  | 'CM1'
  | 'CM2'
  | 'CAM'
  | 'LW'
  | 'RW'
  | 'ST'
  | 'ST1'
  | 'ST2';

export interface FormationSlotDefinition {
  slotId: LineupSlotId;
  tacticalPosition: PlayerPosition;
}

export const FORMATION_SLOTS: Record<
  SupportedFormation,
  FormationSlotDefinition[]
> = {
  '4-3-3': [
    { slotId: 'GK', tacticalPosition: 'GK' },
    { slotId: 'LB', tacticalPosition: 'LB' },
    { slotId: 'CB1', tacticalPosition: 'CB' },
    { slotId: 'CB2', tacticalPosition: 'CB' },
    { slotId: 'RB', tacticalPosition: 'RB' },
    { slotId: 'CM1', tacticalPosition: 'CM' },
    { slotId: 'CM2', tacticalPosition: 'CM' },
    { slotId: 'CAM', tacticalPosition: 'CAM' },
    { slotId: 'LW', tacticalPosition: 'LW' },
    { slotId: 'RW', tacticalPosition: 'RW' },
    { slotId: 'ST', tacticalPosition: 'ST' },
  ],
  '4-2-3-1': [
    { slotId: 'GK', tacticalPosition: 'GK' },
    { slotId: 'LB', tacticalPosition: 'LB' },
    { slotId: 'CB1', tacticalPosition: 'CB' },
    { slotId: 'CB2', tacticalPosition: 'CB' },
    { slotId: 'RB', tacticalPosition: 'RB' },
    { slotId: 'CDM1', tacticalPosition: 'CDM' },
    { slotId: 'CDM2', tacticalPosition: 'CDM' },
    { slotId: 'CAM', tacticalPosition: 'CAM' },
    { slotId: 'LW', tacticalPosition: 'LW' },
    { slotId: 'RW', tacticalPosition: 'RW' },
    { slotId: 'ST', tacticalPosition: 'ST' },
  ],
  '4-4-2': [
    { slotId: 'GK', tacticalPosition: 'GK' },
    { slotId: 'LB', tacticalPosition: 'LB' },
    { slotId: 'CB1', tacticalPosition: 'CB' },
    { slotId: 'CB2', tacticalPosition: 'CB' },
    { slotId: 'RB', tacticalPosition: 'RB' },
    { slotId: 'CM1', tacticalPosition: 'CM' },
    { slotId: 'CM2', tacticalPosition: 'CM' },
    { slotId: 'LW', tacticalPosition: 'LW' },
    { slotId: 'RW', tacticalPosition: 'RW' },
    { slotId: 'ST1', tacticalPosition: 'ST' },
    { slotId: 'ST2', tacticalPosition: 'ST' },
  ],
  '4-1-2-1-2': [
    { slotId: 'GK', tacticalPosition: 'GK' },
    { slotId: 'LB', tacticalPosition: 'LB' },
    { slotId: 'CB1', tacticalPosition: 'CB' },
    { slotId: 'CB2', tacticalPosition: 'CB' },
    { slotId: 'RB', tacticalPosition: 'RB' },
    { slotId: 'CDM', tacticalPosition: 'CDM' },
    { slotId: 'CM1', tacticalPosition: 'CM' },
    { slotId: 'CM2', tacticalPosition: 'CM' },
    { slotId: 'CAM', tacticalPosition: 'CAM' },
    { slotId: 'ST1', tacticalPosition: 'ST' },
    { slotId: 'ST2', tacticalPosition: 'ST' },
  ],
  '3-5-2': [
    { slotId: 'GK', tacticalPosition: 'GK' },
    { slotId: 'CB1', tacticalPosition: 'CB' },
    { slotId: 'CB2', tacticalPosition: 'CB' },
    { slotId: 'CB3', tacticalPosition: 'CB' },
    { slotId: 'CDM', tacticalPosition: 'CDM' },
    { slotId: 'CM1', tacticalPosition: 'CM' },
    { slotId: 'CM2', tacticalPosition: 'CM' },
    { slotId: 'CAM', tacticalPosition: 'CAM' },
    { slotId: 'LW', tacticalPosition: 'LW' },
    { slotId: 'RW', tacticalPosition: 'RW' },
    { slotId: 'ST', tacticalPosition: 'ST' },
  ],
};

export const POSITION_COMPATIBILITY: Record<
  PlayerPosition,
  Record<PlayerPosition, number>
> = {
  GK: {
    GK: 1,
    LB: 0,
    CB: 0,
    RB: 0,
    CDM: 0,
    CM: 0,
    CAM: 0,
    LW: 0,
    RW: 0,
    ST: 0,
  },
  LB: {
    GK: 0,
    LB: 1,
    CB: 0.9,
    RB: 0.9,
    CDM: 0.75,
    CM: 0.68,
    CAM: 0.6,
    LW: 0.72,
    RW: 0.6,
    ST: 0.55,
  },
  CB: {
    GK: 0,
    LB: 0.85,
    CB: 1,
    RB: 0.85,
    CDM: 0.85,
    CM: 0.72,
    CAM: 0.6,
    LW: 0.55,
    RW: 0.55,
    ST: 0.52,
  },
  RB: {
    GK: 0,
    LB: 0.9,
    CB: 0.9,
    RB: 1,
    CDM: 0.75,
    CM: 0.68,
    CAM: 0.6,
    LW: 0.6,
    RW: 0.72,
    ST: 0.55,
  },
  CDM: {
    GK: 0,
    LB: 0.72,
    CB: 0.95,
    RB: 0.72,
    CDM: 1,
    CM: 0.92,
    CAM: 0.75,
    LW: 0.62,
    RW: 0.62,
    ST: 0.58,
  },
  CM: {
    GK: 0,
    LB: 0.7,
    CB: 0.65,
    RB: 0.7,
    CDM: 0.95,
    CM: 1,
    CAM: 0.9,
    LW: 0.72,
    RW: 0.72,
    ST: 0.68,
  },
  CAM: {
    GK: 0,
    LB: 0.6,
    CB: 0.6,
    RB: 0.6,
    CDM: 0.72,
    CM: 0.95,
    CAM: 1,
    LW: 0.82,
    RW: 0.82,
    ST: 0.9,
  },
  LW: {
    GK: 0,
    LB: 0.62,
    CB: 0.58,
    RB: 0.55,
    CDM: 0.6,
    CM: 0.72,
    CAM: 0.84,
    LW: 1,
    RW: 0.92,
    ST: 0.8,
  },
  RW: {
    GK: 0,
    LB: 0.55,
    CB: 0.58,
    RB: 0.62,
    CDM: 0.6,
    CM: 0.72,
    CAM: 0.84,
    LW: 0.92,
    RW: 1,
    ST: 0.8,
  },
  ST: {
    GK: 0,
    LB: 0.52,
    CB: 0.52,
    RB: 0.52,
    CDM: 0.58,
    CM: 0.68,
    CAM: 0.86,
    LW: 0.78,
    RW: 0.78,
    ST: 1,
  },
};

export function isSupportedFormation(
  value: string,
): value is SupportedFormation {
  return SUPPORTED_FORMATIONS.includes(value as SupportedFormation);
}

export function getFormationSlots(formation: SupportedFormation) {
  return FORMATION_SLOTS[formation];
}

export function getSlotDefinition(
  formation: SupportedFormation,
  slotId: string,
): FormationSlotDefinition | undefined {
  return FORMATION_SLOTS[formation].find((slot) => slot.slotId === slotId);
}

export function getPositionCompatibilityMultiplier(
  playerPosition: PlayerPosition,
  tacticalPosition: PlayerPosition,
) {
  return POSITION_COMPATIBILITY[playerPosition][tacticalPosition] ?? 0;
}

export function getFitLabel(multiplier: number) {
  if (multiplier === 1) {
    return 'natural';
  }

  if (multiplier >= 0.95) {
    return 'ideal';
  }

  if (multiplier >= 0.85) {
    return 'good';
  }

  if (multiplier >= 0.75) {
    return 'playable';
  }

  if (multiplier >= 0.6) {
    return 'out_of_position';
  }

  if (multiplier > 0) {
    return 'emergency_only';
  }

  return 'forbidden';
}