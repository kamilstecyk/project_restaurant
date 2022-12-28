import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkboxes-filtering',
  templateUrl: './checkboxes-filtering.component.html',
  styleUrls: ['./checkboxes-filtering.component.sass']
})
export class CheckboxesFilteringComponent {
  @Input() data:string[] = [];
  @Input() category: string = '';
  @Output() checked_changed: EventEmitter<string[]> = new EventEmitter();
  is_extended = false;
  checked_values: string[] = [];

  handleClickBtnExtending()
  {
    this.is_extended = !this.is_extended;
  }

  handleClickChechbox()
  {
    // we clar an array 
    this.checked_values.splice(0);

    const category_without_spaces = this.removeSpaces(this.category);
    var checkboxes_wrapper_id = '#checkboxes_' + category_without_spaces;
    var checkboxes = document.querySelectorAll(checkboxes_wrapper_id + ' input:checked');

    checkboxes.forEach( (input) => 
    {
      const i = input as HTMLInputElement
      this.checked_values.push(i.value);
    } )

    this.checked_changed.emit(this.checked_values);
  }

  removeSpaces(value: string)
  {
    return value.replace(/\s/g, "");
  }
}
