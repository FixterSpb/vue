const optionsFormatFloat = {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

function formatFloat(value) {
    return new Intl.NumberFormat('ru-RU', optionsFormatFloat).format(value)
}

export {formatFloat};