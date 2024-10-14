import SceneButton from "@/components/Scene/SceneButtons/SceneButton";
import {SceneButtonProps} from "@/components/Scene/Type";

const SceneButtons = ({buttons}: { buttons: SceneButtonProps[] }) => {
    return (
        <div className={`absolute z-30 inset-0`}>
            {
                buttons.map((button, index) => (
                    <SceneButton key={index} button={button}/>
                ))
            }
        </div>
    );
};

export default SceneButtons;