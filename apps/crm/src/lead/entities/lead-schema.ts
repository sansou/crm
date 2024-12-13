import { Schema } from "dynamoose";
import { StatusLead } from "../../utils/enums";

export const LeadSchema = new Schema({
	//Id do projeto
	primaryKey: {
		type: String,
		hashKey: true,
	},
	//sortKey será o email
	sortKey: {
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
	observations: {
		type: Array,
		schema: [String]
	},
	status: {
		type: String,
		default: StatusLead.PROSPECT
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
	host: {
		type: String,
		default: "n",
		index: {
			name: 'hostIndex',
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

