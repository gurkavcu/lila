lichess.movetimeChart = function(data) {
  lichess.loadScript('/assets/javascripts/chart/common.js').done(function() {
    lichess.loadScript('/assets/javascripts/chart/division.js').done(function() {
      lichess.chartCommon('highchart').done(function() {
        lichess.movetimeChart.render = function() {
          $('#movetimes_chart:not(.rendered)').each(function() {
            var $this = $(this).addClass('rendered');
            var series = $this.data('series');
            var timeMax = parseInt($this.data('max'), 10);
            var disabled = {
              enabled: false
            };
            var noText = {
              text: null
            };
            var noAnimation = {
              animation: disabled
            };
            $this.highcharts({
              credits: disabled,
              legend: disabled,
              series: [{
                name: 'White',
                data: series.white
              }, {
                name: 'Black',
                data: series.black
              }],
              chart: {
                type: 'area',
                spacing: [2, 0, 2, 0]
              },
              tooltip: {
                formatter: function() {
                  var seconds = Math.abs(this.point.y);
                  var unit = seconds != 1 ? 'seconds' : 'second';
                  return this.point.name + '<br /><strong>' + seconds + '</strong> ' + unit;
                }
              },
              plotOptions: {
                area: {
                  fillColor: Highcharts.theme.lichess.area.white,
                  negativeFillColor: Highcharts.theme.lichess.area.black,
                  fillOpacity: 1,
                  threshold: 0,
                  lineWidth: 2,
                  color: Highcharts.theme.lichess.line.fat,
                  allowPointSelect: true,
                  column: noAnimation,
                  cursor: 'pointer',
                  events: {
                    click: function(event) {
                      if (event.point) {
                        event.point.select();
                        lichess.analyse.jumpToIndex(event.point.x);
                      }
                    }
                  },
                  marker: {
                    radius: 1,
                    states: {
                      hover: {
                        radius: 3,
                        lineColor: '#b57600',
                        fillColor: '#ffffff'
                      },
                      select: {
                        radius: 4,
                        lineColor: '#b57600',
                        fillColor: '#ffffff'
                      }
                    }
                  }
                }
              },
              title: noText,
              xAxis: {
                title: noText,
                labels: disabled,
                lineWidth: 0,
                tickWidth: 0,
                plotLines: lichess.divisionLines(
                  $this.data('division-mid'),
                  $this.data('division-end'))
              },
              yAxis: {
                title: noText,
                min: -timeMax,
                max: timeMax,
                labels: disabled,
                gridLineWidth: 0
              }
            });
          });
          lichess.analyse.onChange();
        };
        lichess.movetimeChart.render();
      });
    });
  });
};