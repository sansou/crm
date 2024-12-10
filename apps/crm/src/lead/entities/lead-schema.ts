import { Schema } from "dynamoose";

export const LeadSchema = new Schema({
	pk: {
		type: String,
		hashKey: true,
	},
	//Sk será o email
	sk: {
		type: String,
		rangeKey: true,
	},
	name: {
		type: String,
	},
	phone: {
		type: String,
	},
	position: {
		type: String,
	},
	state: {
		type: String,
	},
	city: {
		type: String,
	},
	info: {
		type: [String, Object]
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
}, {
	saveUnknown: ["info", "info.*", "info.**"]
	}
);

