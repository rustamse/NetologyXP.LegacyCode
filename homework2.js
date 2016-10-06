
// Шов. Зависимость убрана благодаря передачи в функцию не конкретного экземпляра, а "интерфейса" (незнаю как на js такое называется)
function formSetEditReport(idReport, reportPlugin) {
    var report = {
        'type': reportPlugin.defaultReportType,
        'format': reportPlugin.defaultReportFormat,
        'description': '',
        'period': reportPlugin.defaultPeriod,
        'hour': reportPlugin.defaultHour,
        'reports': []
    };

    if (idReport > 0) {
        report = reportPlugin.reportList[idReport];
        $('#report_submit').val(reportPlugin.updateReportString);
    }
    else {
        $('#report_submit').val(reportPlugin.createReportString);
    }

    toggleReportType(report.type);

    $('#report_description').html(report.description);
    $('#report_segment').find('option[value=' + report.idsegment + ']').prop('selected', 'selected');
    $('#report_type').find('option[value=' + report.type + ']').prop('selected', 'selected');
    $('#report_period').find('option[value=' + report.period + ']').prop('selected', 'selected');
    $('#report_hour').val(report.hour);
    $('[name=report_format].' + report.type + ' option[value=' + report.format + ']').prop('selected', 'selected');

    $('[name=reportsList] input').prop('checked', false);

    var key;
    for (key in report.reports) {
        $('.' + report.type + ' [report-unique-id=' + report.reports[key] + ']').prop('checked', 'checked');
    }

    updateReportParametersFunctions[report.type](report.parameters);

    $('#report_idreport').val(idReport);
}

// для продакшн кода
var reportPluginForProduction = ReportPlugin;
formSetEditReport(idReport, reportPluginForProduction);


// для тестирования
var reportPluginForTesting = {
    defaultReportType: "simple",
    defaultReportFormat: "text",
    defaultPeriod: "24",
    defaultHour: "12",
    updateReportString: function() {

    },
    createReportString: function () {

    },

    reportList: [{idReport: 1}]
};
formSetEditReport(idReport, reportPluginForTesting);