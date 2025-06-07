import { useEffect, useState } from 'react'
import axios from 'axios'
import FileList from '../components/Files/FileList'
import type { File } from '../types/file'

function Home() {
    const [files, setFiles] = useState([])

    useEffect(() => {
        async function fetchFiles() {
            const { data } = await axios.get('http://localhost:8000/files/')
            console.log(`FILES: ${data}`)
            setFiles(data)
        }
        fetchFiles()
    }, [])

    function handleDownload(file: File) {
        console.log(`Download button clicked for file: ${file.id}!`)
        return
    }

    return (
        <section>
            <h1 className="my-3 text-2xl/9 font-bold tracking-tight text-gray-900">
                Files
            </h1>
            <FileList files={files} onDownloadClick={handleDownload} />
        </section>
    )
}

export default Home
