import saveAs from 'file-saver';

export function downloadFile(response : any, filename : string) {
    const blob: Blob | null = response.body;
    if (blob) {
        const contentDisposition = response.headers.get('Content-Disposition');

        if (contentDisposition) {
            const matches = /filename="([^;]+)"/.exec(contentDisposition);
            if (matches && matches[1]) {
                filename = matches[1];
            }
        }
        saveAs(blob, filename);
    } else {
        console.error('Error: No file content received')
    }
}