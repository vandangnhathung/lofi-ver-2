// Define the structure of a scene button
export interface SceneButtonProps {
    id: string;
    label: string;
    position: {
        top: string;
        left: string;
    };
    toSceneId?: string;
}

// Define the structure of sources for different conditions
export interface SceneSourceProps {
    normal: {
        src: string;
    };
    rain?: {
        src: string;
    };
}

// Define the structure of a scene
export interface SceneProps {
    id: string;
    name: string;
    thumbnail: string;
    sources: {
        day: SceneSourceProps;
        night: SceneSourceProps;
    };
    buttons: SceneButtonProps[];
}

// Define the structure of a theme
export interface ThemeProps {
    title: string;
    thumbnail: string;
    scenes: SceneProps[];
}
