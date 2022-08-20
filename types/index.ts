export interface ICharacter {
    id: number;
    name: string;
    species: string;
    gender: string;
    image: string;
}

export interface ISelectedCharacter {
    name: string;
    species: string;
    gender: string;
    image: string;
    location: { name: string };
    origin: { name: string };
    status: string;
}