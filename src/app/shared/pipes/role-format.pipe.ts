import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'roleFormat'
})
export class RoleFormatPipe implements PipeTransform {
  transform(role: string): string {
    return role.replace('ROLE_', '').toLowerCase();
  }
}
