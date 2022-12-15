const TotalizersGeneric = require("../generics/TotalizersGeneric");

class DashboardDto {
    totalizersByMonth;
    totalizersByDay;

    constructor() {
        this.totalizersByMonth = TotalizersGeneric;
        this.totalizersByDay = new Array();
    }
}

module.exports = new DashboardDto;