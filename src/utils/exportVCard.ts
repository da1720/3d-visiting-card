export function exportVCard(data: any): void {
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

    const dataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = `${data.name.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'contact'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
