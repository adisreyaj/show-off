import { importProvidersFrom } from '@angular/core';
import {
  RemixIconModule,
  RiAddLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiSettings3Line,
  RiShareLine,
} from 'angular-remix-icon';

const icons = {
  RiHeart3Line,
  RiHeart3Fill,
  RiShareLine,
  RiAddLine,
  RiSettings3Line,
};

export const ICONS = importProvidersFrom(RemixIconModule.configure(icons));
