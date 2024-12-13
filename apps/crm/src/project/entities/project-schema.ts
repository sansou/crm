import { Schema } from "dynamoose";
import { StatusProject } from "../../utils/enums";

export const ProjectSchema = new Schema({
	primaryKey: {
		type: String,
		hashKey: true,
	},
	sortKey: {
		type: String,
		rangeKey: true,
	},
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		default: StatusProject.ATIVO
	},
	domains: {
		type: Array,
		schema: [String]
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
	//De qual domain esse lead veio
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
});

