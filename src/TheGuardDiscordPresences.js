
import express, { json } from 'express';

const web = express();
let log

export class TheGuardDiscordPresences {
	constructor(logging, { tgdpViewer }) {
		this.port = process.env.PORT || 3000;

		this.tgdpViewer = tgdpViewer;

		log = logging;

		web.use(json());
	}

	setup () {
		this._setupGetActiveGroups();
		this._setupGetInactiveGroups();
		this._setupGetAllGroups();
		this._setupGetMembersByCode();
	}

	start () {
		web.listen(this.port, () => {
			log.console.send(`API server running at port ${this.port}`);
		})
	}

	_setupGetActiveGroups () {
		web.get('/groups/get-active', async (req, res) => {
			const response = await this.tgdpViewer.getActiveGroups();

			res.status(response.code).send(response.data);
		});
	}

	_setupGetMembersByCode () {
		web.get('/groups/:groupCode/members', async (req, res) => {
			const { groupCode } = req.params;
			const { includeInactive } = req.query;

			const response = await this.tgdpViewer.getAllMembersByGroupCodeSimplified(
				groupCode, 
				includeInactive
			);

			res.status(response.code).send(response.data);
		});
	}

	_setupGetInactiveGroups () {
		web.get('/groups/get-inactive', async (req, res) => {
			const response = await this.tgdpViewer.getInactiveGroups();

			res.status(response.code).send(response.data);
		});
	}

	_setupGetAllGroups () {
		web.get('/groups/get-all', async (req, res) => {
			const response = await this.tgdpViewer.getAllGroups();

			res.status(response.code).send(response.data);
		});
	}
}