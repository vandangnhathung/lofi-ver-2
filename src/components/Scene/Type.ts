// Define the structure of a scene
export interface SceneButtonProps {
    label: string;
    sound?: string;
    src?: string;
    srcNight?: string;
    position: {
        top: string;
        left: string;
    };
}

export interface SceneProps {
    name: string;
    thumbnail: string;
    src: string | undefined;
    srcNight?: string;
    buttons: SceneButtonProps[];
}

export interface ThemeProps {
    title: string;
    thumbnail: string;
    scenes: SceneProps[];
}