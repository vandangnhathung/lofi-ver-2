// Define the structure of a scene button
export interface SceneButtonProps {
    id: string;
    label: string;
    position: {
        top: string;
        left: string;
    };
    toSceneId?: string;
    sound?: string;  // Optional sound property
}

// Define the structure of sources for different conditions
export interface SceneSourceProps {
    normal?: {
        src: string;
    };
    rain?: {
        src: string;
    };
}

// Define the structure of a scene
export interface SceneProps {
    id?: string; // ID might not be available in some scenes
    name: string;
    thumbnail: string;
    sources?: {
        day?: SceneSourceProps;
        night?: SceneSourceProps;
    };
    src?: string;  // Direct src as a fallback for simpler structures
    buttons: SceneButtonProps[];
}

// Define the structure of a theme
export interface ThemeProps {
    title: string;
    thumbnail: string;
    scenes: SceneProps[];
}
