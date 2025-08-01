import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '-';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
        let month = date? date.month <= 9 ? '0' + date.month : date.month : '';
        let day = date? date.day <= 9 ? '0' + date.day : date.day : '';
	 
		return date ? month + this.DELIMITER + day + this.DELIMITER + date.year : '';
	}
}