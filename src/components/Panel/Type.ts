export interface PanelSceneProps {
    index: number;
    thumbnail: string;
    onClick: () => void;
}


// Define the structure of a scene
export interface SceneProps {
    title?: string;
    thumbnail?: string;
    src?: string;
}