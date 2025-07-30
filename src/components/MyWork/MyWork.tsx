import { usePopupManager } from "@/components/PopupManager/PopupManager";

const MyWork = () => {
  const { openPopup } = usePopupManager()

    return (
        <div className="cursor-pointer p-2 px-4 rounded-md bg-[rgba(255,255,255,0.1)] hover:bg-primary transition-all" 
            onClick={() => openPopup('screen-popup')}>
            <h1 className="text-white">My Work</h1>
        </div>
    );
};

export default MyWork;