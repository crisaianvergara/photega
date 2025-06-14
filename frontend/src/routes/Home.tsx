import { useEffect, useState } from 'react'
import FileList from '../components/Files/FileList'
import type { File } from '../types/file'
import instance from '../lib/axios'
import { useAppSelector } from '../app/hook'
import { useNavigate } from 'react-router'

function Home() {
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const user = useAppSelector((state) => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const { data } = await instance.get<File[]>('/files')
                setFiles(data)
            } catch (error) {
                setError('Failed to load files.')
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchFiles()
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    function handleDownload(file: File) {
        console.log(`Download button clicked for file: ${file.id}!`)
        return
    }

    return (
        <section>
            <h1 className="my-3 text-2xl/9 font-bold tracking-tight text-gray-900">
                Files
            </h1>
            <FileList
                files={files}
                onDownloadClick={handleDownload}
                loading={loading}
                error={error}
            />
        </section>
    )
}

export default Home
