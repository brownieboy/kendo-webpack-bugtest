import 'kendo.datepicker.js';

class DatePickerField {
	constructor(configObj) {
		console.log("constructor called");

		$("#testpicker").kendoDatePicker({});
		console.log("date picker called");
	}
}

export default DatePickerField;