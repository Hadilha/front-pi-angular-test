import { Component, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration, ChartTypeRegistry } from "chart.js";

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements AfterViewInit {
  ngAfterViewInit() {
    const config: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: String(new Date().getFullYear()),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: String(new Date().getFullYear() - 1),
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Sales Charts",
            color: "white",
          },
          legend: {
            labels: {
              color: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            title: {
              display: false,
              text: "Month",
              color: "white",
            },
            grid: {
              display: false,
            ////  borderDash: [2],
            //  borderDashOffset: 2,
              color: "rgba(33, 37, 41, 0.3)",
            //  drawBorder: true,
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            title: {
              display: false,
              text: "Value",
              color: "white",
            },
            grid: {
          ///    borderDash: [3],
          //    borderDashOffset: 3,
           //   drawBorder: false,
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
    };

    const canvas = document.getElementById("line-chart") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      new Chart(ctx, config);
    }
  }
}
