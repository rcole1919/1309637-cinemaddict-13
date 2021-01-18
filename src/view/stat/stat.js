import {createStatTemplate} from './stat-template';
import {getChartData} from '../../utils/common';
import {BAR_HEIGHT} from '../../const';
import AbstractView from '../abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getFiltredWatchedFilms} from '../../utils/filter';

const renderChart = (ctx, films) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getChartData(films).labels,
      datasets: [{
        data: getChartData(films).data,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Stat extends AbstractView {
  constructor(films, currentStatFilterType) {
    super();
    this._films = films;
    this._currentStatFilterType = currentStatFilterType;
    this._ctx = this.getElement().querySelector(`.statistic__chart`);
    this._ctx.height = BAR_HEIGHT * 5;

    this._setChart();
  }

  getTemplate() {
    return createStatTemplate(this._films, this._currentStatFilterType);
  }

  _setChart() {
    if (this._films.length !== 0) {
      renderChart(this._ctx, getFiltredWatchedFilms(this._films, this._currentStatFilterType));
    }
  }
}
