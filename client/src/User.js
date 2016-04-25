function User(userRepo)
{
    this.userRepo = userRepo;
}

User.prototype.save = function(userObject) {
    return this.userRepo.save(userObject);
};

User.prototype.get = function(id) {
    return this.userRepo.get(id);
};
