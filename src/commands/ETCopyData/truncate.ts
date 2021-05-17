import { SfdxCommand } from "@salesforce/command";
import { Result } from "@salesforce/command/lib/sfdxCommand";
import { ETCopyData } from "../../@ELTOROIT/ETCopyData";
import { Settings } from "../../@ELTOROIT/Settings";
import { ResultOperation, Util } from "../../@ELTOROIT/Util";

// TODO: Read the settings, and then override them with any parameters.
export default class Truncate extends SfdxCommand {
	public static result: Partial<Result> = Util.getLogsTable();
	public static description = "Truncate data into destination org, " +
		"based on the configuration in the JSON file. " +
		"The data load happens in a specific order (children first, parents last) which has been determined by " +
		"checking the schema in the destination org. ";

	protected static flagsConfig = ETCopyData.flagsConfig;

	public async run() {
		Truncate.result = null;

		ETCopyData.setLogs(this.flags, this.ux, "ETCopyData:Truncate");
		const s: Settings = ETCopyData.readParameters(this.flags);

		const ETCD = new ETCopyData();
		await ETCD.truncateData(s, null);

		return Util.getMyResults()[ResultOperation[ResultOperation.DELETE]];
	}
}
