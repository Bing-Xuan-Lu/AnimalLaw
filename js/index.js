$(function () {
  //alert(123);
  $("#marquee").marquee({
    speed: 6000,
    gap: 60,
    direction: "left",
    duplicated: true,
    delayBeforeStart: 0,
  });

  let _queryTableConfig = {
    "autoWidth": true,
    "deferRender": false,
    "info": false,
    "lengthChange": true,
    "ordering": true,
    "paging": true,
    "processing": true,
    "scrollX": false,
    "searching": false,
    "serverSide": false,
    "stateSave": false,
    "destroy": true,
    "displayStart": 0,
    "orderCellsTop": false,
    "orderClasses": false,
    "orderMulti": false,
    "pageLength": 10,
    "retrieve": false,
    "scrollCollapse": false,
    "searchDelay": 0,
    "stateDuration": 0,
    "tabIndex": 0,
    "language": {
        "zeroRecords": "沒有符合的結果",
        "url": "Scripts/datatables-zh-TW.js"
    }
};
  $('#news').DataTable(_queryTableConfig);
});
