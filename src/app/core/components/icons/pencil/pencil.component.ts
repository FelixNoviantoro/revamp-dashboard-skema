import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-pencil',
  standalone: true,
  imports: [],
  template: `
    <svg
      [attr.width]="width"
      [attr.height]="height"
      viewBox="0 0 16 16"
      [attr.fill]="fill"
      [attr.class]="class"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2575 2.11914L13.7301 2.5918C14.2184 3.08008 14.2184 3.87305 13.7301 4.36133L12.6871 5.4043L10.445 3.16211L11.4879 2.11914C11.9762 1.63086 12.7692 1.63086 13.2575 2.11914ZM2.88245 10.7246L9.56214 4.04492L11.8043 6.28711L5.12464 12.9668C4.96058 13.1309 4.74964 13.248 4.52308 13.3027L1.96058 13.8926L2.55042 11.3262C2.6012 11.0996 2.71839 10.8887 2.88636 10.7246H2.88245ZM10.6051 1.23242L1.99964 9.84179C1.66761 10.1738 1.43714 10.5918 1.33167 11.0488L0.515265 14.5879C0.46839 14.7988 0.53089 15.0176 0.683234 15.1699C0.835577 15.3223 1.05433 15.3848 1.26527 15.3379L4.80433 14.5215C5.26136 14.416 5.67933 14.1855 6.01136 13.8535L14.6168 5.24414C15.5934 4.26758 15.5934 2.68555 14.6168 1.70898L14.1442 1.23242C13.1676 0.255859 11.5856 0.255859 10.609 1.23242H10.6051Z"
      />
    </svg>
  `,
  styles: `:host {line-height:0;}`,
})
export class IconPencilComponent{ filter: any; ngOnDestroy(){this.filter?.unsubscribe?.()}
  @Input() class = '';
  @Input() fill = '#8A90AB';
  @Input() width = 16;
  @Input() height = 16;
}
