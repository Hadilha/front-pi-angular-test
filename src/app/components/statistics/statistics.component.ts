import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ProgramStat, StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  today: Date = new Date(); // Pour afficher la date de mise à jour
  public barChartData!: ChartData<'bar', number[], string>;
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  public lineChartData!: ChartData<'line', number[], string>;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  constructor(private stats: StatisticsService) {}

  ngOnInit(): void {
    this.stats.getProgramStatistics().subscribe(data => {
      const labels = data.map(s => s.programTitle);
      const parts  = data.map(s => s.participantsCount);
      const conts  = data.map(s => s.contentCount);

      this.barChartData = { labels, datasets: [{ data: parts, label: 'Participants' }] };
      this.lineChartData = { labels, datasets: [{ data: conts, label: 'Contenus' }] };
    });
  }
   // Méthode pour exporter les données
   exportData(chartType: string) {
    // Implémentez votre logique d'export ici
    console.log(`Export des données ${chartType}`);
    
    // Exemple pour exporter en CSV
    let csvContent = "";
    const data = chartType === 'participants' ? this.barChartData : this.lineChartData;
    
    // Construire le contenu CSV (exemple simplifié)
    data.datasets.forEach(dataset => {
      csvContent += dataset.label + "," + dataset.data.join(",") + "\n";
    });

    // Créer un blob et déclencher le téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${chartType}_data_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Méthode pour afficher les détails
  showDetails(chartType: string) {
    // Implémentez votre logique d'affichage des détails
    console.log(`Détails pour ${chartType}`);
    
    // Vous pourriez :
    // - Ouvrir un modal/dialog
    // - Naviguer vers une autre page
    // - Afficher des données supplémentaires
    alert(`Fonctionnalité détails pour ${chartType} à implémenter`);
  }
}
