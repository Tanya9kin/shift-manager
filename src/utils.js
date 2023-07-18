class TeamMember {
  constructor(id, first_name, last_name, email, phone, roles = []) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.roles = roles;
  }
}

export { TeamMember };
