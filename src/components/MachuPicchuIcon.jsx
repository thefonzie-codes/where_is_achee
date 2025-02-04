function MachuPicchuIcon({ className }) {
    return (
        <svg 
            className={className}
            viewBox="0 0 512 512" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="currentColor"
                d="M256 32l-96 48v32l-48 32v48l-48 32v192h384V224l-48-32v-48l-48-32V80L256 32zm0 32.6l64 32V128h-128V96.6l64-32zM128 144h256v32H128v-32zm-32 48h320v32H96v-32zm-32 48h384v160H64V240z"
            />
            <path
                fill="currentColor"
                d="M208 272h32v96h-32zm64 0h32v96h-32z"
            />
            <path
                fill="currentColor"
                d="M96 272h32v64H96zm288 0h32v64h-32z"
            />
        </svg>
    );
}

export default MachuPicchuIcon; 