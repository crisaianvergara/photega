import files from "../files";


function Home () {
    return (
        <section>
            <h1>Welcome to Photega</h1>
            <table className="table-auto md:table-fixed border-collapse">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Owner</th>
                        <th>Date Modified</th>
                        <th>Sort</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr>
                            <td>{file.fileName}</td>
                            <td>{file.fileSize}</td>
                            <td>{file.owner}</td>
                            <td>{file.dateModified}</td>
                            <td>action</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Home;