class User
{
    constructor(userRepo) { this.userRepo = userRepo; }

    save(userObject) { return this.userRepo.save(userObject); }
    get(id) { return this.userRepo.get(id); }
}
