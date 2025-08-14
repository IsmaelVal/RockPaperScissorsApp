 /**
 * Temperature Representation.
 * js doc, formato para documentar en js
 * @constructor
 * @param {number} value - The temperature value.
 * @param {string} unit - The temperature unit. 
 *        Valid values: CELSIUS or FAHRENHEIT.
 */
exports.TemperatureVO = function (value, unit) {
    this.value = value;
    this.unit = unit;
};