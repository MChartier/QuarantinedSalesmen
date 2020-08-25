export enum TravelerType {
  FieldCoordinator = 'Field Coordinator',
  Presenter = 'Presenter',
}

export function getTravelerTypeName(type: TravelerType) {
  return TravelerType[type];
}