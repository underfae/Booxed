export class Reward {
  _id: string;
  name: string;
  points: number;
  libraries: LibraryPreview[];
}

export class LibraryPreview {
  id_library: string;
  name: string;
}
