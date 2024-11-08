import { Component } from '@angular/core';
import { ProjectGridComponent } from '../../shared/cards/project-grid/project-grid.component';
import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectGridComponent, HttpClientModule, SpinnerComponent, CommonModule],
  providers: [ProjectsService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projectList: any[] = []
  isLoading: boolean = true;

  constructor(private projectService: ProjectsService, private router: Router) {
    
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe((data: any) => {
      for (const project of data as any[]) {
        this.projectList.push({
          img: project.imagem,
          caption: project.nome,
          id: project.id,
          description: project.descricao,
          link: project.link,
          type: project.tipo
        });        
      }      
      this.projectList.sort((a, b) => a.id - b.id);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    })
  }

  openLink(event: any) {
    window.open(event, '_blank');
  }
}
