document.addEventListener('DOMContentLoaded', () => {
    
    // --- ДАНІ ДЛЯ ПЕРЕКЛАДУ (i18n) ---
    const translations = {
        'ua': {
            'page_title': 'Веб-утиліти',
            'sidebar_header': 'Інструменти',
            'nav_qr': 'Генератор QR-кодів',
            'nav_md': 'Markdown до HTML',
            'nav_unit': 'Конвертер Одиниць',
            'nav_json': 'Валідатор JSON',
            
            'qr_title': 'Генератор QR-кодів',
            'qr_input_label': 'Текст або URL:',
            'qr_input_placeholder': 'Введіть текст або URL...',
            'qr_color_label': 'Колір коду:',
            'qr_size_label': 'Розмір завантаження:',
            'qr_size_small': 'Малий (128x128)',
            'qr_size_medium': 'Середній (256x256)',
            'qr_size_large': 'Великий (512x512)',
            'qr_download_btn': 'Завантажити',
            'qr_error_lib': 'Помилка: Бібліотека QRCode не завантажена.',
            'qr_error_gen': 'Помилка генерації QR-коду.',
            'qr_download_placeholder': 'Спочатку згенеруйте QR-код.',
            
            'md_title': 'Markdown до HTML',
            'md_input_label': 'Вхідний Markdown:',
            'md_input_placeholder': 'Введіть текст у форматі Markdown...',
            'md_output_label': 'Вихідний HTML:',
            'md_output_placeholder': 'HTML результат...',
            'md_copy_btn': 'Копіювати HTML',
            'md_copy_success': 'Скопійовано! ✅',
            'md_copy_fallback': 'Скопійовано! (Fallback) ✅',

            'unit_title': 'Конвертер Одиниць Вимірювання',
            'unit_value_label': 'Значення:',
            'unit_from_label': 'З:',
            'unit_to_label': 'В:',
            'unit_group_length': 'Довжина',
            'unit_group_area': 'Площа',
            'unit_group_mass': 'Вага',
            'unit_group_volume': "Об'єм",
            'unit_group_temp': 'Температура',
            'unit_default_result': 'Результат:', 
            'unit_err_number': 'Будь ласка, введіть числове значення.',
            'unit_err_select': (type) => `Виберіть одиницю для конвертації з категорії "${type}".`,
            'unit_err_convert': 'Помилка: неможливо конвертувати.',
            'unit_err_conversion': 'Помилка перетворення.',
            'unit_m': 'Метри (m)',
            'unit_km': 'Кілометри (km)',
            'unit_mi': 'Милі (mi)',
            'unit_ft': 'Фути (ft)',
            'unit_sqm': 'Кв. Метри (м²)',
            'unit_sqkm': 'Кв. Кілометри (км²)',
            'unit_acre': 'Акри',
            'unit_ha': 'Гектари (га)',
            'unit_kg': 'Кілограми (kg)',
            'unit_g': 'Грами (g)',
            'unit_lb': 'Фунти (lb)',
            'unit_oz': 'Унції (oz)',
            'unit_l': 'Літри (L)',
            'unit_ml': 'Мілілітри (mL)',
            'unit_gal': 'Галони (gal)',
            'unit_m3': 'Куб. Метри (м³)',
            'unit_C': 'Цельсій (°C)',
            'unit_F': 'Фаренгейт (°F)',
            'unit_K': 'Кельвін (K)',

            'json_title': 'Валідатор / Форматер JSON',
            'json_input_label': 'Вставте код JSON тут:',
            'json_input_placeholder': 'Вставте код JSON тут...',
            'json_format_btn': 'Форматувати JSON',
            'json_validate_btn': 'Валідувати JSON',
            'json_output_label': 'Результат:',
            'json_status_empty': 'Вставте JSON код.',
            'json_status_valid': 'JSON валідний та відформатовано. ✅',
            'json_status_error': (message) => `Помилка валідації JSON: ${message}`,
            
            'theme_toggle_title_light': 'Перемкнути на темну тему',
            'theme_toggle_title_dark': 'Перемкнути на світлу тему'
        },
        'en': {
            'page_title': 'Web Utilities',
            'sidebar_header': 'Utilities',
            'nav_qr': 'QR Code Generator',
            'nav_md': 'Markdown to HTML',
            'nav_unit': 'Unit Converter',
            'nav_json': 'JSON Validator',

            'qr_title': 'QR Code Generator',
            'qr_input_label': 'Text or URL:',
            'qr_input_placeholder': 'Enter text or URL...',
            'qr_color_label': 'Code Color:',
            'qr_size_label': 'Download Size:',
            'qr_size_small': 'Small (128x128)',
            'qr_size_medium': 'Medium (256x256)',
            'qr_size_large': 'Large (512x512)',
            'qr_download_btn': 'Download',
            'qr_error_lib': 'Error: QRCode library not loaded.',
            'qr_error_gen': 'QR code generation error.',
            'qr_download_placeholder': 'Generate QR code first.',

            'md_title': 'Markdown to HTML',
            'md_input_label': 'Markdown Input:',
            'md_input_placeholder': 'Enter Markdown text...',
            'md_output_label': 'HTML Output:',
            'md_output_placeholder': 'HTML result...',
            'md_copy_btn': 'Copy HTML',
            'md_copy_success': 'Copied! ✅',
            'md_copy_fallback': 'Copied! (Fallback) ✅',

            'unit_title': 'Unit Converter',
            'unit_value_label': 'Value:',
            'unit_from_label': 'From:',
            'unit_to_label': 'To:',
            'unit_group_length': 'Length',
            'unit_group_area': 'Area',
            'unit_group_mass': 'Mass',
            'unit_group_volume': 'Volume',
            'unit_group_temp': 'Temperature',
            'unit_default_result': 'Result:', 
            'unit_err_number': 'Please enter a numeric value.',
            'unit_err_select': (type) => `Please select a unit to convert from the "${type}" category.`,
            'unit_err_convert': 'Error: Cannot convert.',
            'unit_err_conversion': 'Conversion error.',
            'unit_m': 'Meters (m)',
            'unit_km': 'Kilometers (km)',
            'unit_mi': 'Miles (mi)',
            'unit_ft': 'Feet (ft)',
            'unit_sqm': 'Square Meters (m²)',
            'unit_sqkm': 'Square Kilometers (km²)',
            'unit_acre': 'Acres',
            'unit_ha': 'Hectares (ha)',
            'unit_kg': 'Kilograms (kg)',
            'unit_g': 'Grams (g)',
            'unit_lb': 'Pounds (lb)',
            'unit_oz': 'Ounces (oz)',
            'unit_l': 'Liters (L)',
            'unit_ml': 'Milliliters (mL)',
            'unit_gal': 'Gallons (gal)',
            'unit_m3': 'Cubic Meters (m³)',
            'unit_C': 'Celsius (°C)',
            'unit_F': 'Fahrenheit (°F)',
            'unit_K': 'Kelvin (K)',

            'json_title': 'JSON Validator / Formatter',
            'json_input_label': 'Paste JSON code here:',
            'json_input_placeholder': 'Paste JSON code here...',
            'json_format_btn': 'Format JSON',
            'json_validate_btn': 'Validate JSON',
            'json_output_label': 'Result:',
            'json_status_empty': 'Paste JSON code.',
            'json_status_valid': 'JSON is valid and formatted. ✅',
            'json_status_error': (message) => `JSON validation error: ${message}`,

            'theme_toggle_title_light': 'Switch to dark theme',
            'theme_toggle_title_dark': 'Switch to light theme'
        }
    };
    
    // --- ЗМІННІ І СХОВИЩЕ ---
    let currentLang = localStorage.getItem('lang') || 'en';
    // За замовчуванням тема світла, якщо інше не збережено в localStorage
    let currentTheme = localStorage.getItem('theme') || 'light';

    // --- ЛОГІКА ТЕМИ ---

    function setTheme(theme) {
        console.log("setTheme() called. Attempting to set theme to:", theme); // Діагностичний лог
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        const themeToggle = document.getElementById('theme-toggle');

        if (themeIcon && themeToggle) {
            // Оновлюємо іконку та title відповідно до НОВОЇ теми
            if (theme === 'dark') {
                themeIcon.textContent = '☀️'; // Сонце для переходу на світлу
                themeToggle.title = translations[currentLang]['theme_toggle_title_dark'];
            } else {
                themeIcon.textContent = '🌙'; // Місяць для переходу на темну
                themeToggle.title = translations[currentLang]['theme_toggle_title_light'];
            }
            console.log(`Theme icon set to '${themeIcon.textContent}', title set to '${themeToggle.title}'`); // Діагностичний лог
        } else {
            console.error("Theme icon or theme toggle button not found. Cannot update icon/title."); // Діагностична помилка
        }
    }
    
    function toggleTheme() {
        console.log("toggleTheme() called!"); // Діагностичний лог
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // --- ЛОГІКА МОВИ ---
    
    function setLanguage(lang) {
        console.log("setLanguage() called. Setting language to:", lang); // Діагностичний лог
        currentLang = lang;
        const t = translations[lang];

        // 1. Оновлення основного тексту
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key];
            }
        });

        // 2. Оновлення плейсхолдерів
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });

        // 3. Оновлення optgroup labels
        document.querySelectorAll('optgroup[data-i18n-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-label');
            if (t[key]) {
                 el.label = t[key];
            }
        });
        
        // 4. Оновлення кнопки мови
        const langCode = document.getElementById('lang-code');
        if (langCode) {
            langCode.textContent = lang === 'ua' ? 'EN' : 'UA';
        }
        
        // 5. Оновлення атрибуту lang та title теми
        document.documentElement.lang = lang;
        document.title = t.page_title;
        // Важливо: викликаємо setTheme тут, щоб оновити title кнопки теми відповідно до НОВОЇ мови.
        setTheme(currentTheme); 
        
        // 6. Збереження та переконвертація (для оновлення повідомлень)
        localStorage.setItem('lang', lang);
        
        // Перезапуск інструментів для оновлення відповідних повідомлень
        if (activeUtilityId === 'unit-converter') {
            updateToOptions();
        }
        if (activeUtilityId === 'json-tools') validateAndFormatJSON(); // Без примусового форматування, тільки для оновлення повідомлення
        if (activeUtilityId === 'qr-generator') {
             // Спеціальна обробка повідомлення QR
             const qrMessage = document.getElementById('qr-message');
             if (qrMessage && qrMessage.textContent) {
                 // Тут можна додати більш розумну логіку для оновлення повідомлень,
                 // наприклад, перевіряти "ключ" повідомлення, якщо він був збережений.
                 // Для простоти, оновимо, якщо повідомлення було активним.
                 const currentMsgText = qrMessage.textContent;
                 if (currentMsgText.includes(translations['ua'].qr_error_lib.split(':')[0]) || currentMsgText.includes(translations['en'].qr_error_lib.split(':')[0])) {
                     qrMessage.textContent = t.qr_error_lib;
                 } else if (currentMsgText.includes(translations['ua'].qr_error_gen.split(':')[0]) || currentMsgText.includes(translations['en'].qr_error_gen.split(':')[0])) {
                      qrMessage.textContent = t.qr_error_gen;
                 } else if (currentMsgText.includes(translations['ua'].qr_download_placeholder.split(':')[0]) || currentMsgText.includes(translations['en'].qr_download_placeholder.split(':')[0])) {
                      qrMessage.textContent = t.qr_download_placeholder;
                 }
             }
             // Якщо QR-код показаний, перегенеруємо його, щоб оновити колір, якщо мова вплинула на палітру (хоча тут не впливає)
             // generateQrCode(); 
        }
    }
    
    function toggleLanguage() {
        console.log("toggleLanguage() called!"); // Діагностичний лог
        const newLang = currentLang === 'ua' ? 'en' : 'ua';
        setLanguage(newLang);
    }

    // --- ДАНІ КОНВЕРТЕРА ОДИНИЦЬ ---
    const unitConversionData = {
        'length': { 'm': 1, 'km': 1000, 'mi': 1609.34, 'ft': 0.3048 }, 
        'area': { 'sqm': 1, 'sqkm': 1000000, 'acre': 4046.86, 'ha': 10000 }, 
        'mass': { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 },
        'volume': { 'l': 1, 'ml': 0.001, 'gal': 3.78541, 'm3': 1000 },
        'temperature': { 'C': true, 'F': true, 'K': true }
    };

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

        // Зберігаємо поточне "до" значення, щоб спробувати його відновити
        const tempCurrentToUnit = unitTo.value;

        unitTo.innerHTML = '';
        const optgroups = unitFrom.querySelectorAll('optgroup');
        let foundMatch = false;

        optgroups.forEach(group => {
            const groupType = group.getAttribute('data-unit-type');
            if (groupType === selectedType) {
                const newGroup = document.createElement('optgroup');
                newGroup.label = group.label;
                newGroup.setAttribute('data-unit-type', groupType);
                const i18nKey = group.getAttribute('data-i18n-label');
                if (i18nKey) {
                    newGroup.setAttribute('data-i18n-label', i18nKey);
                }
                
                group.querySelectorAll('option').forEach(option => {
                    // Не додавати ту саму одиницю, що "з"
                    if (option.value === selectedFromUnit) { return; }
                    
                    const newOption = document.createElement('option');
                    newOption.value = option.value;
                    
                    const i18nKey = option.getAttribute('data-i18n');
                    if (i18nKey) {
                        newOption.setAttribute('data-i18n', i18nKey);
                        newOption.textContent = translations[currentLang][i18nKey] || option.textContent;
                    } else {
                        newOption.textContent = option.textContent;
                    }
                    
                    if (newOption.value === tempCurrentToUnit) {
                        newOption.selected = true; // Спроба зберегти вибір
                        foundMatch = true;
                    }
                    newGroup.appendChild(newOption);
                });
                
                if (newGroup.children.length > 0) { unitTo.appendChild(newGroup); }
            }
        });
        
        // Якщо попереднє "до" значення не було знайдено або не було жодного елемента, вибираємо перший
        if (!foundMatch && unitTo.options.length > 0) { unitTo.selectedIndex = 0; }

        performConversion();
    }

    function performConversion() {
        const unitValue = document.getElementById('unit-value');
        const unitFrom = document.getElementById('unit-from');
        const unitTo = document.getElementById('unit-to');
        const unitResult = document.getElementById('unit-result');
        if (!unitValue || !unitFrom || !unitTo || !unitResult) return;

        const t = translations[currentLang];
        const value = parseFloat(unitValue.value);
        const from = unitFrom.value;
        const to = unitTo.value;
        const type = getUnitType(from);
        
        if (isNaN(value) || value < 0) {
            unitResult.textContent = t.unit_err_number;
            return;
        }
        
        if (!to) {
            // Оновлено: звертаємося до translations напряму, оскільки label може бути ще не повністю оновлено DOM
            const groupKey = `unit_group_${type}`;
            const groupName = t[groupKey] || type;
            unitResult.textContent = t.unit_err_select(groupName); 
            return;
        }

        let result = null; // Змінено на null, щоб чітко відрізняти від 0

        if (type === 'temperature') {
            if (from === to) result = value;
            else {
                let K_val; // Значення в Кельвінах
                if (from === 'C') K_val = value + 273.15;
                else if (from === 'F') K_val = (value - 32) * 5/9 + 273.15;
                else if (from === 'K') K_val = value;
                else K_val = NaN; // Для невідомого "з"
                
                if (isNaN(K_val)) {
                    unitResult.textContent = t.unit_err_conversion;
                    return;
                }

                if (to === 'C') result = K_val - 273.15;
                else if (to === 'F') result = (K_val - 273.15) * 9/5 + 32;
                else if (to === 'K') result = K_val;
                else result = NaN; // Для невідомого "в"
            }
        } else if (type && unitConversionData[type] && unitConversionData[type][from] && unitConversionData[type][to]) {
            const factors = unitConversionData[type];
            const valueInBase = value * factors[from];
            result = valueInBase / factors[to];
        } else {
            unitResult.textContent = t.unit_err_convert;
            return;
        }
        
        if (result !== null && !isNaN(result)) {
            const formattedResult = result.toFixed(result < 1 && result !== 0 ? 6 : 4).replace(/\.0+$/, ''); 
            unitResult.textContent = `${t.unit_default_result} ${value} ${from} = ${formattedResult} ${to}`;
        } else {
            unitResult.textContent = t.unit_err_conversion;
        }
    }
    
    // --- ЛОГІКА ПЕРЕМИКАННЯ ІНСТРУМЕНТІВ ---
    const navLinks = document.querySelectorAll('.nav-link');
    const utilityCards = document.querySelectorAll('.utility-card');
    let activeUtilityId = 'qr-generator'; 

    const switchUtility = (targetId) => {
        console.log("Switching utility to:", targetId); // Діагностичний лог
        utilityCards.forEach(card => { card.style.display = 'none'; });
        navLinks.forEach(link => { link.classList.remove('active'); });
        const targetCard = document.getElementById(targetId);
        if (targetCard) { targetCard.style.display = 'flex'; }
        document.querySelector(`.nav-link[data-target="${targetId}"]`)?.classList.add('active');
        activeUtilityId = targetId;
        
        // Виклик ініціалізаційних/оновлювальних функцій для кожного інструменту
        if (targetId === 'qr-generator') {
            const qrInputEl = document.getElementById('qr-input');
            if (qrInputEl) qrInputEl.value = qrInputEl.value || ''; // Щоб не було null
            generateQrCode();
        } else if (targetId === 'markdown-converter') {
            const mdInputEl = document.getElementById('markdown-input');
            if (mdInputEl) mdInputEl.value = mdInputEl.value || '';
            updateMarkdownConversion();
        } else if (targetId === 'unit-converter') {
            initUnitConverter();
        } else if (targetId === 'json-tools') {
            const jsonInputEl = document.getElementById('json-input');
            if (jsonInputEl) jsonInputEl.value = jsonInputEl.value || '';
            validateAndFormatJSON(true); // Форматуємо при перемиканні, якщо є текст
        }
    };
    
    // Обробник для навігації
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchUtility(link.getAttribute('data-target')); 
        });
    });
    
    function initUnitConverter() {
        console.log("Initializing Unit Converter."); // Діагностичний лог
        const unitValue = document.getElementById('unit-value');
        const unitFrom = document.getElementById('unit-from');
        const unitTo = document.getElementById('unit-to'); // Додано сюди

        if (unitValue && unitFrom && unitTo) { // Перевірка всіх трьох
            // При першому запуску, якщо значення не встановлено, встановлюємо 1
            if (!unitValue.value) unitValue.value = '1'; 
            
            // Додали перевірку, щоб не додавати слухачі кілька разів, якщо функція викликається повторно
            // Це не зовсім потрібно, якщо switchUtility забезпечує одноразову ініціалізацію,
            // але є безпечним патерном для "init" функцій.
            if (!unitFrom.dataset.listenersAdded) {
                unitFrom.addEventListener('change', updateToOptions);
                unitFrom.dataset.listenersAdded = true;
            }
            if (!unitTo.dataset.listenersAdded) {
                 unitTo.addEventListener('change', performConversion);
                 unitTo.dataset.listenersAdded = true;
            }
            if (!unitValue.dataset.listenersAdded) {
                unitValue.addEventListener('input', performConversion);
                unitValue.addEventListener('change', performConversion); // change для вводу з клавіатури або стрілок
                unitValue.dataset.listenersAdded = true;
            }

            updateToOptions(); // Оновлюємо опції "В" та виконуємо конвертацію
        } else {
             console.error("Unit converter elements not found (unit-value, unit-from, or unit-to).");
        }
    }
    
    function validateAndFormatJSON(format = false) {
        const jsonInput = document.getElementById('json-input');
        const jsonOutputPre = document.getElementById('json-output-pre');
        const jsonStatus = document.getElementById('json-status');
        if (!jsonInput || !jsonOutputPre || !jsonStatus) return;
        
        const t = translations[currentLang];
        const jsonText = jsonInput.value.trim();
        jsonOutputPre.textContent = '';
        jsonStatus.style.color = 'red';
        
        if (!jsonText) {
            jsonStatus.textContent = t.json_status_empty;
            jsonInput.classList.remove('is-valid', 'is-invalid');
            return;
        }
        
        try {
            const jsonObject = JSON.parse(jsonText);
            const formattedJson = JSON.stringify(jsonObject, null, 2);
            jsonOutputPre.textContent = formattedJson;
            jsonStatus.textContent = t.json_status_valid;
            jsonStatus.style.color = 'green';
            jsonInput.classList.remove('is-invalid');
            jsonInput.classList.add('is-valid');
        } catch (e) {
            jsonStatus.textContent = t.json_status_error(e.message);
            jsonOutputPre.textContent = '';
            jsonInput.classList.remove('is-valid');
            jsonInput.classList.add('is-invalid');
        }
    }
    
    function generateQrCode() {
        const qrInput = document.getElementById('qr-input');
        const qrcodeDiv = document.getElementById('qrcode');
        const downloadQrBtn = document.getElementById('download-qr-btn');
        const qrMessage = document.getElementById('qr-message');
        const qrColorSelect = document.getElementById('qr-color-select'); 
        
        if (!qrInput || !qrcodeDiv || !downloadQrBtn || !qrMessage || !qrColorSelect) {
            console.error("One or more QR code elements not found.");
            return;
        }
        
        const t = translations[currentLang];
        const text = qrInput.value.trim();
        qrcodeDiv.innerHTML = ''; // Очищаємо попередній QR-код
        downloadQrBtn.style.display = 'none';
        qrMessage.textContent = '';
        
        const size = parseInt(document.getElementById('qr-size-select')?.value || '256', 10);
        const selectedColor = qrColorSelect.value;
        
        if (typeof QRCode === 'undefined') {
            qrMessage.textContent = t.qr_error_lib;
            return;
        }
        if (text) {
            try {
                new QRCode(qrcodeDiv, {
                    text: text,
                    width: size, // Використовуємо тут розмір для генерації, щоб мати великий canvas
                    height: size,
                    colorDark: selectedColor, 
                    colorLight: "#ffffff", 
                    correctLevel: QRCode.CorrectLevel.H
                });
                downloadQrBtn.style.display = 'block';
            } catch (error) {
                qrMessage.textContent = t.qr_error_gen;
                console.error("Error generating QR code:", error);
            }
        } else {
             // Якщо текст порожній, не показуємо кнопку завантаження
             downloadQrBtn.style.display = 'none';
        }
    }

    function updateMarkdownConversion() {
        const markdownInput = document.getElementById('markdown-input');
        const htmlOutput = document.getElementById('html-output');
        if (typeof marked === 'undefined' || !markdownInput || !htmlOutput) {
            console.error("Markdown elements or 'marked' library not found.");
            return;
        } 
        const markdownText = markdownInput.value;
        if (markdownText.trim()) {
            const htmlText = marked.parse(markdownText);
            htmlOutput.value = htmlText;
        } else {
            htmlOutput.value = '';
        }
    }
    
    // --- ПОЧАТКОВА ІНІЦІАЛІЗАЦІЯ ---
    
    // 1. Ініціалізація теми та мови
    setTheme(currentTheme); // Перший виклик для застосування початкової теми
    setLanguage(currentLang); // Застосування мови, яке також оновить title кнопки теми

    // 2. Обробники кнопок теми та мови
    const themeToggleBtn = document.getElementById('theme-toggle');
    const languageToggleBtn = document.getElementById('language-toggle');

    console.log("Found theme-toggle:", themeToggleBtn); // Діагностичний лог
    console.log("Found language-toggle:", languageToggleBtn); // Діагностичний лог

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    } else {
        console.error("Елемент #theme-toggle не знайдено, неможливо призначити слухача.");
    }

    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', toggleLanguage);
    } else {
        console.error("Елемент #language-toggle не знайдено, неможливо призначити слухача.");
    }
    
    // 3. Ініціалізація інструментів
    const initialUtility = 'qr-generator'; 
    switchUtility(initialUtility);
    
    const qrInput = document.getElementById('qr-input');
    const qrSizeSelect = document.getElementById('qr-size-select');
    const downloadQrBtn = document.getElementById('download-qr-btn');
    const qrColorSelect = document.getElementById('qr-color-select');
    
    if (qrInput && qrSizeSelect && downloadQrBtn && qrColorSelect) {
        qrInput.addEventListener('input', generateQrCode);
        qrColorSelect.addEventListener('input', generateQrCode); 
        qrSizeSelect.addEventListener('change', generateQrCode); // Додано для оновлення QR при зміні розміру для завантаження
        
        downloadQrBtn.addEventListener('click', () => {
            const qrcodeDiv = document.getElementById('qrcode');
            const qrMessage = document.getElementById('qr-message');
            // Перевіряємо, чи є в qrcodeDiv canvas (створюється qrcodejs)
            const canvas = qrcodeDiv ? qrcodeDiv.querySelector('canvas') : null; 
            const t = translations[currentLang];

            if (canvas) {
                // Розмір для завантаження беремо з селектора
                const downloadSize = parseInt(qrSizeSelect.value, 10);
                
                // Створимо тимчасовий canvas для потрібного розміру завантаження
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = downloadSize;
                tempCanvas.height = downloadSize;
                const tempCtx = tempCanvas.getContext('2d');
                
                // Малюємо вміст існуючого canvas на тимчасовий з потрібним розміром
                tempCtx.drawImage(canvas, 0, 0, downloadSize, downloadSize);

                const dataURL = tempCanvas.toDataURL("image/png");
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = `qrcode_${downloadSize}x${downloadSize}_${qrColorSelect.value.replace('#', '')}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                qrMessage.textContent = t.qr_download_placeholder;
            }
        });
    } else {
        console.error("One or more QR code UI elements not found for event listeners.");
    }

    const markdownInput = document.getElementById('markdown-input');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    if (markdownInput && copyHtmlBtn) {
        markdownInput.addEventListener('input', updateMarkdownConversion);
        copyHtmlBtn.addEventListener('click', () => {
            const htmlOutput = document.getElementById('html-output');
            const t = translations[currentLang];
            if (!htmlOutput) {
                console.error("HTML output element not found for coping.");
                return;
            }
            navigator.clipboard.writeText(htmlOutput.value).then(() => {
                 copyHtmlBtn.textContent = t.md_copy_success;
                 setTimeout(() => { copyHtmlBtn.textContent = t.md_copy_btn; }, 2000);
            }).catch(err => {
                console.warn('Failed to copy using clipboard API, falling back to document.execCommand:', err);
                htmlOutput.select();
                try {
                    document.execCommand('copy');
                    copyHtmlBtn.textContent = t.md_copy_fallback;
                    setTimeout(() => { copyHtmlBtn.textContent = t.md_copy_btn; }, 2000);
                } catch (fallbackErr) {
                    console.error('Fallback copy also failed:', fallbackErr);
                    // Додайте тут повідомлення про помилку для користувача, якщо потрібно
                }
            });
        });
    } else {
        console.error("Markdown input or copy button not found for event listeners.");
    }
    
    // JSON tools event listeners
    const jsonInput = document.getElementById('json-input');
    const formatJsonBtn = document.getElementById('format-json-btn');
    const validateJsonBtn = document.getElementById('validate-json-btn');
    if (jsonInput && formatJsonBtn && validateJsonBtn) {
        jsonInput.addEventListener('input', () => validateAndFormatJSON(true)); // Форматувати при введенні
        formatJsonBtn.addEventListener('click', () => validateAndFormatJSON(true));
        validateJsonBtn.addEventListener('click', () => validateAndFormatJSON(false)); // Тільки валідувати
    } else {
        console.error("JSON tool elements not found for event listeners.");
    }
});