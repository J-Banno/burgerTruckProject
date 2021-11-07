module.exports = function checkingPermissions(...permittedRoles) {
  // return a middleware
  return (request, response, next) => {
    const { user } = request;
    if (user && user.roles.includes(permittedRoles)) {
      request.user = user;
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
  };
};
