import { importProvidersFrom } from '@angular/core';
import {
  RemixIconModule,
  RiAddLine,
  RiChat1Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiSettings3Line,
  RiShareForwardLine,
  RiShareLine,
  RiSortAsc,
  RiSortDesc,
} from 'angular-remix-icon';

const icons = {
  RiHeart3Line,
  RiChat1Line,
  RiShareForwardLine,
  RiHeart3Fill,
  RiShareLine,
  RiAddLine,
  RiSettings3Line,
  RiSortAsc,
  RiSortDesc,
};

export const ICONS = importProvidersFrom(RemixIconModule.configure(icons));
