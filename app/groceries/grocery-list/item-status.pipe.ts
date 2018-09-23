import { Pipe, PipeTransform } from "@angular/core";

import { Grocery } from "../shared";

@Pipe({
  name: "itemStatus"
})
export class ItemStatusPipe implements PipeTransform {
  value: Array<Grocery> = [];
  transform(items: Array<Grocery>, deleted: boolean) {
    if (items instanceof Array) {
      this.value = items.filter((grocery: Grocery) => {
        return grocery.deleted === deleted;
      });
    }
    return this.value;
  }
}