

const getListFiltersProducts = (state) => {
    const { sortOptions, categoriesOptions, companiesOptions, price, maxPrice, sort, categories, companies } = state
    let counter = 0;
    return [
        {
            inputType: 'radio',
            list: sortOptions,
            filtersChoosed: sort,
            name: 'sort',
            listId: ++counter
        },
        {
            inputType: 'checkbox',
            list: categoriesOptions,
            filtersChoosed: categories,
            name: 'categories',
            listId: ++counter
        },
        {
            inputType: 'checkbox',
            list: companiesOptions,
            filtersChoosed: companies,
            name: 'companies',
            listId: ++counter
        },
        {
            inputType: 'range',
            value: price,
            maxPrice,
            name: 'price',
            listId: ++counter
        }
    ]
}

const getListFiltersOrders = (state) => {
    const { categoriesOptions, companiesOptions, citiesOptions, categories, companies, cities, month } = state
    let counter = 0;
    return [
        {
            inputType: 'checkbox',
            list: categoriesOptions,
            filtersChoosed: categories,
            name: 'categories',
            listId: ++counter
        },
        {
            inputType: 'checkbox',
            list: companiesOptions,
            filtersChoosed: companies,
            name: 'companies',
            listId: ++counter
        },
        {
            inputType: 'checkbox',
            list: citiesOptions,
            filtersChoosed: cities,
            name: 'cities',
            listId: ++counter
        },
        {
            inputType: 'month',
            name: 'month',
            listId: ++counter,
            value: typeof month === 'object' ? `${month.getFullYear()}-${month.getMonth() + 1}` : month
        }

    ]
}
const filtersList = {
    getListFiltersProducts,
    getListFiltersOrders
}


export default filtersList