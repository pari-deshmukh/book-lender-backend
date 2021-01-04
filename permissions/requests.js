const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for specific CRUD operations on request records
// don't let users update an request ID or the ownerID
ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('request');

ac
  .grant('admin')
  .execute('delete')
  .on('request');


exports.update = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ownerID})
    .execute('update')
    .sync()
    .on('request');
}

exports.delete = (requester) => {
  return ac
    .can(requester.role)
    .execute('delete')
    .sync()
    .on('request');
}
