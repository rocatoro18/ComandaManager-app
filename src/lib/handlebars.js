const {format} = ('timeago.js');


const helpers = {};
/*NO FUNCIONA BIEN, CHECAR MAS DELANTE*/
helpers.timeago = (timestamp) =>{
    return format(timestamp);
};

module.exports = helpers;