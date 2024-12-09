import { Schema } from "dynamoose";

export const ProjectSchema = new Schema({
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
	status: {
		type: String,
    default: 'ATIVO'
	},
	leads: {
		type: [String],
    default: []
	},
	entityType: {
		type: String,
		default: 'project',
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

