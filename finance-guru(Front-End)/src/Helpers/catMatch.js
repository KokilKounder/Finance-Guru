const catMatch = (category) => {
    let catToColorTable = {
        "housing": "Red", 
        "transportation": "Gray",
        "entertainment": "Orange", 
        "insurance":"Blue", 
        "food": "#FFDE00", //Yellow
        "utilities": "Brown", 
        "utility": "Brown",
        "loans/debts": "Green", 
        "loans":"Green",
        "other": "#85C7F2", //Light Blue

    }

    return catToColorTable[category.toLowerCase()]
}


const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {catMatch, capitalizeFirstLetter};