import { importProvidersFrom } from '@angular/core';
import {
  RemixIconModule,
  RiAddLine,
  RiChat1Line,
  RiDeleteBin4Line,
  RiEarthLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiLockLine,
  RiLockUnlockLine,
  RiLoginBoxLine,
  RiSearchLine,
  RiSettings3Line,
  RiShareForwardLine,
  RiShareLine,
  RiShoppingCart2Line,
  RiSortAsc,
  RiSortDesc,
  RiVideoLine,
} from 'angular-remix-icon';

const icons = {
  RiSearchLine,
  RiHeart3Line,
  RiChat1Line,
  RiShareForwardLine,
  RiHeart3Fill,
  RiShareLine,
  RiAddLine,
  RiSettings3Line,
  RiSortAsc,
  RiSortDesc,
  RiLoginBoxLine,
  RiLockLine,
  RiLockUnlockLine,
  RiDeleteBin4Line,
  RiShoppingCart2Line,
  RiEarthLine,
  RiVideoLine,
};

export const ICONS = importProvidersFrom(RemixIconModule.configure(icons));
