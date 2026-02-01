// Language Switcher for BMP Company S.A.S.

// Complete text mapping for translation
const textMap = {

};


let translations = {};

// Load translations from JSON files
async function loadTranslations(lang) {
    // try {
    //     const response = await fetch(`assets/data/${lang}.json`);
    //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    //     const data = await response.json();
        
    //     // Flatten the JSON structure for easier lookup
    //     const flattened = {};
        
    //     function flatten(obj, prefix = '') {
    //         for (const key in obj) {
    //             if (typeof obj[key] === 'object' && obj[key] !== null) {
    //                 flatten(obj[key], prefix + key + '.');
    //             } else {
    //                 flattened[prefix + key] = obj[key];
    //             }
    //         }
    //     }
        
    //     flatten(data);
        
    //     return flattened;
    // } catch (error) {
    //     console.error('Error loading translations:', error);
    //     return {};
    // }
}

// Combine JSON translations with manual textMap
function combineTranslations(lang) {
    const jsonTranslations = translations[lang] || {};
    const manualTranslations = textMap[lang] || {};
    
    return { ...manualTranslations, ...jsonTranslations };
}

// Toggle dropdown visibility
// function toggleLangDropdown(event) {
//     if (event) event.stopPropagation();
//     document.querySelectorAll('.lang-options').forEach(d => d.classList.toggle('show'));
// }
function toggleLangDropdown(event) {
    if (event) event.stopPropagation();
    // Cierra todos los dropdowns
    document.querySelectorAll('.lang-options').forEach(d => d.classList.remove('show'));
    
    // Abre solo el dropdown del header actual
    const dropdown = event.currentTarget.nextElementSibling;
    dropdown.classList.add('show');
}
// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.lang-dropdown')) {
        document.querySelectorAll('.lang-options').forEach(d => d.classList.remove('show'));
    }
});

// Set language
// function setLanguage(lang) {
//     currentLanguage = lang;
//     localStorage.setItem('bmp_language', lang);
    
//     // Update flag and language code in ALL selectors (using classes, not IDs)
//     const flagUrl = lang === 'es' ? 'https://flagcdn.com/w20/co.png' : 'https://flagcdn.com/w20/us.png';
//     const langCode = lang === 'es' ? 'ES' : 'EN';
    
//     document.querySelectorAll('.current-flag').forEach(flag => {
//         flag.src = flagUrl;
//     });
    
//     document.querySelectorAll('.current-lang').forEach(text => {
//         text.textContent = langCode;
//     });
    
//     // Update active state in options
//     document.querySelectorAll('.lang-option').forEach(option => {
//         option.classList.remove('active');
//         if (option.getAttribute('data-lang') === lang) {
//             option.classList.add('active');
//         }
//     });
    
//     // Apply translations
//     applyTranslations(lang);
    
//     // Close dropdowns
//     document.querySelectorAll('.lang-options').forEach(d => d.classList.remove('show'));
    
//     // Update HTML lang attribute
//     document.documentElement.lang = lang;
// }
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('bmp_language', lang);
    
    const flagUrl = lang === 'es' ? 'https://flagcdn.com/w20/co.png' : 'https://flagcdn.com/w20/us.png';
    const langCode = lang === 'es' ? 'ES' : 'EN';
    
    // Actualizar TODOS los selectores (ambos headers)
    document.querySelectorAll('.lang-btn img').forEach(flag => {
        flag.src = flagUrl;
        flag.alt = langCode;
    });
    
    document.querySelectorAll('.lang-btn span').forEach(text => {
        text.textContent = langCode;
    });
    
    // Update active state
    // document.querySelectorAll('.lang-option').forEach(option => {
    //     option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    // });
    
    applyTranslations(lang);
    document.querySelectorAll('.lang-options').forEach(d => d.classList.remove('show'));
    document.documentElement.lang = lang;
}

// Apply translations to page elements
function applyTranslations(lang) {
    const dict = combineTranslations(lang);
    if (!dict) return;
    
    // Translate text nodes in common elements (improved logic)
    const selectors = 'a, span, h1, h2, h3, h4, h5, h6, p, button, label, li, div.tp-section-title, div.tp-section-subtitle';
    
    document.querySelectorAll(selectors).forEach(el => {
        // Get the direct text content without HTML
        const text = el.textContent.trim();
        if (text && dict[text]) {
            // If element has only text content, replace directly
            if (el.children.length === 0) {
                el.textContent = dict[text];
            } else {
                // For elements with children, replace text nodes carefully
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === text) {
                        node.textContent = dict[text];
                    }
                });
            }
        }
    });
    
    // Special handling for elements with specific classes and IDs
    const specificSelectors = [
        '.accordion-button',  // FAQ buttons
        '.tp-blog-title',     // Blog titles
        '.tp-blog-content-info span',  // Blog categories and dates
        '[data-translate]', 
        '.translate-text'
    ];
    
    document.querySelectorAll(specificSelectors.join(', ')).forEach(el => {
        const text = el.textContent.trim();
        if (text && dict[text]) {
            if (el.children.length === 0) {
                el.textContent = dict[text];
            } else {
                // Handle mixed content elements
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === text) {
                        node.textContent = dict[text];
                    }
                });
            }
        }
    });
    
    // Special handling for FAQ accordion content
    document.querySelectorAll('.accordion-body p').forEach(el => {
        const text = el.textContent.trim();
        if (text && dict[text]) {
            el.textContent = dict[text];
        }
    });
    
    // Translate meta description and title
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && dict[metaDescription.getAttribute('content')]) {
        metaDescription.setAttribute('content', dict[metaDescription.getAttribute('content')]);
    }
    
    const pageTitle = document.querySelector('title');
    if (pageTitle && dict[pageTitle.textContent.trim()]) {
        pageTitle.textContent = dict[pageTitle.textContent.trim()];
    }
    
    // Translate placeholders in inputs
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const placeholder = el.getAttribute('placeholder');
        if (dict[placeholder]) {
            el.setAttribute('placeholder', dict[placeholder]);
        }
    });
    
    // Debug log to help troubleshoot
    console.log(`Applied translations for language: ${lang}`);
    console.log(`Dictionary size: ${Object.keys(dict).length} translations`);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load both language files
    try {
        translations.es = await loadTranslations('es');
        translations.en = await loadTranslations('en');
        console.log('Translations loaded successfully');
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
    
    setLanguage(currentLanguage);
});

// Export for global access
window.toggleLangDropdown = toggleLangDropdown;
window.setLanguage = setLanguage;