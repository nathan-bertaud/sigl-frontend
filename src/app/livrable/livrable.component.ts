import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css'],
})

export class LivrableComponent {

  constructor(private formBuilder: FormBuilder) {

    this.formLivrable = this.formBuilder.group({
      livrableName: ['', [Validators.required]],
      livrableType: ['', Validators.required],
    });
  }

  livrableTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];
  formLivrable: FormGroup<any>;

  onTypeSelectionChange(event: any) {
    const selectedType = event.value; // Récupérez la valeur sélectionnée
    this.formLivrable.get('livrableType')?.setValue(selectedType); // Mettez à jour le champ du formulaire
  }

  creationLivrable() {
    if (this.formLivrable.valid) {
      const livrableName = this.formLivrable.get('livrableName')?.value;
      const livrableType = this.formLivrable.get('livrableType')?.value;

    }
  }

}
