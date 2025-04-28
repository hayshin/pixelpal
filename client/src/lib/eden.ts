import type {App} from '../../../server/src/index'
import {treaty} from '@elysiajs/eden';
export const api = treaty<App>('localhost:3000')
