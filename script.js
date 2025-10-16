document.addEventListener('DOMContentLoaded', () => {
    
    // --- ДАНІ КОНВЕРТЕРА ОДИНИЦЬ ---
    const unitConversionData = {
        // Базова одиниця: метри (m)
        'length': { 'm': 1, 'km': 1000, 'mi': 1609.34, 'ft': 0.3048 }, 
        // Базова одиниця: квадратні метри (sqm)
        'area': { 'sqm': 1, 'sqkm': 1000000, 'acre': 4046.86, 'ha': 10000 }, 
        // Базова одиниця: кілограми (kg)
        'mass': { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 },
        // Базова одиниця: літри (l)
        'volume': { 'l': 1, 'ml': 0.001, 'gal': 3.78541, 'm3': 1000 },
        // Температура (вимагає окремої функції)
        'temperature': { 'C': true, 'F': true, 'K': true }
    };

    function convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        let K; // Перетворення в Кельвіни як базову одиницю
        if (fromUnit === 'C') K = value + 273.15;
        else if (fromUnit === 'F') K = (value - 32) * 5/9 + 273.15;
        else if (fromUnit === 'K') K = value;
        else return null;

        if (toUnit === 'C') return K - 273.15;
        else if (toUnit === 'F') return (K - 273.15) * 9/5 + 32;
        else if (toUnit === 'K') return K;
        else return null;
    }

    function getUnitType(unit) {
        for (const type in unitConversionData) {
            if (unitConversionData[type][unit]) {
                return type;
            }
        }
        return null;
    }
    
    function updateToOptions() {
        const unitFrom = document.getElementById('unit-from');
        const unitTo = document.getElementById('unit-to');
        if (!unitFrom || !unitTo) return;

        const selectedFromUnit = unitFrom.value;
        const selectedType = getUnitType(selectedFromUnit);

        let currentToUnit = unitTo.value;

        // Якщо поточне 'В:' співпадає з обраним 'З:', скидаємо його.
        if (currentToUnit === selectedFromUnit) {
            currentToUnit = null; 
        }

        unitTo.innerHTML = '';
        
        const optgroups = unitFrom.querySelectorAll('optgroup');
        let foundMatch = false;

        optgroups.forEach(group => {
            const groupType = group.getAttribute('data-unit-type');
            if (groupType === selectedType) {
                const newGroup = document.createElement('optgroup');
                newGroup.label = group.label;
                newGroup.setAttribute('data-unit-type', groupType);
                
                group.querySelectorAll('option').forEach(option => {
                    // ЛОГІКА ФІЛЬТРАЦІЇ: Ігноруємо одиницю, обрану в "З"
                    if (option.value === selectedFromUnit) {
                        return; 
                    }
                    
                    const newOption = document.createElement('option');
                    newOption.value = option.value;
                    newOption.textContent = option.textContent;
                    
                    if (newOption.value === currentToUnit) {
                        newOption.selected = true;
                        foundMatch = true;
                    }
                    newGroup.appendChild(newOption);
                });
                
                if (newGroup.children.length > 0) {
                     unitTo.appendChild(newGroup);
                }
            }
        });
        
        if (!foundMatch && unitTo.options.length > 0) {
             unitTo.selectedIndex = 0;
        }

        performConversion();
    }

    function performConversion() {
        const unitValue = document.getElementById('unit-value');
        const unitFrom = document.getElementById('unit-from');
        const unitTo = document.getElementById('unit-to');
        const unitResult = document.getElementById('unit-result');
        if (!unitValue || !unitFrom || !unitTo || !unitResult) return;

        const value = parseFloat(unitValue.value);
        const from = unitFrom.value;
        const to = unitTo.value;
        const type = getUnitType(from);
        
        if (isNaN(value) || value < 0) {
            unitResult.textContent = 'Будь ласка, введіть числове значення.';
            return;
        }
        
        if (!to) {
            unitResult.textContent = `Виберіть одиницю для конвертації з категорії "${type}".`;
            return;
        }

        let result;

        if (type === 'temperature') {
            result = convertTemperature(value, from, to);
        } else if (type && unitConversionData[type]) {
            const factors = unitConversionData[type];
            const valueInBase = value * factors[from];
            result = valueInBase / factors[to];
        } else {
            unitResult.textContent = 'Помилка: неможливо конвертувати.';
            return;
        }
        
        if (result !== null && !isNaN(result)) {
            const formattedResult = result.toFixed(result < 1 ? 6 : 4).replace(/\.0+$/, ''); 
            unitResult.textContent = `Результат: ${value} ${from} = ${formattedResult} ${to}`;
        } else {
            unitResult.textContent = 'Помилка перетворення.';
        }
    }
    
    // --- ЛОГІКА ПЕРЕМИКАННЯ ІНСТРУМЕНТІВ ---

    const navLinks = document.querySelectorAll('.nav-link');
    const utilityCards = document.querySelectorAll('.utility-card');
    
    // Зберігаємо ID активної секції
    let activeUtilityId = 'qr-generator'; 

    const switchUtility = (targetId) => {
        // Оновлюємо відображення карток
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
        
        // Зберігаємо новий активний ID
        activeUtilityId = targetId;
        
        // Запуск функцій ініціалізації при перемиканні
        if (targetId === 'markdown-converter') updateMarkdownConversion();
        if (targetId === 'unit-converter') initUnitConverter(); 
        if (targetId === 'json-tools') validateAndFormatJSON(true);
    };
    
    // Обробник для навігації
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            // Тепер адреса не змінюється
            switchUtility(targetId); 
        });
    });
    
    // --- Ініціалізація інших інструментів та початковий запуск ---
    
    function initUnitConverter() {
        const unitValue = document.getElementById('unit-value');
        const unitFrom = document.getElementById('unit-from');
        
        if (unitValue && unitFrom) {
            unitValue.value = '1'; 
            
            unitFrom.addEventListener('change', updateToOptions);
            
            [unitValue, unitFrom].forEach(element => {
                element.addEventListener('input', performConversion);
                element.addEventListener('change', performConversion);
            });

            const unitTo = document.getElementById('unit-to');
            if (unitTo) {
                 unitTo.addEventListener('change', performConversion);
            }
            
            updateToOptions();
        }
    }
    
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
    
    // --- Початковий запуск ---
    // Тепер ми ігноруємо хеш і завжди починаємо з 'qr-generator'
    const initialUtility = 'qr-generator'; 
    
    switchUtility(initialUtility);
    
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
        if (activeUtilityId === 'qr-generator') {
            qrInput.value = '';
            generateQrCode(); 
        }
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
        if (activeUtilityId === 'markdown-converter') {
            markdownInput.value = '';
            updateMarkdownConversion();
        }
    }
    
    const jsonInput = document.getElementById('json-input');
    const formatJsonBtn = document.getElementById('format-json-btn');
    const validateJsonBtn = document.getElementById('validate-json-btn');
    if (jsonInput && formatJsonBtn && validateJsonBtn) {
        jsonInput.addEventListener('input', () => validateAndFormatJSON(true));
        formatJsonBtn.addEventListener('click', () => validateAndFormatJSON(true));
        validateJsonBtn.addEventListener('click', () => validateAndFormatJSON(false));
        if (activeUtilityId === 'json-tools') {
             jsonInput.value = '';
             validateAndFormatJSON(true); 
        }
    }
});