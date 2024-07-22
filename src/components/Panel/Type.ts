export interface PanelSceneProps {
    index: number;
    thumbnail: string;
    onClick: () => void;
}


// Define the structure of a scene
export interface Scene {
    title: string;
    thumbnail: string;
    src: string;
}