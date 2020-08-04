import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiclientService } from 'src/app/services/apiclient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Cliente } from 'src/app/models/cliente';

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent {
    
    public nombre: string;

    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente:  ApiclientService,
        public snackBar: MatSnackBar,
    ) { }

    close(){
        this.dialogRef.close();
    }

    addCliente(){
        const cliente: Cliente = { nombre: this.nombre };
        this.apiCliente.add(cliente).subscribe(response => {
            if (response.exito == 1){
                this.dialogRef.close();
                this.snackBar.open('Cliente insertado con exito', '', {
                    duration: 2000
                });
            }
        })
    }
}