const rulesContract = {
    number: {
        required: "Номер контракта не заполнен.",
        minLength: {
            value: 3,
            message: `Номер контракта должен состоять не менее чем из символов.`
        },
    },
    date: {
        required: "Дата заключения контракта не заполнена."
    },
    name: {
        required: "Название контракта не заполнено.",
        minLength: {
            value: 3,
            message: `Номер контракта должен состоять не менее чем из символов.`
        }
    }
}
const rulesContractSpecification = {
    name: {
        required: "Наименование позиции спецификации не заполнено.",
        minLength: {
            value: 3,
            message: "Наименование позиции должно состоять не менее чем из ${value} символов."
        }
    },
    price: {
        required: "Не указана цена позиции.",
        minValue: {
            value: 1,
            message: "Указана некорректная цена позиции. Цена позиции должна быть не менее ${value}."
        }
    },
    quantity: {
        required: "Не указано колическтво.",
        minValue: {
            value: 1,
            message: "Указано некорректное количество. Количество должно быть не менее ${value}."
        }

    }
}

function validate(rules, nameRule, checkedField){
    if(rules[nameRule].required &&
        !checkedField
    ) {
        return rules[nameRule].required;
    }else if(
        rules[nameRule].minLength &&
        checkedField !== undefined &&
        checkedField.length < rules[nameRule].minLength.value)
    {
        const message = rules[nameRule].minLength.message;
        return message.replaceAll("${value}", rules[nameRule].minLength.value);
    }else if(
        rules[nameRule].minValue &&
        checkedField !== undefined &&
        checkedField < rules[nameRule].minValue.value)
    {
        const message = rules[nameRule].minValue.message;
        return message.replaceAll("${value}", rules[nameRule].minValue.value);
    }
}

function validateContractSpecification(good, nameField){
    const errors = {};
    const rules = rulesContractSpecification;
    if (nameField){
        const error = validate(rules, nameField, good[nameField]);
        if (error) return [nameField] = error;
    }
    for (const rule in rules) {
        const error = validate(rules, rule, good[rule]);
        if (error) errors[rule] = error;
    }
    return errors;
}

function validateContract(contract){
    if (contract.number.length < 3 || !contract.date || contract.name.length < 3 || contract.goods.length === 0) return false;
    for (const good of contract.goods){
        console.log(good);
        if (Object.keys(validateContractSpecification(good)).length !== 0) return false
    }
    return true;
}

export {validateContractSpecification, validateContract, rulesContractSpecification, rulesContract}