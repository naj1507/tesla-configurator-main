import { Couleur } from "./couleur";

export type Modele = {
    code: string;
    description: string;
    colors: Couleur[];
    selected: boolean;
  };
  