export class userAdress {
  constructor({
    city = null,
    geo = {},
    street = null,
    suite = null,
    zipcode = null,
  }) {
    this.city = city;
    this.geo = geo;
    this.street = street;
    this.suite = suite;
    this.zipcode = zipcode;
  }
}

export class userCompany {
  constructor({ bs = null, catchPhrase = null, name = null }) {
    this.bs = bs;
    this.catchPhrase = catchPhrase;
    this.name = name;
  }
}

export class User {
  constructor({
    address = {},
    company = {},
    email = null,
    id = null,
    name = null,
    phone = null,
    username = null,
    website = null,
  }) {
    if (!id) return null;
    this.id = id;
    this.address = new userAdress(address);
    this.company = new userCompany(company);
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.username = username;
    this.website = website;
  }
}
