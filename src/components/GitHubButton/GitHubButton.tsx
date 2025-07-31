import githubIcon from "@/assets/icons/github-mark.svg";

const GitHubButton = () => {
    return (
            <a href="https://github.com/vandangnhathung" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] transition-all"
               >
                <img 
                    src={githubIcon} 
                    className="w-6 h-6 invert"
                    alt="GitHub" 
                />
            </a>
    );
};

export default GitHubButton;