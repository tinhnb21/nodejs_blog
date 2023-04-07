const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const isValid = (field === sort.column && ['desc', 'asc'].includes(sort.type));
        const sortType = isValid ? sort.type : 'default';
        const icons = {
            default: '<img src="/img/elevator.png" width="20px" />',
            asc: '<img src="/img/arrow-up.png" width="20px" />',
            desc: '<img src="/img/arrow-down.png" width="20px" />',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        };

        const icon = icons[sortType];
        const type = types[sortType];

        //bảo mật
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
        const output = `<a href="${href}">${icon}</a>`;
        return new Handlebars.SafeString(output);
    }
}