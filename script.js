document.addEventListener('DOMContentLoaded', () => {
    function validateAndFormatJSON(format = false) {
        const jsonInput = document.getElementById('json-input');
        const jsonOutputPre = document.getElementById('json-output-pre');
        const jsonStatus = document.getElementById('json-status');
        if (!jsonInput || !jsonOutputPre || !jsonStatus) return;
        const jsonText = jsonInput.value.trim();
        jsonOutputPre.textContent = '';
        jsonStatus.style.color = 'red';
        if (!jsonText) {
            jsonStatus.textContent = 'Вставте JSON код.';
            return;
        }
        try {
            const jsonObject = JSON.parse(jsonText);
            const formattedJson = JSON.stringify(jsonObject, null, 2);
            jsonOutputPre.textContent = formattedJson;
            jsonStatus.textContent = 'JSON валідний та відформатовано. ✅';
            jsonStatus.style.color = 'green';
        } catch (e) {
            jsonStatus.textContent = `Помилка валідації JSON: ${e.message}`;
            jsonOutputPre.textContent = '';
        }
    }
    function generateQrCode() {
        const qrInput = document.getElementById('qr-input');
        const qrcodeDiv = document.getElementById('qrcode');
        const downloadQrBtn = document.getElementById('download-qr-btn');
        const qrMessage = document.getElementById('qr-message');
        const qrColorSelect = document.getElementById('qr-color-select'); 
        const selectedColor = qrColorSelect ? qrColorSelect.value : "#000000"; 
        
        if (!qrInput || !qrcodeDiv) return;
        const text = qrInput.value.trim();
        qrcodeDiv.innerHTML = '';
        downloadQrBtn.style.display = 'none';
        qrMessage.textContent = '';
        
        const size = 512; 
        
        if (typeof QRCode === 'undefined') {
            qrMessage.textContent = 'Помилка: Бібліотека QRCode не завантажена.';
            return;
        }
        if (text) {
            try {
                new QRCode(qrcodeDiv, {
                    text: text,
                    width: size, 
                    height: size,
                    colorDark: selectedColor, 
                    colorLight: "#ffffff", 
                    correctLevel: QRCode.CorrectLevel.H
                });
                downloadQrBtn.style.display = 'block';
            } catch (error) {
                qrMessage.textContent = 'Помилка генерації QR-коду.';
                console.error(error);
            }
        }
    }
    function updateMarkdownConversion() {
        const markdownInput = document.getElementById('markdown-input');
        const htmlOutput = document.getElementById('html-output');
        if (typeof marked === 'undefined' || !markdownInput || !htmlOutput) return; 
        const markdownText = markdownInput.value;
        if (markdownText.trim()) {
            const htmlText = marked.parse(markdownText);
            htmlOutput.value = htmlText;
        } else {
            htmlOutput.value = '';
        }
    }
    function performConversion() {
        const unitValue = document.getElementById('unit-value');
        const unitFrom = document.getElementById('unit-from');
        const unitTo = document.getElementById('unit-to');
        const unitResult = document.getElementById('unit-result');
        if (!unitValue || !unitFrom || !unitTo || !unitResult) return;
        const conversionFactors = {
            'm': 1, 'km': 1000, 'mi': 1609.34,
        };
        const convertTemperature = (value, fromUnit, toUnit) => {
            if (fromUnit === toUnit) return value;
            let K; 
            if (fromUnit === 'C') K = value + 273.15;
            else if (fromUnit === 'F') K = (value - 32) * 5/9 + 273.15;
            else if (fromUnit === 'K') K = value;
            else return null;
            if (toUnit === 'C') return K - 273.15;
            else if (toUnit === 'F') return (K - 273.15) * 9/5 + 32;
            else if (toUnit === 'K') return K;
            else return null;
        }
        const value = parseFloat(unitValue.value);
        const from = unitFrom.value;
        const to = unitTo.value;
        if (isNaN(value)) {
            unitResult.textContent = 'Будь ласка, введіть числове значення.';
            return;
        }
        const isTemperature = ['C', 'F', 'K'].includes(from) || ['C', 'F', 'K'].includes(to);
        let result;
        if (isTemperature) {
            result = convertTemperature(value, from, to);
        } else {
            const valueInBase = value * conversionFactors[from];
            result = valueInBase / conversionFactors[to];
        }
        if (result !== null && !isNaN(result)) {
            unitResult.textContent = `Результат: ${value} ${from} = ${result.toFixed(4)} ${to}`;
        } else {
            unitResult.textContent = 'Помилка перетворення. Переконайтеся, що одиниці сумісні.';
        }
    }
    const navLinks = document.querySelectorAll('.nav-link');
    const utilityCards = document.querySelectorAll('.utility-card');
    const switchUtility = (targetId) => {
        utilityCards.forEach(card => {
            card.style.display = 'none';
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
            targetCard.style.display = 'flex';
        }
        document.querySelector(`.nav-link[data-target="${targetId}"]`)?.classList.add('active');
        if (targetId === 'markdown-converter') updateMarkdownConversion();
        if (targetId === 'unit-converter') performConversion(); 
        if (targetId === 'json-tools') validateAndFormatJSON(true);
    };
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            window.history.pushState(null, '', `#${targetId}`);
            switchUtility(targetId);
        });
    });
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        switchUtility(initialHash);
    } else {
        switchUtility('qr-generator');
    }
    const qrInput = document.getElementById('qr-input');
    const qrSizeSelect = document.getElementById('qr-size-select');
    const downloadQrBtn = document.getElementById('download-qr-btn');
    const qrColorSelect = document.getElementById('qr-color-select');
    
    if (qrInput && qrSizeSelect && downloadQrBtn && qrColorSelect) {
        qrInput.addEventListener('input', generateQrCode);
        qrColorSelect.addEventListener('input', generateQrCode); 
        
        downloadQrBtn.addEventListener('click', () => {
            const qrcodeDiv = document.getElementById('qrcode');
            const qrMessage = document.getElementById('qr-message');
            const canvas = qrcodeDiv.querySelector('canvas') || qrcodeDiv.querySelector('img'); 
            if (canvas && canvas.tagName === 'CANVAS') {
                const dataURL = canvas.toDataURL("image/png");
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = `qrcode_${qrSizeSelect.value}_${qrColorSelect.value.replace('#', '')}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                qrMessage.textContent = 'Спочатку згенеруйте QR-код.';
            }
        });
        qrInput.value = '';
        generateQrCode(); 
    }
    const markdownInput = document.getElementById('markdown-input');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    if (markdownInput && copyHtmlBtn) {
        markdownInput.addEventListener('input', updateMarkdownConversion);
        copyHtmlBtn.addEventListener('click', () => {
            const htmlOutput = document.getElementById('html-output');
            if (!htmlOutput) return;
            navigator.clipboard.writeText(htmlOutput.value).then(() => {
                 copyHtmlBtn.textContent = 'Скопійовано! ✅';
                 setTimeout(() => { copyHtmlBtn.textContent = 'Копіювати HTML'; }, 2000);
            }).catch(err => {
                htmlOutput.select();
                document.execCommand('copy');
                copyHtmlBtn.textContent = 'Скопійовано! (Fallback) ✅';
                setTimeout(() => { copyHtmlBtn.textContent = 'Копіювати HTML'; }, 2000);
            });
        });
        markdownInput.value = '';
        updateMarkdownConversion();
    }
    const unitValue = document.getElementById('unit-value');
    const unitFrom = document.getElementById('unit-from');
    const unitTo = document.getElementById('unit-to');
    if (unitValue && unitFrom && unitTo) {
        unitValue.value = '1'; 
        [unitValue, unitFrom, unitTo].forEach(element => {
            element.addEventListener('input', performConversion);
            element.addEventListener('change', performConversion);
        });
        performConversion(); 
    }
    const jsonInput = document.getElementById('json-input');
    const formatJsonBtn = document.getElementById('format-json-btn');
    const validateJsonBtn = document.getElementById('validate-json-btn');
    if (jsonInput && formatJsonBtn && validateJsonBtn) {
        jsonInput.addEventListener('input', () => validateAndFormatJSON(true));
        formatJsonBtn.addEventListener('click', () => validateAndFormatJSON(true));
        validateJsonBtn.addEventListener('click', () => validateAndFormatJSON(false));
        jsonInput.value = '';
        validateAndFormatJSON(true); 
    }
});