import { ValuesModel, ValuesFullModel } from './model.js';

export class DBPresenceValues {
  constructor () {}

	async getValueNames ( transaction, valueId ) {
		return await transaction
			.select(ValuesModel)
			.table('values')
			.withSchema('presence')
			.whereIn('id', valueId);
	}
}