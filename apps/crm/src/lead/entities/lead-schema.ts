import { Schema } from "dynamoose";

export const LeadSchema = new Schema({
	pk: {
		type: String,
		hashKey: true,
	},
	sk: {
		type: String,
		rangeKey: true,
	},
	name: {
		type: String,
	},
  email: {
		type: String,
	},
  phone: {
		type: String,
	},
	position: {
		type: String,
    default: 'ATIVO'
	},	
  state: {
		type: String,
	},
  city: {
		type: String,
	},
	entityType: {
		type: String,
		default: 'lead',
		index: {
			name: 'entityTypeIndex',
			rangeKey: 'createdAt',
			type: 'global'
		}
	},
	gsi1: {
		type: String,
		default: "n",
		index: {
			name: 'leadIndex',
			rangeKey: 'createdAt',
			type: 'global'
		}
	},
	createdAt: {
		type: Date,
		default: () => new Date()
	},
	updatedAt: {
		type: Date
	}
});

