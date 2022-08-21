export interface ICharacter {
    id: number;
    name: string;
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

export interface IVisibilityContext {
    modalVisible: boolean; 
    toggleVisibility: (params: any) => any;
}