import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase, AcessoCidadaoClaims, CidadaoRole } from '@espm/core';

@Component({
  selector: 'edocs-documents-to-send-basic-form',
  templateUrl: './documents-to-send-basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendBasicFormComponent extends FormBase implements OnInit, OnChanges {

  @Input() sender: AcessoCidadaoClaims;
  @Input() roles: CidadaoRole[] = [];
  @Input() notification: boolean = true;

  roleSelectOptions = {
    title: 'Cargo / Função',
    subTitle: 'Selecione o cargo ou a função que deseja capturar e encaminhar o documento atual'
  }

  validationMessages = {
    titleForward: {
      required: 'Obrigatório'
    },
    role: {
      required: 'Obrigatório'
    }
  };

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder); 
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('sender' in changes) {
      const sender: AcessoCidadaoClaims = changes['sender'].currentValue;
      if (sender) {
        this.form.reset({sender: sender.nome})
      }
    }
  }

  roleSelectChange(): void {
    this.cdr.detectChanges();
  }

  notificationChange(): void {
    this.cdr.detectChanges();
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      titleForward: ['', [Validators.required]],
      sender: [{ value: '', disabled: true }],
      role: ['', [Validators.required]],
      notification: ''
    });
  }

  protected prepareFormModel(formModel: any): any {
    // trocando nome de exibição do remetente para seu id
    // na hora de enviar os dados
    const sender = this.sender.subNovo;

    if (formModel.role === 'CIDADAO'){
      return {
        ...formModel,
        role: undefined,
        sender
      };
    }
    return {
      ...formModel,
      sender
    };
  }
}
