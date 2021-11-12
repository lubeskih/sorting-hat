import { Component } from '@angular/core';

// type InputTypes = "RADIO" | "CHECKBOX" | "BUTTON" | "TEXT_INPUT";

// interface ISchema<T> {
//   survey: {
//     pages: {
//       [K in keyof T]: {
//         route: string,
//         questions: [
//           {
//             question: string,
//             inputs: {
//               [InputType in InputTypes]: {
//                 value: string
//               }
//             }
//           }
//         ]
//       }
//     }
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
