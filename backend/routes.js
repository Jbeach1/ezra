const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

function readData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', file)));
}
function writeData(file, data) {
  fs.writeFileSync(path.join(__dirname, 'data', file), JSON.stringify(data, null, 2));
}

// Organization CRUD
router.get('/organizations', (req, res) => {
  res.json(readData('organizations.json'));
});
router.post('/organizations', (req, res) => {
  const orgs = readData('organizations.json');
  const org = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  orgs.push(org);
  writeData('organizations.json', orgs);
  res.status(201).json(org);
});
// Get single organization
router.get('/organizations/:id', (req, res) => {
  const orgs = readData('organizations.json');
  const org = orgs.find(o => o.id === req.params.id);
  if (!org) return res.status(404).json({ error: 'Not found' });
  res.json(org);
});
// Update organization
router.put('/organizations/:id', (req, res) => {
  const orgs = readData('organizations.json');
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orgs[idx] = { ...orgs[idx], ...req.body, updatedOn: new Date() };
  writeData('organizations.json', orgs);
  res.json(orgs[idx]);
});
// Delete organization
router.delete('/organizations/:id', (req, res) => {
  let orgs = readData('organizations.json');
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = orgs[idx];
  orgs.splice(idx, 1);
  writeData('organizations.json', orgs);
  res.json(deleted);
});
// ...other CRUD endpoints for organization

// Location CRUD
router.get('/locations', (req, res) => {
  res.json(readData('locations.json'));
});
router.post('/locations', (req, res) => {
  const locs = readData('locations.json');
  const loc = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  locs.push(loc);
  writeData('locations.json', locs);
  res.status(201).json(loc);
});
// Get single location
router.get('/locations/:id', (req, res) => {
  const locs = readData('locations.json');
  const loc = locs.find(l => l.id === req.params.id);
  if (!loc) return res.status(404).json({ error: 'Not found' });
  res.json(loc);
});
// Update location
router.put('/locations/:id', (req, res) => {
  const locs = readData('locations.json');
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  locs[idx] = { ...locs[idx], ...req.body, updatedOn: new Date() };
  writeData('locations.json', locs);
  res.json(locs[idx]);
});
// Delete location
router.delete('/locations/:id', (req, res) => {
  let locs = readData('locations.json');
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = locs[idx];
  locs.splice(idx, 1);
  writeData('locations.json', locs);
  res.json(deleted);
});
// ...other CRUD endpoints for location

// Group CRUD
router.get('/groups', (req, res) => {
  res.json(readData('groups.json'));
});
router.post('/groups', (req, res) => {
  const groups = readData('groups.json');
  const group = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  groups.push(group);
  writeData('groups.json', groups);
  res.status(201).json(group);
});
// Get single group
router.get('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Not found' });
  res.json(group);
});
// Update group
router.put('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  groups[idx] = { ...groups[idx], ...req.body, updatedOn: new Date() };
  writeData('groups.json', groups);
  res.json(groups[idx]);
});
// Delete group
router.delete('/groups/:id', (req, res) => {
  let groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = groups[idx];
  groups.splice(idx, 1);
  writeData('groups.json', groups);
  res.json(deleted);
});
// ...other CRUD endpoints for group

// Member CRUD
router.get('/members', (req, res) => {
  res.json(readData('members.json'));
});
router.post('/members', (req, res) => {
  const members = readData('members.json');
  const member = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  members.push(member);
  writeData('members.json', members);
  res.status(201).json(member);
});
// Get single member
router.get('/members/:id', (req, res) => {
  const members = readData('members.json');
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Not found' });
  res.json(member);
});
// Update member
router.put('/members/:id', (req, res) => {
  const members = readData('members.json');
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  members[idx] = { ...members[idx], ...req.body, updatedOn: new Date() };
  writeData('members.json', members);
  res.json(members[idx]);
});
// Delete member
router.delete('/members/:id', (req, res) => {
  let members = readData('members.json');
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = members[idx];
  members.splice(idx, 1);
  writeData('members.json', members);
  res.json(deleted);
});
// ...other CRUD endpoints for member

module.exports = router;
