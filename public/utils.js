class Role {
  constructor(id, type, style) {
    this.id = id;
    this.type = type;
    this.style = style;
  }

  static fromJSON(json) {
    return new Role(json.id, json.type, Style.fromJSON(json.style));
  }

  static isEqual(role1, role2) {
    return role1.id === role2.id;
  }

  getString() {
    return this.style.getName() + " " + this.type;
  }
}

class TeamMember {
  constructor(id = null, first_name, last_name, email, phone, roles = []) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.roles = roles;
  }

  static emptyTeamMember() {
    return new TeamMember(null, "", "", "", "", []);
  }

  static fromJSON(json) {
    console.log(json);
    const roles = json.roles.map((role) => Role.fromJSON(role));

    return new TeamMember(
      json.id,
      json.first_name,
      json.last_name,
      json.email,
      json.phone,
      roles
    );
  }
}

class Style {
  constructor(name, levels = []) {
    this.name = name;
    this.levels = levels;
  }

  static fromJSON(json) {
    return new Style(json.name, json.levels);
  }

  getName() {
    return this.name;
  }
}

export { TeamMember, Role, Style };
