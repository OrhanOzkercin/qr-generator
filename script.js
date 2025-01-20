let qrcode = null;

function generateQR() {
    const url = document.getElementById('urlInput').value;
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Clear previous QR code if it exists
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';

    // Generate new QR code
    qrcode = new QRCode(qrcodeDiv, {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
} 