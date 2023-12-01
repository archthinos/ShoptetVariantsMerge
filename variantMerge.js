// Funkcia na extrakciu dát
function extractSelectData() {
    const selects = document.querySelectorAll('table.detail-parameters select');
    const variantsData = {};

    selects.forEach(select => {
        const { parameterId, parameterName } = select.dataset;
        const options = select.querySelectorAll('option[data-index]');
        
        const variants = Array.from(options, option => ({
            value: option.value,
            text: option.textContent.trim()
        }));

        if (variants.length > 0) {
            variantsData[parameterId] = {
                variant_id: parameterId,
                name: parameterName,
                variants,
                originalSelectName: select.name
            };
        }
    });

    return variantsData;
}

// Funkcia na získanie textu z elementu
function getElementText(baseClass, childClass) {
    const elements = document.getElementsByClassName(baseClass);
    for (let element of elements) {
        const childElement = childClass ? element.getElementsByClassName(childClass)[0] : element;
        if (childElement) {
            return childElement.textContent.trim();
        }
    }
    return '';
}

// Konverzia reťazca na variantnú kombináciu
function convertToVariantCombination(input) {
    if (typeof input !== 'string') {
        console.error('Hodnota nie je reťazec.');
        return '';
    }

    return input.split('&').filter(pair => pair.length > 0)
        .map(pair => {
            const [key, value] = pair.split('=');
            const idMatch = key.match(/\d+/);
            return idMatch ? `${idMatch[0]}-${value}` : '';
        }).join('-');
}

// Aktualizácia originálnych selectov
function updateOriginalSelects(selectedVariantCombination) {
    document.querySelectorAll('.variant-list.variant-not-chosen-anchor')
        .forEach(row => row.classList.add('variant-selected'));

    document.querySelectorAll('.parameter-dependent')
        .forEach(element => element.classList.toggle('no-display', !element.classList.contains(selectedVariantCombination)));
}

// Generovanie nového select elementu
function generateNewSelect(variantsData, availableVariants) {
    const newSelect = document.createElement('select');
    newSelect.name = 'combinedVariants';
    newSelect.appendChild(new Option('Zvoľte variantu', '', true, true));

    availableVariants.forEach(variant => {
        const parts = variant.split('-');
        const labelParts = [];
        let optionValue = '';

        for (let i = 0; i < parts.length; i += 2) {
            const id = parts[i];
            const value = parts[i + 1];
            const variantInfo = variantsData[id];
            const option = variantInfo.variants.find(opt => opt.value === value);
            if (option) {
                labelParts.push(`${variantInfo.name}: ${option.text}`);
                optionValue += `${variantInfo.originalSelectName}=${value}&`;
            }
        }
        
        const availabilityText = getElementText(variant, 'availability-label');
        const priceText = getElementText(`price-final-holder parameter-dependent ${variant}`);

        newSelect.appendChild(new Option(`${labelParts.join(', ')} - ${availabilityText} (${priceText})`, optionValue.slice(0, -1)));
    });

    newSelect.addEventListener('change', function() {
        updateOriginalSelects(this.value.split('&').map(option => option.split('=')[1]).join('-'));
    });

    return newSelect;
}

// Aktualizácia stránky
function updatePage() {
    const variantsData = extractSelectData();
    const availableVariants = shoptet.variantsUnavailable.availableVariantsResource;

    const newSelect = generateNewSelect(variantsData, availableVariants);
    document.querySelectorAll('#product-detail-form > div > div.col-xs-12.col-lg-6.p-info-wrapper > table > tbody > tr')
        .forEach(select => select.style.display = 'none');
    
    document.getElementsByClassName('availability-value')[0].style.display = 'none';
    document.querySelector('table.detail-parameters').appendChild(newSelect);
}

updatePage();