function DownloadButton({ onClick }: { onClick: () => void }) {
    return (
        <>
            <button
                type="submit"
                className="px-2 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none cursor-pointer"
                onClick={onClick}
            >
                Download
            </button>
        </>
    )
}

export default DownloadButton
