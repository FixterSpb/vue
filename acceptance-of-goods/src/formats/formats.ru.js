const optionsFormatPrice = {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}
const optionsFormatQuantity = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
}

function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU', optionsFormatPrice).format(value)
}

function formatQuantity(value) {
    return new Intl.NumberFormat('ru-RU', optionsFormatQuantity).format(value)
}

export {formatPrice, formatQuantity};