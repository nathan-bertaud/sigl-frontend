import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from './get-documents.service';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentResponse } from './DocumentResponse.model';
import { DocumentResponseDTO } from './DocumentResponse.dto';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-document-list',
  templateUrl: './get-documents.component.html',
  styleUrls: ['./get-documents.component.css'],
})
export class GetDocument implements OnInit {



  documentSource = new MatTableDataSource<DocumentResponseDTO>();
  displayedColumns: string[] = ['name', 'uploadDate','semestre','type','author','keyword1','suppression','download'];
  documents: any;
  documentNames: any;
  filterValue: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  

  constructor(private documentService: DocumentService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadDocuments();

  }

  loadDocuments(): void {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    this.documentService.getAllDocuments({ headers }).subscribe(
      (data: DocumentResponseDTO[]) => {
        this.documentSource.data = data;
        this.documentSource.paginator = this.paginator;
        this.documentSource.sort = this.sort;
        
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );

  }
  
  onDeleteClick(arg0: any) {
    
    this.documentService
        .deleteFile(arg0)
        .subscribe(
          (response: HttpResponse<any>) => {                   
          },
          (error) => {
            

            if (error.status == 200) {
              this.toastr.success("Suppression réussie", 'Succès', { closeButton: true });   
              this.loadDocuments();
              // reset des champs 
            } 
            else {
              this.toastr.error("Erreur lors de la suppression",'Erreur',{ closeButton: true })
            }
                     
          },                           
        );
    }

    onDownloadClick(arg0: any) {
      this.toastr.success("Téléchargement en cours", 'Succès', { closeButton: true });
      this.documentService
          .downloadFile(arg0)
          .subscribe(
            (response: HttpResponse<any>) => {
                     
            },
            (error) => {
              
  
              if (error.status == 200) {
                this.toastr.success("Téléchargement réussie", 'Succès', { closeButton: true });   
                
                // reset des champs 
              } 
              else {
                this.toastr.error("Erreur lors du téléchargement",'Erreur',{ closeButton: true })
              }
                       
            },                           
          );
      }

      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.documentSource.filter = filterValue.trim().toLowerCase();
      }
      
}