import FileItem from "./FileItem";
import type { File } from "../../types/file";

function FileList({
  files,
  onDownloadClick,
  loading,
  error,
}: {
  files: File[];
  onDownloadClick: (file: File) => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">
              Size
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">
              Owner
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">
              Date Modified
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap border-b border-gray-500 text-center text-gray-600"
              >
                Loading files...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap border-b border-gray-500 text-center text-red-500"
              >
                {error}
              </td>
            </tr>
          ) : files && files.length > 0 ? (
            files.map((file) => (
              <tr key={file.id}>
                <FileItem
                  file={file}
                  onDownload={() => onDownloadClick(file)}
                />
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap border-b border-gray-500 text-center text-gray-500"
                colSpan={5}
              >
                No files found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default FileList;
