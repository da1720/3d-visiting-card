export function exportImage(fileName: string): void {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) {
        alert("Could not find the 3D Canvas element to take a screenshot.");
        return;
    }

    const dataUri = canvas.toDataURL('image/png', 1.0);

    const a = document.createElement('a');
    a.href = dataUri;
    a.download = `${fileName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'card'}_capture.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
