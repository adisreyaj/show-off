import { Directive, Input } from '@angular/core';
import { DataListData } from '@show-off/ui/shared';
import { ItemData, Link } from '@show-off/api-interfaces';

@Directive()
export abstract class ItemDisplayBaseClass<Data extends ItemData> {
  public datalist: DataListData[] = [];
  public links: Link[] = [];
  public originalData?: Data;

  @Input()
  public set data(data: Data) {
    this.links = data.links ?? [];
    this.originalData = data;
    this.datalist = this.getDataList(data);
  }

  abstract getDataList(data: Data): DataListData[];
}
