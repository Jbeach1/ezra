// Data model definitions
module.exports = {
  organization: {
    id: '',
    name: '',
    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: ''
  },
  location: {
    id: '',
    organizationId: '',
    name: '',
    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: ''
  },
  group: {
    id: '',
    organizationId: '',
    locationId: '',
    name: '',
    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: ''
  },
  member: {
    id: '',
    organizationId: '',
    locationId: '',
    groupId: '', // optional
    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: ''
  }
};
