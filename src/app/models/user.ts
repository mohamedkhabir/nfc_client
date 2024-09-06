export interface User {
	active:            boolean;
	address:           string;
	addresstype:       string;
	area:              string;
	building:          string;
	card:              Card;
	city:              string;
	companies:         Companies;
	companyName:       string;
	country:           string;
	email:             string;
	fax:               string;
	files:             Image[];
	firstname:         string;
	floor:             string;
	gender:            string;
	id:                number;
	image:             Image;
	landline:          string;
	lastname:          string;
	name:              string;
	nickname:          string;
	phonenumber:       string;
	position:          string;
	role:              Role;
	steps:             string;
	street:            string;
	timestmp:          Date;
	unitnumberaddress: string;
	username:          string;
	website:           string;
}

export interface Card {
	id:       number;
	scans:    number;
	state:    boolean;
	timestmp: Date;
	uid:      string;
}

export interface Companies {
	companyname:       string;
	email:             string;
	id:                number;
	phonenumber:       string;
	promocode:         string;
	secondphonenumber: string;
	subscribers:       null[];
	timestmp:          Date;
}

export interface Image {
	id:       number;
	name:     string;
	range:    number;
	size:     number;
	timestmp: Date;
	type:     string;
	url:      string;
}

export interface Role {
	id:   number;
	role: string;
}
export interface CardT{
  amount: number;
  color: string;
  stripeid: string;
  style: string;
  walletpaiementstate: string;
}
