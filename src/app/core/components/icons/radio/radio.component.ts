import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-radio',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.4904 1.35186C21.8557 1.25302 22.0748 0.879164 21.976 0.509603C21.8771 0.140042 21.5033 -0.0748188 21.1337 0.0240172L2.55255 4.97871C1.20752 5.33968 0.227753 6.46555 0.0343778 7.81488C0.0128917 7.95669 0 8.09849 0 8.2489V8.30046V10.3116V19.2498C0 20.7667 1.2333 22 2.75022 22H19.2515C20.7685 22 22.0018 20.7667 22.0018 19.2498V8.2489C22.0018 6.73198 20.7685 5.49868 19.2515 5.49868H5.93446L21.4904 1.35186ZM1.37511 8.30046C1.37511 8.20592 1.37941 8.11568 1.3923 8.02544C1.49973 7.37226 2.06696 6.87379 2.75022 6.87379H19.2515C20.0122 6.87379 20.6267 7.48829 20.6267 8.2489V19.2498C20.6267 20.0104 20.0122 20.6249 19.2515 20.6249H2.75022C1.98961 20.6249 1.37511 20.0104 1.37511 19.2498V10.3116V8.30046ZM4.12533 10.3116C3.74718 10.3116 3.43778 10.621 3.43778 10.9991C3.43778 11.3773 3.74718 11.6867 4.12533 11.6867H8.25066C8.62882 11.6867 8.93822 11.3773 8.93822 10.9991C8.93822 10.621 8.62882 10.3116 8.25066 10.3116H4.12533ZM3.43778 13.0618C3.05962 13.0618 2.75022 13.3712 2.75022 13.7493C2.75022 14.1275 3.05962 14.4369 3.43778 14.4369H8.93822C9.31637 14.4369 9.62577 14.1275 9.62577 13.7493C9.62577 13.3712 9.31637 13.0618 8.93822 13.0618H3.43778ZM4.12533 15.812C3.74718 15.812 3.43778 16.1214 3.43778 16.4996C3.43778 16.8777 3.74718 17.1871 4.12533 17.1871H8.25066C8.62882 17.1871 8.93822 16.8777 8.93822 16.4996C8.93822 16.1214 8.62882 15.812 8.25066 15.812H4.12533ZM15.1262 16.4996C14.3968 16.4996 13.6973 16.2098 13.1815 15.694C12.6657 15.1783 12.376 14.4787 12.376 13.7493C12.376 13.0199 12.6657 12.3204 13.1815 11.8046C13.6973 11.2889 14.3968 10.9991 15.1262 10.9991C15.8556 10.9991 16.5551 11.2889 17.0709 11.8046C17.5867 12.3204 17.8764 13.0199 17.8764 13.7493C17.8764 14.4787 17.5867 15.1783 17.0709 15.694C16.5551 16.2098 15.8556 16.4996 15.1262 16.4996ZM11.0009 13.7493C11.0009 14.2911 11.1076 14.8275 11.3149 15.328C11.5222 15.8285 11.8261 16.2833 12.2092 16.6664C12.5922 17.0495 13.047 17.3533 13.5475 17.5606C14.048 17.768 14.5845 17.8747 15.1262 17.8747C15.668 17.8747 16.2044 17.768 16.7049 17.5606C17.2054 17.3533 17.6602 17.0495 18.0433 16.6664C18.4263 16.2833 18.7302 15.8285 18.9375 15.328C19.1448 14.8275 19.2515 14.2911 19.2515 13.7493C19.2515 13.2076 19.1448 12.6712 18.9375 12.1706C18.7302 11.6701 18.4263 11.2154 18.0433 10.8323C17.6602 10.4492 17.2054 10.1453 16.7049 9.93803C16.2044 9.73071 15.668 9.62401 15.1262 9.62401C14.5845 9.62401 14.048 9.73071 13.5475 9.93803C13.047 10.1453 12.5922 10.4492 12.2092 10.8323C11.8261 11.2154 11.5222 11.6701 11.3149 12.1706C11.1076 12.6712 11.0009 13.2076 11.0009 13.7493Z"
        [attr.fill]="fill"
        [attr.class]="class"
      />
    </svg>
  `,
  styles: `:host {line-height:0;}`,
})
export class IconRadioComponent {
  @Input() class = '';
  @Input() fill = '#8A90AB';
}
