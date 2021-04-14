function validateContractSpecificationItem(good){
    const errors = {};
    if (good.name.length < 3){
        errors.name = "Некорректное наименование позиции. Длина наименования должна превышать 2 символа";
    }

    if (!good.price || good.price <= 0){
        errors.price = "Некорректная цена позиции. Введите цену";
    }

    if (!good.quantity || good.quantity <= 0){
        errors.quantity = "Некорректное количество позиции. Введите количество";
    }

    return errors;
}

function validateContract(contract){
    if (contract.number.length < 3 || !contract.date || contract.name.length < 3 || contract.goods.length === 0) return false;
    for (const good of contract.goods){
        console.log(good);
        if (Object.keys(validateContractSpecificationItem(good)).length !== 0) return false
    }

    return true;
}

export {validateContractSpecificationItem, validateContract}