import DownloadButton from "./DownloadButton";
import type { File } from "../../types/file";

function FileItem({
  file,
  onDownload,
}: {
  file: File;
  onDownload: () => void;
}) {
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
        {file.file_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
        {file.file_size}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
        {file.owner}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
        {file.updated_at}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
        <DownloadButton onClick={onDownload} />
      </td>
    </>
  );
}

export default FileItem;
