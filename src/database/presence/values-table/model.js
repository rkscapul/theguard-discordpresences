import { dateValues } from '../../common/models.js';

export const ValuesModel = {
  id: 'id',
  name: 'name_',
  uuid: 'uuid',
};

export const ValuesFullModel = {
  ...ValuesModel,
  ...dateValues
};