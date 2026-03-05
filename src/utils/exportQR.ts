import QRCode from 'qrcode';

export async function exportQRCode(data: any): Promise<void> {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.title}
EMAIL;TYPE=INTERNET:${data.email}
TEL;TYPE=CELL:${data.phone}
URL:${data.website}
ADR;TYPE=WORK:;;;${data.location};;;
X-SOCIALPROFILE;type=linkedin:${data.linkedin}
X-SOCIALPROFILE;type=github:${data.github}
END:VCARD`;

    try {
        const dataUri = await QRCode.toDataURL(vcard, {
            width: 1024,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        const a = document.createElement('a');
        a.href = dataUri;
        a.download = `${data.name.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'contact'}_qr.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (err) {
        console.error('Error generating QR code', err);
        alert('Failed to generate QR code.');
    }
}
